const escodegen = require("escodegen");
const acorn = require("acorn");
const hash = require('object-hash');
const walk = require("./my_walk");

function firstInSecond(a, b) {
    if (a === b) return true;

    if (typeof a != "object" || typeof b != "object" || a == null || b == null)
        return false;

    let keysA = Object.keys(a),
        keysB = Object.keys(b);

    if (keysA.length > keysB.length) return false;

    for (let key of keysA) {
        if (!keysB.includes(key)) return false;

        if (typeof a[key] === "function" || typeof b[key] === "function") {
            if (a[key].toString() != b[key].toString()) return false;
        } else {
            if (!firstInSecond(a[key], b[key])) return false;
        }
    }

    return true;
}

function tryParse(code) {
    try {
        let ast = acorn.parse(code, { ecmaVersion: "latest", sourceType: "module" });
        return normalise(ast);
    } catch (error) {
        console.log(error);
        return false;
    }
}

// https://stackoverflow.com/questions/17382427/are-there-pointers-in-javascript/17382443#17382443
function replaceReferencedObj(refObj, newObj) {
    let keysR = Object.keys(refObj);
    let keysN = Object.keys(newObj);
    for (let i = 0; i < keysR.length; i++) {
        delete refObj[keysR[i]];
    }
    for (let i = 0; i < keysN.length; i++) {
        refObj[keysN[i]] = newObj[keysN[i]];
    }
}

function findMatches(input, vulnerabilitiesList, patchList) {
    const ast = tryParse(input);
    if (ast == false) return false;

    const foundVulnerabilities = [];

    // go over each node
    walk.full(ast, (node) => {
        // compute node hash
        // var nodeHash = hash.MD5(node);
        // go over each vulnerability
        vulnerabilitiesList.forEach((vulnerability) => {
            // if the node matches vulnerability
            // if (nodeHash == vulnerability.hash)
            if (firstInSecond(vulnerability.ast, node)) {
                var patchId = vulnerability.patch;
                var patch = patchList.find((p) => p.id == patchId);
                replaceReferencedObj(node, patch);
                foundVulnerabilities.push(vulnerability);
            }
        });
    });

    if (foundVulnerabilities.length > 0) {
        const output = escodegen.generate(ast);
        return [foundVulnerabilities, output];
    }
    return [foundVulnerabilities, input];
}

function deepEqual(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (const key of keys1) {
        const val1 = object1[key];
        const val2 = object2[key];
        const areObjects = isObject(val1) && isObject(val2);
        if (
            areObjects && !deepEqual(val1, val2) ||
            !areObjects && val1 !== val2
        ) {
            return false;
        }
    }
    return true;
}

function isObject(object) {
    return object != null && typeof object === 'object';
}

function normaliseQuotes(str, quote = "\"") {
    if (str.startsWith("\'")) {
        str = quote + str.substring(1);
    }

    if (str.endsWith("\'")) {
        str = str.slice(0, -1) + quote;
    }

    return str;
}

function normaliseVariableDeclarations(nodeList) {
    let i = 0;

    while (nodeList.length > 1 && i < nodeList.length - 1) {
        if (checkTypes(nodeList[i], nodeList[i + 1])) {
            nodeList[i].declarations = mergeDeclarations(nodeList[i], nodeList[i + 1]);
            nodeList.splice(i + 1, 1)
        } else {
            i++;
        }
    }

    return nodeList;

    function checkTypes(node1, node2) {
        return node1.type == 'VariableDeclaration' && node2.type == 'VariableDeclaration' && node1.kind == node2.kind;
    }

    function mergeDeclarations(dec1, dec2) {
        return dec1.declarations.concat(dec2.declarations);
    }
}



function normalise(ast) {
    walk.simple(ast, {
        // String quotes
        Literal(node) {
            if (node.raw && typeof node.value === 'string') {
                node.raw = normaliseQuotes(node.raw);
            }
        },
        // variable declarations
        Program(node) {
            node.body = normaliseVariableDeclarations(node.body);
        },
        BlockStatement(node) {
            node.body = normaliseVariableDeclarations(node.body);

        },
        StaticBlock(node) {
            node.body = normaliseVariableDeclarations(node.body);
        }
    });

    // Hoisting (?)
    return ast;
}

module.exports = {
    tryParse,
    findMatches,
    deepEqual,
    hash
}