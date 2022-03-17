const jsToAst = require('js-to-ast');


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        try {
            if (request.type == "processScript") {
                if (request.src != null) {
                    makeRequest("GET", request.src).then(
                        function(script) {
                            let response = jsToAst.processScript(script);
                            if (response && response.length == 2 && response[0].length > 0) {
                                sendResponse(response);
                            } else {
                                sendResponse(null);
                            }
                        }
                    ).catch(function(err) {
                        console.log('could not fetch', err);
                    })

                    return true;
                } else if (request.script != null) {
                    let response = jsToAst.processScript(request.script);
                    if (response && response.length == 2 && response[0].length > 0) {
                        sendResponse(response);
                    } else {
                        sendResponse(null);
                    }
                }
            } else if (request.type == "result") {
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

// https://stackoverflow.com/questions/48969495/in-javascript-how-do-i-should-i-use-async-await-with-xmlhttprequest
function makeRequest(method, url) {
    return new Promise(function(resolve, reject) {
        fetch(url)
            .then(
                function(response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }

                    response.text().then(function(data) {
                        resolve(data);
                    });
                }
            )
            .catch(function(err) {
                reject(err);
            });
    });
}

function addToTotalCount(count) {
    chrome.storage.local.get("count", function(received) {
        if (received.count > 0) {
            count += received.count;
        }

        chrome.storage.local.set({ "count": count }, function() {});
    });

}

function addToHistory(vulnerabilities, url) {
    chrome.storage.local.get("vulnerabilities", function(received) {
        let mapped = vulnerabilities.map((x) => {
            return {
                "reference_url": x["reference_url"],
                "url": url,
                "title": x["title"],
                "severity": x["severity"],
            };
        });

        console.log(mapped);
        console.log(received.vulnerabilities);

        if (!received.vulnerabilities) {
            chrome.storage.local.set({ "vulnerabilities": mapped }, function() {});
            return;
        }

        // let parsed = JSON.parse(received.vulnerabilities);
        let parsed = received.vulnerabilities;
        let combined = parsed.concat(mapped);
        chrome.storage.local.set({ "vulnerabilities": combined }, function() {});
    });

}