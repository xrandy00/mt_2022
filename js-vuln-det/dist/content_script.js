(()=>{class e{static Disabled=new e("disabled");static Analyze=new e("analyze");static Block=new e("block");static Repair=new e("repair");constructor(e){this.name=e}}function n(){window.stop()}function t(){document.documentElement.innerHTML="Reloading Page..."}function o(n){console.log("in process page");var t=new XMLHttpRequest;t.open("GET",window.location.href,!0),t.onerror=function(){document.documentElement.innerHTML="Error getting Page"},t.onload=function(){const t=document.implementation.createHTMLDocument("");t.documentElement.innerHTML=this.responseText;const o=document.importNode(t.documentElement,!0),c=o.querySelectorAll("script");for(let e=0;e<c.length;++e){const n=c[e];n.src?(n.setAttribute("original-src",n.src),chrome.runtime.sendMessage({src:n.src},(e=>{console.log("received user data",e)}))):chrome.runtime.sendMessage({script:n.innerHTML},(e=>{console.log("received user data",e)}))}if(n!=e.Analyze){document.replaceChild(o,document.documentElement),delete t;const e=document.createElement("script");e.src=chrome.runtime.getURL("scripts/evaluate.js"),e.setAttribute("ignore","true"),document.documentElement.appendChild(e)}},t.send()}chrome.storage.sync.get("js_vulnerability_detector__mode",(function(c){let r=c.js_vulnerability_detector__mode;switch((null!=r?new e(r):new e.Repair).name){case e.Disabled.name:break;case e.Analyze.name:o(e.Analyze);break;case e.Block.name:n(),t(),o(e.Block);break;case e.Repair.name:n(),t(),o(e.Repair)}}))})();