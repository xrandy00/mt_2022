const finder = require("./finder");
const generated_vulnerabilities = require('./generated_vulnerabilities.json')

const manual_vulnerabilities = [{
    "title": "Debug Vulnerability",
    "description": "Initial debug vulnerability, caused by 'console.log(\"Hello World!\")'",
    "reference_url": "https://google.com",
    "severity": 0,
    "ast": {
        "type": "ExpressionStatement",
        "expression": {
            "type": "CallExpression",
            "callee": {
                "type": "MemberExpression",
                "object": {
                    "type": "Identifier",
                    "name": "console"
                },
                "property": {
                    "type": "Identifier",
                    "name": "log"
                },
                "computed": false,
                "optional": false
            },
            "arguments": [{
                "type": "Literal",
                "value": "Hello World!",
                "raw": "\"Hello World!\""
            }],
            "optional": false
        }
    },
    "patch": {
        "type": "ExpressionStatement",
        "expression": {
            "type": "CallExpression",
            "callee": {
                "type": "MemberExpression",
                "object": {
                    "type": "Identifier",
                    "name": "console"
                },
                "property": {
                    "type": "Identifier",
                    "name": "log"
                },
                "computed": false,
                "optional": false
            },
            "arguments": [{
                "type": "Literal",
                "value": "Hello World Fixed!",
                "raw": "\"Hello World Fixed!\""
            }],
            "optional": false
        }
    }
},
{
    "title": "Debug Vulnerability 2",
    "description": "Initial debug vulnerability, caused by 'const parsedData = JSON.parse(data)'",
    "reference_url": "https://google.com",
    "severity": 1,
    "ast": {
        "type": "VariableDeclaration",
        "declarations": [{
            "type": "VariableDeclarator",
            "id": {
                "type": "Identifier",
                "name": "parsedData"
            },
            "init": {
                "type": "CallExpression",
                "callee": {
                    "type": "MemberExpression",
                    "object": {
                        "type": "Identifier",
                        "name": "JSON"
                    },
                    "property": {
                        "type": "Identifier",
                        "name": "parse"
                    },
                    "computed": false,
                    "optional": false
                },
                "arguments": [{
                    "type": "Identifier",
                    "name": "data"
                }],
                "optional": false
            }
        }],
        "kind": "const"
    },
    "patch": {
        "type": "VariableDeclaration",
        "declarations": [{
            "type": "VariableDeclarator",
            "id": {
                "type": "Identifier",
                "name": "parsedData"
            },
            "init": {
                "type": "CallExpression",
                "callee": {
                    "type": "MemberExpression",
                    "object": {
                        "type": "Identifier",
                        "name": "JSON"
                    },
                    "property": {
                        "type": "Identifier",
                        "name": "stringify"
                    },
                    "computed": false,
                    "optional": false
                },
                "arguments": [{
                    "type": "Identifier",
                    "name": "data"
                }],
                "optional": false
            }
        }],
        "kind": "const"
    }
}
];

const vulnerabilities = manual_vulnerabilities.concat(generated_vulnerabilities)


function processScript(input) {
    return finder.findMatches(input, vulnerabilities);
}

module.exports = {
    processScript,
    vulnerabilities
}