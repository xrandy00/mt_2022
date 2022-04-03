# Detecting JavaScript Code with Known Vulnerabilites
Detekce kódu v jazyce JavaScript se známými bezpečnostními chybami

## js-to-ast
Node application for detecting known JavaScript code in input script. It internally uses Acorn and EsCodeGen libraries to parse the JavaScript code into AST, analyze it and rebuild it back into the form of a script.

Currently contains a hardcoded list of known vulnerabilities. For testing purposes they are just:

    console.log("Hello World!");

which is fixed to:

    console.log("Hello World Fixed!");

And

    const parsedData = JSON.parse(data);

which is fixed to:

    const parsedData = JSON.stringify(data);

## js-vuln-det
Chrome extension application written as Node application using Extension CLI (https://oss.mobilefirst.me/extension-cli/) and Webpack. Node is chosen so that js-to-ast can be easily referenced. Extension is written in Manifest V3 standard, as older Manifest V2 is no longer supported.

### Modes
Extension runs in three different modes:
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
Simple website containing an inline script and a script reference via src attribute. Purpose of this web, which will become more complex in future, is to test and verify rest of the tools.

## Contributing
No contributing allowed.

## Vulnerabilities
https://github.com/advisories/GHSA-9q5w-79cv-947m \
https://www.npmjs.com/package/remark-html\
https://github.com/remarkjs/remark-html/commit/b75c9dde582ad87ba498e369c033dc8a350478c1

Possible to use https://astexplorer.net/ or js-to-ast/src/showAst to generate AST + https://www.freeformatter.com/javascript-escape.html#ad-output to esacpe the input
## TODO
There is still lots of work to be done, mainly:
- [x] Reporting of found vulnerabilities
- [x] Use real vulnerabilities
- [ ] Code style - cleanup, optimizations
- [ ] Minification analysis/support - what is needed to analyze minified code as well? Add support for *equivalence classes* of ASTs. Such as 
    
        "Hello World" == 'Hello World' 

        var a = 1;
        var b = 2;
        ==
        var a=1,b=2;
This is probably too complex, just add minified builds of libraries (like jQuery) to Vulnerabilities.json
- [ ] Normalizace - inspire in plagiat detection
- [ ] Testing

- [ ] Vulnerabilities.json hosted externally (?)
- [ ] Manually creating Vulnerabilities.json for all known npm vulnerabilities (== 2k+)
- [ ] Release extension to store
- [ ] Performance measurement (?)
