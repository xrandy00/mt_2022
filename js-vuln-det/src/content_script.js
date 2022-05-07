/**
 * Initially the script reads the mode from storage. Then it checks whether the URL
 * of current site is whitelisted. Based on the selected mode and presence in whitelist
 * it proceeds. With modes Block and Repair the website load is stopped ASAP.
 * 
 * The script downloads the URL by using XMLHttpRequest and then processes it in memory.
 * All scripts are sent to background.js for processing. Repaired scripts are returned
 * to the DOM. After all processing is done, the DOM is injected back into the page, also
 * adding evaluate.js script to the end. For Analysis mode the original page is not affected.
 *
 * @summary Content script injected to analyzed website as soon as possible
 * @author Vojtěch Randýsek, xrandy00@vutbr.cz
 *
 * Created at     : 2022-05-06 21:58:10 
 * Last modified  : 2022-05-07 11:00:15
 */

// declaration of modes, these correspond to modes in popup.html and popup.js
class Mode {
    // Create new instances of the same class as static attributes
    static Disabled = new Mode("disabled");
    static Analyze = new Mode("analyze");
    static Block = new Mode("block");
    static Repair = new Mode("repair");

    constructor(name) {
        this.name = name
    }
}

// Some pages need to be whitelisted, because they might be stuck in infinite redirect loops, such as searching on Google
// with Block and Repair modes. More pages may be added in future, there could even be an option to dynamically add
// sites to whitelist in the popup.
let domain = (new URL(window.location.href));
domain = domain.hostname.replace('www.', '');

const whitelist = [
    'google.com', // google itself works, but searching in chrome searchbar is broken - infinite redirects happen
];

// start by loading the mode from storage
chrome.storage.sync.get('js_vulnerability_detector__mode', function (data) {
    let modeString = data.js_vulnerability_detector__mode;
    const mode = modeString != null ? new Mode(modeString) : Mode.Analyze;

    // whitelisted pages support Analyze mode only
    if (mode.name != Mode.Disabled.name && whitelist.includes(domain)) {
        mode = Mode.Analyze;
    }

    switch (mode.name) {
        case Mode.Disabled.name:
            // disabled mode does not do anything
            break;
        case Mode.Analyze.name:
            processPage(Mode.Analyze.name);
            break;
        case Mode.Block.name:
        case Mode.Repair.name:
            // Block and Repair stop the page from loading and show progress indication
            window.stop();
            document.documentElement.innerHTML = 'Reloading Page...';
            processPage(mode.name);
            break;
        default:
            break;
    }
});

// each page is downloaded and processed in memory
function processPage(mode) {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', window.location.href, false);

    xhr.onerror = function () {
        document.documentElement.innerHTML = 'Error getting Page, try desabling the extension and reload the page';
    }

    xhr.onload = async function () {
        const page = document.implementation.createHTMLDocument("");
        page.documentElement.innerHTML = this.responseText;

        const newPage = document.importNode(page.documentElement, true);

        const nodeList = newPage.querySelectorAll('script');
        let processedScriptPromises = [];

        // iterate over all script nodes
        for (let i = 0; i < nodeList.length; ++i) {
            const node = nodeList[i];

            // send either the node.src or the node content for inline scripts to background script for processing
            // store the Promises 
            if (node.src) {
                const promise = sendMessagePromise({ src: node.src, type: "processScript" });
                processedScriptPromises.push(promise);
            } else if (node.innerHTML) {
                const promise = sendMessagePromise({ script: node.innerHTML, type: "processScript" });
                processedScriptPromises.push(promise);
            }
        }

        // await all of the promises from background scripts (vulnerabilities and repaired scripts)
        const processedScripts = await Promise.all(processedScriptPromises);
        let count = 0;
        let vulnerabilities = [];
        
        // iterate over received responses
        for (let i = 0; i < processedScripts.length; i++) {
            const node = nodeList[i];
            const processedScriptResponse = processedScripts[i];

            // if no vulnerabilities are found, the processedScriptResponse is null
            if (processedScriptResponse) {
                count++;
                // iterate over vulnerabilities and aggregate them for future reporting and storing
                for (let i = 0; i < processedScriptResponse.foundVulnerabilities.length; i++) {
                    const vuln = processedScriptResponse.foundVulnerabilities[i];
                    vuln.src = node.src ?? `inline script ${i}`;
                    vulnerabilities.push(vuln);
                }

                // handle the result based on mode
                if (mode != Mode.Analyze.name) {
                    // in analyze mode dont do anything to the scripts
                    if (mode == Mode.Block.name) {
                        // in Block mode remove scripts with issues found
                        node.parentNode.removeChild(node);
                    } else {
                        // in Repair mode add new repaired content to the node innerHTML
                        node.removeAttribute('src');
                        node.innerHTML = processedScriptResponse.output;
                    }
                }
            }
            // if there are no vulnerabilities found, then the node is kept intact
        }

        // send aggregated statistics for the whole page to background script for storing
        chrome.runtime.sendMessage({
            vulnerableScriptsCount: count,
            processedScriptsCount: processedScripts.length,
            vulnerabilities: vulnerabilities,
            url: location.href,
            type: "result"
        }, () => { });


        if (mode != Mode.Analyze.name) {
            // add page back to DOM
            document.replaceChild(newPage, document.documentElement);
            delete page;

            // add evaluate script, so that it restarts all script execution
            const s = document.createElement('script');
            s.src = chrome.runtime.getURL('evaluate.js');
            s.setAttribute('ignore', 'true');

            (document.documentElement).appendChild(s);
        }
    };

    xhr.send();
}

// https://stackoverflow.com/questions/52087734/make-promise-wait-for-a-chrome-runtime-sendmessage
// a little wrapper on chrome.runtime.sendMessage API 
function sendMessagePromise(data) {
    return new Promise((resolve, _) => {
        chrome.runtime.sendMessage(data, response => {
            resolve(response);
        });
    });
}