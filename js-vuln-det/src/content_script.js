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

let domain = (new URL(window.location.href));
domain = domain.hostname.replace('www.', '');

chrome.storage.sync.get('js_vulnerability_detector__mode', function(data) {
    let modeString = data.js_vulnerability_detector__mode;
    const mode = modeString != null ? new Mode(modeString) : Mode.Repair;
    switch (mode.name) {
        case Mode.Disabled.name:
            break;
        case Mode.Analyze.name:
            processPage(Mode.Analyze.name);
            break;
        case Mode.Block.name:
        case Mode.Repair.name:
            window.stop();
            document.documentElement.innerHTML = 'Reloading Page...';
            processPage(mode.name);
            break;
        default:
            break;
    }
});




function processPage(mode) {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', window.location.href, false);

    xhr.onerror = function() {
        document.documentElement.innerHTML = 'Error getting Page, try desabling the extension and reload the page';
    }

    xhr.onload = async function() {
        const page = document.implementation.createHTMLDocument("");
        page.documentElement.innerHTML = this.responseText;

        const newPage = document.importNode(page.documentElement, true);

        const nodeList = newPage.querySelectorAll('script');
        let processedScriptPromises = [];

        for (let i = 0; i < nodeList.length; ++i) {
            const node = nodeList[i];

            if (node.src) {
                const promise = sendMessagePromise({ src: node.src, type: "processScript" });
                processedScriptPromises.push(promise);

            } else if (node.innerHTML) {
                const promise = sendMessagePromise({ script: node.innerHTML, type: "processScript" });
                processedScriptPromises.push(promise);
            }
        }

        const processedScripts = await Promise.all(processedScriptPromises);
        let count = 0;
        let vulnerabilities = [];
        for (let i = 0; i < processedScripts.length; i++) {
            const node = nodeList[i];
            const processedScriptResponse = processedScripts[i];

            if (processedScriptResponse) {
                count++;
                vulnerabilities = vulnerabilities.concat(processedScriptResponse[0]);
                if (mode != Mode.Analyze.name) {
                    // in analyze mode dont do anything to the scripts
                    if (mode == Mode.Block.name) {
                        // in Block mode remove scripts with issues found
                        node.parentNode.removeChild(node);
                    } else {
                        // in Repair mode add new repaired content to the node innerHTML
                        node.removeAttribute('src');
                        node.innerHTML = processedScriptResponse[1];
                    }
                }
            }
        }

        chrome.runtime.sendMessage({ count: count, vulnerabilities: vulnerabilities, url: location.href, type: "result" }, () => {});


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
function sendMessagePromise(data) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(data, response => {
            resolve(response);
        });
    });
}