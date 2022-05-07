/**
 * Service worker listens to messages from content.js. For messages
 * containing URLs of scripts it downloads the content of the URL. 
 * Once it obtains the script code (either from message or from URL) it 
 * uses js-to-ast library to find known vulnerabilities. Results are sent
 * in message response back to caller (content.js) and stored to storage for
 * further processing or display.
 *
 * @summary Service worker script performing the vulnerability detection
 * @author Vojtěch Randýsek, xrandy00@vutbr.cz
 *
 * Created at     : 2022-05-06 21:54:58 
 * Last modified  : 2022-05-07 10:51:38
 */

const jsToAst = require('js-to-ast');

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        try {
            if (request.type == "processScript") {
                if (request.src != null) {
                    makeRequest(request.src).then((script) => {
                        let response = jsToAst.processScript(script);
                        if (response && response.foundVulnerabilities?.length > 0) {
                            sendResponse(response);
                        } else {
                            sendResponse(null);
                        }

                    });
                    return true;
                } else
                    if (request.script != null) {
                        let response = jsToAst.processScript(request.script);

                        if (response && response.foundVulnerabilities?.length > 0) {
                            sendResponse(response);
                        } else {
                            sendResponse(null);
                        }
                    }
            }
            else if (request.type == "result") {
                if (request.vulnerabilities.length > 0) {
                    chrome.action.setBadgeText({ text: request.vulnerabilities.length.toString() });
                } else {
                    chrome.action.setBadgeText({ text: '' });
                }

                addToTotalCount(request.vulnerableScriptsCount, request.vulnerabilities.length, request.processedScriptsCount);
                addToHistory(request.vulnerabilities, request.url);

                sendResponse(true);

            }
            sendResponse(true);
        } catch (e) {
            console.log(e);
        }
    }
);

// perform GET for given URL
// used to fetch scripts by their URLs, this may fail on CSP sometimes
async function makeRequest(url) {
    try {
        let response = await fetch(url);
        let data = response.text();
        return data;
    } catch (error) {
        console.log(error);
    }
}

// stores statistics to storage.local
// initially it loads current values from storage and adds new values to them
function addToTotalCount(vulnerableScriptsCount, vulnerabilitiesCount, processedScriptsCount) {
    try {
        chrome.storage.local.get("vulnerableScriptsCount", function (received) {
            if (received.vulnerableScriptsCount > 0) {
                vulnerableScriptsCount += received.vulnerableScriptsCount;
            }

            chrome.storage.local.set({ "vulnerableScriptsCount": vulnerableScriptsCount }, function () { });
        });

        chrome.storage.local.get("vulnerabilitiesCount", function (received) {
            if (received.vulnerabilitiesCount > 0) {
                vulnerabilitiesCount += received.vulnerabilitiesCount;
            }

            chrome.storage.local.set({ "vulnerabilitiesCount": vulnerabilitiesCount }, function () { });
        });

        chrome.storage.local.get("processedScriptsCount", function (received) {
            if (received.processedScriptsCount > 0) {
                processedScriptsCount += received.processedScriptsCount;
            }

            chrome.storage.local.set({ "processedScriptsCount": processedScriptsCount }, function () { });
        });
    } catch (error) {
        console.log(error);
    }
}

// store found vulnerabilities to storage
// it loads currently stored vulnerabilities and append new vulnerabilities to them, then 
// they are stored back
function addToHistory(vulnerabilities, url) {
    try {
        for (let i = 0; i < vulnerabilities.length; i++) {
            const vulnerability = vulnerabilities[i];
            vulnerability.url = url;
        }

        chrome.storage.local.get("vulnerabilities", function (received) {
            if (!received.vulnerabilities) {
                chrome.storage.local.set({ "vulnerabilities": vulnerabilities }, function () { });
                return;
            }

            let parsed = received.vulnerabilities;
            let combined = parsed.concat(vulnerabilities);
            chrome.storage.local.set({ "vulnerabilities": combined }, function () { });
        });

    } catch (error) {
        console.log(error);
    }
}