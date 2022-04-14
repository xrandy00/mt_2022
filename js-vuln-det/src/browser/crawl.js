import sites from "./sites_list";

async function crawl(startAt = 0, endAt = 100) {
    if (endAt > sites.length) return;
    if (startAt < 0) return;
    let startTime = performance.now();

    console.log('starting crawl', startTime);
    let sitesToCrawl = sites.slice(startAt, endAt);
    let promiseResolve, promiseReject;

    chrome.tabs.onUpdated.addListener(function (tabId, info) {
        if (info.status === 'complete') {
            promiseResolve();
        }
    });

    for (let i = 0; i < sitesToCrawl.length; i++) {
        console.log(i);
        const site = sitesToCrawl[i];

        let promise = new Promise(function (resolve, reject) {
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
    }
    let endTime = performance.now()

    console.log(`Overall startAt: ${startAt} endAt: ${endAt}, count: ${endAt - startAt}, took ${endTime - startTime} milliseconds`);
}

export default crawl;