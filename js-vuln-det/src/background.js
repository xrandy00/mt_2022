const jsToAst = require('js-to-ast');


chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        try {
            if (request.type == "processScript") {
                if (request.src != null) {
                    makeRequest(request.src).then((script) => {
                        let response = jsToAst.processScript(script);
                        if (response && response.length == 2 && response[0]?.length > 0) {
                            sendResponse(response);
                        } else {
                            sendResponse(null);
                        }

                    });
                    return true;
                } else
                    if (request.script != null) {
                        let response = jsToAst.processScript(request.script);

                        if (response && response.length == 2 && response[0]?.length > 0) {
                            sendResponse(response);
                        } else {
                            sendResponse(null);
                        }
                    }
            }
            else if (request.type == "result") {
                if (request.count > 0) {
                    chrome.action.setBadgeText({ text: request.count.toString() });
                } else {
                    chrome.action.setBadgeText({ text: '' });
                }

                addToTotalCount(request.count);
                addToHistory(request.vulnerabilities, request.url);

                sendResponse(true);

            }
            sendResponse(true);
        } catch (e) {
            console.log(e);
        }
    }
);

async function makeRequest(url) {
    try {
        let response = await fetch(url);
        let data = response.text();
        return data;
    } catch (error) {
        console.log(error);
    }
}

function addToTotalCount(count) {
    try {
        chrome.storage.local.get("count", function (received) {
            if (received.count > 0) {
                count += received.count;
            }

            chrome.storage.local.set({ "count": count }, function () { });
        });
    } catch (error) {
        console.log(error);
    }
}

function addToHistory(vulnerabilities, url) {
    try {
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