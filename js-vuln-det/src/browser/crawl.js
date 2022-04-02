import sites from "./sites_list";

async function crawl(startAt = 0, endAt = 100) {
    if (endAt > sites.length) return;
    if (startAt < 0) return;

    console.log('starting crawl', startTime);
    var sitesToCrawl = sites.slice(startAt, endAt);
    var promiseResolve, promiseReject;

    chrome.tabs.onUpdated.addListener(function (tabId, info) {
        if (info.status === 'complete') {
            promiseResolve();
            console.log('resolved');
        }
    });

    for (let i = 0; i < sitesToCrawl.length; i++) {
        const site = sitesToCrawl[i];
        var startTime = performance.now();

        var promise = new Promise(function (resolve, reject) {
            promiseResolve = resolve;
            promiseReject = reject;

            setTimeout(() => {
                resolve();
            }, 5000);
        });

        chrome.tabs.update({
            url: `https://${site}`
        });

        await promise;
        var endTime = performance.now()
        console.log(`Site ${site} took ${endTime - startTime} milliseconds`);
    }
}

export default crawl;