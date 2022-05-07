/**
 * Not part of the extension build. To use this script, first check this diff 
 * https://github.com/xrandy00/mt_2022/commit/cf2fdf3338c1b934ec636f633c85d54024f555ed#diff-7c5d8d68598aff2f74ddadf9c5eafcb290d180f18fa45424dd97200645f6ea91
 * and add the support for this script back to content.js.  
 * 
 * @summary Script for performing web crawl via extension
 * @author Vojtěch Randýsek, xrandy00@vutbr.cz
 *
 * Created at     : 2022-05-06 21:40:19 
 * Last modified  : 2022-05-07 10:45:13
 */

import sites from "./sites_list";

// iterate over sites from sites_list from startAt to endAt indices
// if the page is not loaded in 5s, go to next one
async function crawl(startAt = 0, endAt = 100) {
    if (endAt > sites.length) return;
    if (startAt < 0) return;
    let startTime = performance.now();

    console.log('starting crawl', startTime);
    // get the sites to crawl to in memory variable
    let sitesToCrawl = sites.slice(startAt, endAt);
    let promiseResolve, promiseReject;

    // little trick to stop the timer, after page is loaded
    // this callback is called after each page is loaded
    chrome.tabs.onUpdated.addListener(function (_, info) {
        if (info.status === 'complete') {
            promiseResolve(); // stop the timer if page is loaded
        }
    });

    for (let i = 0; i < sitesToCrawl.length; i++) {
        console.log(i);
        // increment crawlCount element in the popup.html to indicate progress of the crawl
        document.getElementById('crawlCount').innerText = i;
        const site = sitesToCrawl[i];

        // this promise is resolved either after 5s, or once the page is loaded, whichever comes first
        // idea is to prevent getting stuck on page loading, so the loading is terminated after 5s
        let promise = new Promise(function (resolve, reject) {
            promiseResolve = resolve;
            promiseReject = reject;

            setTimeout(() => {
                resolve();
            }, 5000);
        });

        // navigate to the site
        chrome.tabs.update({
            url: `https://${site}`
        });


        await promise;
    }
    let endTime = performance.now()

    console.log(`Overall startAt: ${startAt} endAt: ${endAt}, count: ${endAt - startAt}, took ${endTime - startTime} milliseconds`);
}

export default crawl;