function refresh() {
    let rad = document.modeForm.mode;
    let prev = null;
    for (let i = 0; i < rad.length; i++) {
        rad[i].addEventListener('change', function () {
            if (this !== prev) {
                prev = this;
            }
            chrome.storage.sync.set({ js_vulnerability_detector__mode: this.value });
        });
    }

    let mode = 'analyze';

    chrome.storage.sync.get('js_vulnerability_detector__mode', function (data) {
        mode = data.js_vulnerability_detector__mode;

        if (!mode) {
            mode == 'analyze';
            rad[1].checked = true;
        }
        rad.value = mode;
    });

    function openTab(evt, tabName) {
        // Declare all variables
        let i, tabcontent, tablinks;

        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        // Show the current tab, and add an "active" class to the button that opened the tab
        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.className += " active";
    }

    document.getElementById("modeSelectionButton").addEventListener("click", (event) => { openTab(event, 'Mode'); });
    document.getElementById("historySelectionButton").addEventListener("click", (event) => { openTab(event, 'History'); });

    document.getElementById("historySelectionButton").click();
    document.getElementById("clear").addEventListener("click", (event) => {
        chrome.storage.local.set({ "vulnerableScriptsCount": 0 }, function () { });
        chrome.storage.local.set({ "vulnerabilitiesCount": 0 }, function () { });
        chrome.storage.local.set({ "processedScriptsCount": 0 }, function () { });
        chrome.storage.local.set({ "vulnerabilities": [] }, function () { });

        refresh();
    });

    chrome.storage.local.get("vulnerableScriptsCount", function (received) {
        if (!received.vulnerableScriptsCount) {
            received.vulnerableScriptsCount = 0;
        }
        document.getElementById("vulnerableScriptsFound").innerText = received.vulnerableScriptsCount;
    });

    chrome.storage.local.get("vulnerabilitiesCount", function (received) {
        if (!received.vulnerabilitiesCount) {
            received.vulnerabilitiesCount = 0;
        }
        document.getElementById("vulnerabilitiesCount").innerText = received.vulnerabilitiesCount;
    });

    chrome.storage.local.get("processedScriptsCount", function (received) {
        if (!received.processedScriptsCount) {
            received.processedScriptsCount = 0;
        }
        document.getElementById("processedScriptsCount").innerText = received.processedScriptsCount;
    });

    let list = document.getElementById("vulnerabilitiesList");
    list.innerHTML = null;

    chrome.storage.local.get("vulnerabilities", function (received) {
        if (!received.vulnerabilities) {
            return;
        }
        console.log(received);
        let parsed = received.vulnerabilities;
        for (let index = 0; index < parsed.length; index++) {
            let vulnerability = parsed[index];
            let html = vulnerabilityToHtml(vulnerability, index + 1);
            let node = htmlToElement(html);
            list.appendChild(node);
        }
    });
}

function vulnerabilityToHtml(vulnerability, index) {
    return `
    <div class="vulnerability-item severity-${vulnerability.severity}">
        <span>${index}) </span>
        <span class="vulnerability-item-title">${vulnerability.title}</span>
        <br>
        <a href="${vulnerability.url}">${vulnerability.url}</a>
        <span>${vulnerability.src}</span>

    </div>`;
}

function htmlToElement(html) {
    let template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

try {
    refresh();
} catch (error) {
    console.log(error);
}