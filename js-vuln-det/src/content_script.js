class Mode {
    // Create new instances of the same class as static attributes
    static Disabled = new Mode("disabled")
    static Analyze = new Mode("analyze")
    static Block = new Mode("block")
    static Repair = new Mode("repair")

    constructor(name) {
        this.name = name
    }
}
function stopLoadingPage() {
    window.stop();
}

function showLoading() {
    document.documentElement.innerHTML = 'Reloading Page...';
}

function processPage(mode) {
    console.log('in process page');
    var xhr = new XMLHttpRequest();

    xhr.open('GET', window.location.href, true);

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
                node.setAttribute('original-src', node.src);
                const promise = sendMessagePromise({ src: node.src });
                processedScriptPromises.push(promise);

            } else if (node.innerHTML) {
                const promise = sendMessagePromise({ script: node.innerHTML });
                processedScriptPromises.push(promise);
            }
        }

        const processedScripts = await Promise.all(processedScriptPromises);

        for (let i = 0; i < processedScripts.length; i++) {
            const node = nodeList[i];
            const processedScriptResponse = processedScripts[i];

            console.log(processedScriptResponse);
            if (processedScriptResponse) {
                console.log('blocking;');
                if (mode == Mode.Block) {
                    node.remove();
                } else {
                    node.innerHTML = processedScriptResponse;
                }
            } else {
                node.setAttribute('ignore', 'true');
            }
        }

        if (mode != Mode.Analyze) {
            document.replaceChild(newPage, document.documentElement);
            delete page;

            if (mode == Mode.Repair) {
                const s = document.createElement('script');
                s.src = chrome.runtime.getURL('evaluate.js');
                s.setAttribute('ignore', 'true');
    
                (document.documentElement).appendChild(s);
            }
        }
    };

    xhr.send();
}

function analyze() {
    processPage(Mode.Analyze);
}

function analyzeAndBlock() {
    stopLoadingPage();
    showLoading();
    processPage(Mode.Block);
}

function analyzeAndRepair() {
    stopLoadingPage();
    showLoading();
    processPage(Mode.Repair);
}


chrome.storage.sync.get('js_vulnerability_detector__mode', function (data) {
    let modeString = data.js_vulnerability_detector__mode;
    const mode = modeString != null ? new Mode(modeString) : Mode.Repair;
    switch (mode.name) {
        case Mode.Disabled.name:
            break;
        case Mode.Analyze.name:
            analyze();
            break;
        case Mode.Block.name:
            analyzeAndBlock();
            break;
        case Mode.Repair.name:
            analyzeAndRepair();
            break;
        default:
            break;
    }
});

// https://stackoverflow.com/questions/52087734/make-promise-wait-for-a-chrome-runtime-sendmessage
function sendMessagePromise(data) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(data, response => {
                resolve(response);
        });
    });
}