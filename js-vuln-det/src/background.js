const jsToAst = require('js-to-ast');


chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        try {
            console.log('received script ', request.script != null, request.scr != null);

            if (request.src != null) {
                makeRequest("GET", request.src).then(
                    function (script) {
                        console.log('fetched script ' + script);
                        let response = jsToAst.processScript(script);
                        if (response && response.length == 2 && response[0].length > 0) {
                            sendResponse(response[1]);
                        } else {
                            sendResponse(null);
                        }
                    }
                ).catch(function (err) {
                    console.log('could not fetch', err);
                })

                return true;
            } else if (request.script != null) {
                let response = jsToAst.processScript(request.script);
                if (response && response.length == 2 && response[0].length > 0) {
                    sendResponse(response[1]);
                } else {
                    sendResponse(null);
                }            }
        } catch (e) {
            console.log(e);
        }
    }
);



// chrome.action.setBadgeBackgroundColor({ color: '#F00' }, () => {
//     chrome.action.setBadgeText({ text: 'script' });
// });

// https://stackoverflow.com/questions/48969495/in-javascript-how-do-i-should-i-use-async-await-with-xmlhttprequest
function makeRequest(method, url) {
    return new Promise(function (resolve, reject) {
        fetch(url)
            .then(
                function (response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }

                    // Examine the text in the response
                    console.log(response);
                    response.text().then(function (data) {
                        console.log(data);
                        resolve(data);
                    });
                }
            )
            .catch(function (err) {
                reject(err);
            });
    });
}