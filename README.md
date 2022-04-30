# Detecting JavaScript Code with Known Vulnerabilites
This repository contains the output and notes for my Master Thesis on Brno University of Technology, graduation year 2022. The goal is to create a Chrome Extension with ability to detect JavaScript with known vulnerabilities. Overall, the goal was accomplished.
## js-to-ast
Node application for detecting known JavaScript code in input script. It internally uses Acorn and EsCodeGen libraries to parse the JavaScript code into AST, analyze it and rebuild it back into the form of a script.

List of known vulnerabilities, patches and metadata are in files generated_vulnerabilities.json, generated_vulnerabilities_meta.json ad generated_patches.json.

## js-vuln-det
Chrome extension application written as Node application using Extension CLI (https://oss.mobilefirst.me/extension-cli/) and Webpack. Node is chosen so that js-to-ast can be easily referenced. Extension is written in Manifest V3 standard, as older Manifest V2 is no longer supported.

The extension is published to Chrome Webstore https://chrome.google.com/webstore/detail/js-vulnerability-detector/bmcojnncgfmglejiinbdnahmkmbgifhk

### Modes
Extension runs in four different modes:

0. Disabled - Extension is enabled, but not active.
1. Analyze - Functionality of the web is not affected. Scripts are asynchronously analyzed without impacting the page.
2. Block - If a script is considered vulnerable, it is removed from the website, which may break the page.
3. Repair - If a script is considered vulnerable, it is replaced with a fixed version, if available.

### Principle
1. Mode selection - *popup.js* and *popup.html*, currently only for mode selection. Selected mode is stored in *chrome.storage*. In future if will be possible to see metadata of found vulnerabilities. There will also be a notification badge on the icon of the extension, showing the count of found vulnerabilities on current site.
2. *Background.js* is a service worker script, that waits for messages from *content_script.js*. If the message contains a script code, js-to-ast package is used to process it and to find known vulnerabilities in it. If the message contains only URL of the script, it is first downloaded using the *fetch* API.
3. *Content_script.js* first stops the original page from loading and shows a loadign screen instead. This is so that potentially vulnerable scripts are not executed until they are analyzed. Webpage is loaded into memory by downloading it using *XMLHttpRequest* and *window.location.href*. Page is searched for *script* tags. Found scripts are sent to *background.js* for processing. Results of the processing are used based on selected Mode. For Analyze nothing happens, for Block the scripts are removed from DOM, for Repair the *src* attribute on scripts is removed and *innerHtml* is set to fixed script content. Last trick is adding *evaluate.js* script to the DOM and setting the, now processed, page into current *document*.
4. *Evaluate.js* script has a single purpose - iterate over all scripts in document and re-add them to the DOM. The removing and adding them back (in order) will cause them to execute, which is otherwise not possible (except using *eval*).


### Whitelist
During initial testing some pages were broken by the core principles of the extension. A hard-coded whitelist was introduced. If a website is in whitelist, extension takes no action on it. The first whitelisted page was google.com, due to infinite loading that happened when Google search was navigated through Chrome search bar.

Probably not needed anymore - the race condition on load was added, to easier support disabled and analysis modes.

## test-web
Simple website for demonstration of extension functionality. It includes some of the vulnerable scripts detectable by the extension. Currently the website is hosted at
https://www.stud.fit.vutbr.cz/~xrandy00

## Contributing
No contributing allowed.

## TODO
There is still lots of work to be done, mainly:
- [x] Reporting of found vulnerabilities
- [x] Use real vulnerabilities
- [x] Code style - cleanup, optimizations
- [x] Minification analysis/support - what is needed to analyze minified code as well? Add support for *equivalence classes* of ASTs. Such as 
    
        "Hello World" == 'Hello World' 

        let a = 1;
        let b = 2;
        ==
        let a=1,b=2;
This is probably too complex, just add minified builds of libraries (like jQuery)
- [x] Normalization - perform some optimizations on the AST before processing it
- [x] Testing - unit tests and web crawl were done
- [ ] Manually creating Vulnerabilities.json for all known npm vulnerabilities (== 2k+)
- [x] Release extension to store
- [x] Performance measurement - done, structure of data was modified based on the findings

