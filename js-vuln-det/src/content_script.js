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
        document.documentElement.innerHTML = 'Error getting Page';
    }

    xhr.onload = function () {
        const page = document.implementation.createHTMLDocument("");
        page.documentElement.innerHTML = this.responseText;

        const newPage = document.importNode(page.documentElement, true);

        const nodeList = newPage.querySelectorAll('script');
        for (let i = 0; i < nodeList.length; ++i) {
            const node = nodeList[i];
            if (node.src) {
                node.setAttribute('original-src', node.src);

                // TODO - save and await all promises
                chrome.runtime.sendMessage({ src: node.src }, (response) => {
                    console.log('received user data', response);
                });
            } else {
                // TODO - save and await all promises
                chrome.runtime.sendMessage({ script: node.innerHTML }, (response) => {
                    // 3. Got an asynchronous response with the data from the background
                    console.log('received user data', response);
                });
            }
        }

        if (mode != Mode.Analyze) {
            document.replaceChild(newPage, document.documentElement);
            delete page;

            const s = document.createElement('script');
            s.src = chrome.runtime.getURL('scripts/evaluate.js');
            s.setAttribute('ignore', 'true');

            (document.documentElement).appendChild(s);
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
    const mode = modeString != null ? new Mode(modeString) : new Mode.Repair;
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