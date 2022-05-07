/**
 * Part of js-to-ast library, contains functionality for finding vulnerabilities in AST.
 * Parses given script, finds vulnerabilities in it and normalizes it.
 *
 * @summary Part of js-to-ast library, contains functionality for finding vulnerabilities in AST.
 * @author Vojtěch Randýsek, xrandy00@vutbr.cz
 *
 * Created at     : 2022-05-06 21:29:18 
 * Last modified  : 2022-05-07 10:39:02
 */


// escodegen is a library for generating code from AST matching EsTree specification
const escodegen = require("escodegen");
// acorn is a parser library for JS, code in result matches EsTree specification
const acorn = require("acorn");
// one of many cryptographi libraries for JS, only SHA1 is used here
const crypto = require('crypto-js');
// modified clone of acorn-walk for AST traversal
const walk = require("./ast_walk");

// input parameter "code" is String of source JS
// returns normalized AST or false in case of error
function tryParse(code) {
    try {
        let ast = acorn.parse(code, { ecmaVersion: "latest", sourceType: "module" });
        return normalise(ast);
    } catch (error) {
        console.log(error);
        return false;
    }
}

// helper method for patching AST
// taken from https://stackoverflow.com/questions/17382427/are-there-pointers-in-javascript
// the idea is to replace object with other object, without changing the references to original object from its parent
// in C++ or simmilar languages it is possible to change the target of a pointer, in JS not
// this hack keeps the refObj existing, deletes all of its properties and then clones all of the properties
// from newObj
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

// main function of this library, it detects and patches known vulnerabilities in AST
// input - AST in the form from tryParse function
// vulnerabilities - object (pretty much a dictionary) of known vulnerabilities
// patches - object of patches
// meta - object of metadata
// for specific format of vulnerabilities, patches and meta refer to run.js and 
// generated_patches.json, generated_vulnerabilities_meta.json and generated_vulnerabilities.json
function findMatches(input, vulnerabilities, patches, meta) {
    // start by parsing the input and forwarding possible error value
    const ast = tryParse(input);
    if (ast == false) return false;
    const foundVulnerabilities = [];

    // traverse the tree, process all of the nodes
    // using other forms of traversal from acorn-walk library was actually slower then
    // processing all of the nodes, acorn-walk could use a little performance boost
    walk.full(ast, (node) => {
        const type = node.type;

        // Vulnerabilities is a dictionary where keys are various types of nodes from EsTree spec.
        const vulnerabilitiesForType = vulnerabilities[type];
        if (vulnerabilitiesForType) { // if there are no possible vulnerabilities for the node type, continue
            // To be able to hash the node, it has to be stringified first.
            // also remove unused properties 'start', 'end' and 'sourceType', they would corrupt the hash
            const asString = JSON.stringify(node, (k, v) => (k === 'start' || k === 'end' || k === 'sourceType') ? undefined : v);
            // SHA1 was performing slightly better then MD5 on my setup, but any algorithm can be used
            // however, if algorithm is changed all of the hashes need to be recalculated (DB re-creation)
            const nodeHash = crypto.SHA1(asString); 
            // in dictionary vulnerabilitiesForType there is a second-level dictionary,
            // where vulnerabilities are indexed (key-ed) by their hashes
            const vulnerability = vulnerabilitiesForType[nodeHash];

            if (vulnerability) {
                // patches (again) is a dictionary, where ASTs of vulnerability patches
                // are indexed by the ID (usually a hash). The id of patch is part of
                // vulnerability data. Not all vulnerabilities have patches, this part
                // is optional.
                const patch = patches[vulnerability.patch];
                if (patch != null) {
                    // if patch was found replace the vulnerable Node (and the whole subtree)
                    // with a fixed one, without changing the parent reference
                    replaceReferencedObj(node, patch);
                } 
                
                // as a last step access vulnerability metadata (separate dictionary to keep it simple and structured)
                // and store it in the result list, continue to process next node
                foundVulnerabilities.push(meta[vulnerability.id]);
            }
        }
    });

    if (foundVulnerabilities.length > 0) {
        // in case there were vulnerabilities found the output script is generated
        // using escodegen library from (hopefully) patched AST
        const output = escodegen.generate(ast);
        return {foundVulnerabilities: foundVulnerabilities, output: output};
    }

    // if there were no vulnerabilities, there is no reason to generate new code,
    // just return original input with empty result
    return {foundVulnerabilities: foundVulnerabilities, output: input};
}

// helper function, not used in the library directly
// iterates over all of the properties (keys) of two given objects
// and compares them for deep equality
// its intended use was for processing GIT commits - when two GIT commits (C1 and C2) are downloaded
// we iterate over all of the files F1, F2 .. Fn in commit C1, find their mirror in C2 and we 
// need to decide, whether the file changed or not. The simplest, naive, implementation is to
// compute AST of both of them and compare them for equality by using this deepEqual method.
// This method was created before hashing was introduced and stayed till the current state.
// Hashing of the AST could lead to removal of this method in future, performance should be measured though.
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

// simple helper predicate
function isObject(object) {
    return object != null && typeof object === 'object';
}

// replace all single quotes in "str" with double quotes 
function normaliseQuotes(str) {
    const quote = "\"";
    if (str.startsWith("\'")) {
        str = quote + str.substring(1);
    }

    if (str.endsWith("\'")) {
        str = str.slice(0, -1) + quote;
    }

    return str;
}

// attribute nodeList is a list of nodes that can possibly be VariableDeclarations
// if there are two adjacent nodes of type VariableDeclaration, their inner declarations are merged
// and only one VariableDeclaration node is left
// this is a function often done by minifiers
function normaliseVariableDeclarations(nodeList) {
    let i = 0;

    // go over the nodes and find adjacent VariableDeclaration nodes
    while (nodeList.length > 1 && i < nodeList.length - 1) {
        if (checkTypes(nodeList[i], nodeList[i + 1])) {
            // take all the declarations of both nodes, merge them and save them in the first node
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

// go over specific nodes of the AST and perform normalisation on them
// supported normalisations are:
// Literal node - normalise quotes
// Program, BlockStatement, StaticBlock - normalise VariableDeclaration nodes
// other normalisations can be added in future
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

    return ast;
}

module.exports = {
    tryParse,
    findMatches,
    deepEqual,
    crypto
}