class Mode {
    // Create new instances of the same class as static attributes
    static Analyze = new Mode("analyze")
    static Block = new Mode("block")
    static Repair = new Mode("repair")

    constructor(name) {
        this.name = name
    }
}

const whitelist = [
    'google.com', // google itself works, but searching in chrome searchbar is broken - infinite redirects happen
]

let domain = (new URL(window.location.href));
domain = domain.hostname.replace('www.', '');

if (whitelist.includes(domain)) {
    console.log('This page is whitelisted - extension does not work here properly. Extension will act as disabled.');
} else {
    stopLoadingPage();
    showLoading();

    chrome.storage.sync.get('js_vulnerability_detector__mode', function (data) {
        let modeString = data.js_vulnerability_detector__mode;
        const mode = modeString != null ? new Mode(modeString) : Mode.Repair;
        processPage(mode.name);
    });
}


function stopLoadingPage() {
    window.stop();
}

function showLoading() {
    document.documentElement.innerHTML = 'Reloading Page...';
}

function processPage(mode) {
    var xhr = new XMLHttpRequest();

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

        for (let i = 0; i < nodeList.length; ++i) {
            const node = nodeList[i];

            if (node.src) {
                const promise = sendMessagePromise({ src: node.src });
                processedScriptPromises.push(promise);

            } else if (node.innerHTML) {
                const promise = sendMessagePromise({ script: node.innerHTML });
                processedScriptPromises.push(promise);
            }
        }

        // in analyze mode dont do anything to the scripts
        if (mode != Mode.Analyze.name) {
            const processedScripts = await Promise.all(processedScriptPromises);
            for (let i = 0; i < processedScripts.length; i++) {
                const node = nodeList[i];
                const processedScriptResponse = processedScripts[i];

                if (processedScriptResponse) {
                    if (mode == Mode.Block.name) {
                        // in Block mode remove scripts with issues found
                        node.parentNode.removeChild(node);
                    } else {
                        // in Repair mode add new repaired content to the node innerHTML
                        node.removeAttribute('src');
                        node.innerHTML = processedScriptResponse;
                    }
                }
            }
        }

        // add page back to DOM
        document.replaceChild(newPage, document.documentElement);
        delete page;

        // add evaluate script, so that it restarts all script execution
        const s = document.createElement('script');
        s.src = chrome.runtime.getURL('evaluate.js');
        s.setAttribute('ignore', 'true');

        (document.documentElement).appendChild(s);
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