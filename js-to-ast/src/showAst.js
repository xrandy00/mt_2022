// helper script to show AST in format needed by finder.js

const walk = require("./my_walk");
const finder = require("./finder");

const args = process.argv.slice(2)

const inputAst = finder.tryParse(args[0]);
const patchAst = finder.tryParse(args[1]);

const title = args[2];
const description = args[3];
const severity = args[4];
const referenceUrl = args[5];

if (finder.deepEqual(inputAst, patchAst)) { return; }

console.log(JSON.stringify({
    "title": title,
    "description": description,
    "reference_url": referenceUrl,
    "severity": parseInt(severity),
    "ast": inputAst,
    "patch": patchAst,
}, (k, v) => (k === 'start' || k === 'end' || k === 'sourceType') ? undefined : v));