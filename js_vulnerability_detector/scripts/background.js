chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.src) {
        console.log('processing ' + request.src);
        // TODO - actually process something
        sendResponse('received ' + request);

    } else if (request.script) {
        console.log('processing ' + request.script);
        // TODO - actually process something
        sendResponse('received ' + request);
    } 
});


// chrome.action.setBadgeBackgroundColor({ color: '#F00' }, () => {
//     chrome.action.setBadgeText({ text: 'script' });
// });