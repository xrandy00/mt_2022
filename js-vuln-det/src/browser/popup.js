var rad = document.modeForm.mode;
var prev = null;
for (var i = 0; i < rad.length; i++) {
    rad[i].addEventListener('change', function () {
        if (this !== prev) {
            prev = this;
        }
        chrome.storage.sync.set({ js_vulnerability_detector__mode: this.value });
    });
}

var mode = 'repair';

chrome.storage.sync.get('js_vulnerability_detector__mode', function (data) {
    mode = data.js_vulnerability_detector__mode;
    console.log('receiving data ' + mode);
    console.log(mode);
    rad.value = mode;
});



