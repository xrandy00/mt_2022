// helper script to show AST in format needed by finder.js

const finder = require("./finder");


const inputAst = finder.tryParse(
    `	for ( ; i < length; i++ ) {\r\n\t\t\/\/ Only deal with non-null\/undefined values\r\n\t\tif ( ( options = arguments[ i ] ) != null ) {\r\n\t\t\t\/\/ Extend the base object\r\n\t\t\tfor ( name in options ) {\r\n\t\t\t\tcopy = options[ name ];\r\n\r\n\t\t\t\t\/\/ Prevent never-ending loop\r\n\t\t\t\tif ( target === copy ) {\r\n\t\t\t\t\tcontinue;\r\n\t\t\t\t}\r\n\r\n\r\n    \r\n          \r\n            \r\n    \r\n\r\n          \r\n    \r\n    \r\n  \r\n\t\t\t\t\/\/ Recurse if we\'re merging plain objects or arrays\r\n\t\t\t\tif ( deep && copy && ( jQuery.isPlainObject( copy ) ||\r\n\t\t\t\t\t( copyIsArray = Array.isArray( copy ) ) ) ) {\r\n\t\t\t\t\tsrc = target[ name ];\r\n\t\t\t\t\t\/\/ Ensure proper type for the source value\r\n\t\t\t\t\tif ( copyIsArray && !Array.isArray( src ) ) {\r\n\t\t\t\t\t\tclone = [];\r\n\t\t\t\t\t} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {\r\n\t\t\t\t\t\tclone = {};\r\n\t\t\t\t\t} else {\r\n\t\t\t\t\t\tclone = src;\r\n\t\t\t\t\t}\r\n\t\t\t\t\tcopyIsArray = false;\r\n\t\t\t\t\t\/\/ Never move original objects, clone them\r\n\t\t\t\t\ttarget[ name ] = jQuery.extend( deep, clone, copy );\r\n\t\t\t\t\/\/ Don\'t bring in undefined values\r\n\t\t\t\t} else if ( copy !== undefined ) {\r\n\t\t\t\t\ttarget[ name ] = copy;\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t}\r\n\t}`
);
const patchAst = finder.tryParse(
    `for ( ; i < length; i++ ) {\r\n\t\t\/\/ Only deal with non-null\/undefined values\r\n\t\tif ( ( options = arguments[ i ] ) != null ) {\r\n\t\t\t\/\/ Extend the base object\r\n\t\t\tfor ( name in options ) {\r\n\t\t\t\tcopy = options[ name ];\r\n\r\n\t\t\t\t\/\/ Prevent never-ending loop\r\n\t\t\t\tif ( target === copy ) {\r\n\t\t\t\t\tcontinue;\r\n\t\t\t\t}\r\n\r\n\r\n    \r\n          \r\n            \r\n    \r\n\r\n          \r\n    \r\n    \r\n  \r\n\t\t\t\t\/\/ Recurse if we\'re merging plain objects or arrays\r\n\t\t\t\tif ( deep && copy && ( jQuery.isPlainObject( copy ) ||\r\n\t\t\t\t\t( copyIsArray = Array.isArray( copy ) ) ) ) {\r\n\t\t\t\t\tsrc = target[ name ];\r\n\t\t\t\t\t\/\/ Ensure proper type for the source value\r\n\t\t\t\t\tif ( copyIsArray && !Array.isArray( src ) ) {\r\n\t\t\t\t\t\tclone = [];\r\n\t\t\t\t\t} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {\r\n\t\t\t\t\t\tclone = {};\r\n\t\t\t\t\t} else {\r\n\t\t\t\t\t\tclone = src;\r\n\t\t\t\t\t}\r\n\t\t\t\t\tcopyIsArray = false;\r\n\t\t\t\t\t\/\/ Never move original objects, clone them\r\n\t\t\t\t\ttarget[ name ] = jQuery.extend( deep, clone, copy );\r\n\t\t\t\t\/\/ Don\'t bring in undefined values\r\n\t\t\t\t} else if ( copy !== undefined ) {\r\n\t\t\t\t\ttarget[ name ] = copy;\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t}\r\n\t}`
);

const title = "XSS in jQuery <3.4.0 as used in Drupal, Backdrop CMS, and other products";
const description = "jQuery before 3.4.0, as used in Drupal, Backdrop CMS, and other products, mishandles jQuery.extend(true, {}, ...) because of Object.prototype pollution";
const severity = 2;
const referenceUrl = "https://github.com/advisories/GHSA-6c3j-c64m-qhgq";

console.log(JSON.stringify({
    "title": title,
    "description": description,
    "reference_url": referenceUrl,
    "severity": parseInt(severity),
    "ast": inputAst,
    "patch": patchAst,
}, (k, v) => (k === 'start' || k === 'end' || k === 'sourceType') ? undefined : v));