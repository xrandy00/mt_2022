const finder = require("./finder");

const vulnerabilities = require('./generated_vulnerabilities.json')
const patches = require('./generated_patches.json')


// if (!vulnerabilities["ExpressionStatement"]) { vulnerabilities["ExpressionStatement"] = {} };
// vulnerabilities["ExpressionStatement"]["47e22f30b29c0de02bc6ff808e6105ff"] = {
//     "title": "Debug Vulnerability",
//     "description": "Initial debug vulnerability, caused by 'console.log(\"Hello World!\")'",
//     "reference_url": "https://google.com",
//     "severity": 0,
//     "patch": null,

// };

// if (!vulnerabilities["VariableDeclaration"]) { vulnerabilities["VariableDeclaration"] = {} };
// vulnerabilities["VariableDeclaration"]["a176d38848d2fbeff55dee4731910452"] = {
//     "title": "Debug Vulnerability 2",
//     "description": "Initial debug vulnerability, caused by 'const parsedData = JSON.parse(data)'",
//     "reference_url": "https://google.com",
//     "severity": 1,
//     "patch": null,
// };

if (!vulnerabilities["Literal"]) { vulnerabilities["Literal"] = {} };
vulnerabilities["Literal"]["51abcac6495b7eafde220e9b91f2b77b"] = {
    "title": "Cross-Site Scripting in jquery < 1.9.0",
    "description": "Regex leading to XSS is replaced for not vulnerable regex https://github.com/jquery/jquery/commit/05531fc4080ae24070930d15ae0cea7ae056457d",
    "reference_url": "https://github.com/advisories/GHSA-2pqj-h3vj-pqgw",
    "severity": 2,
    "patch": "3",
};

vulnerabilities["Literal"]["8ec7a7037fe360e3cb82ceb3a5511ad2"] = {
    "title": "Cross-Site Scripting in jquery < 1.9.0",
    "description": "Regex leading to XSS is replaced for not vulnerable regex https://github.com/jquery/jquery/commit/f71a6ec6cfe3f748a939eaa109e92b8a9bdac6cc",
    "reference_url": "https://github.com/advisories/GHSA-2pqj-h3vj-pqgw",
    "severity": 2,
    "patch": "3",
};

vulnerabilities["Literal"]["c66be91ed8b3e9e8bb25807ce2d11767"] = {
    "title": "Cross-Site Scripting in jquery < 1.9.0",
    "description": "Regex leading to XSS is replaced for not vulnerable regex https://github.com/jquery/jquery/commit/0877d424e08d57e6f0d1da9a86289fb10d0ee136",
    "reference_url": "https://github.com/advisories/GHSA-2pqj-h3vj-pqgw",
    "severity": 2,
    "patch": "3",
};

vulnerabilities["Literal"]["cda0e636ff562bb13802bf3ba48a0a6f"] = {
    "title": "Potential XSS vulnerability in jQuery < 3.5.0",
    "description": "Not fixable",
    "reference_url": "https://github.com/advisories/GHSA-gxr4-xjj5-5px2",
    "severity": 2,
    "patch": null,
};

vulnerabilities["Literal"]["faec943064ea265a0bb9c289b213108c"] = {
    "title": "Regular Expression Denial of Service (ReDoS) in lodash",
    "description": "lodash prior to 4.7.11 is affected by: CWE-400: Uncontrolled Resource Consumption. The impact is: Denial of service. The component is: Date handler. The attack vector is: Attacker provides very long strings, which the library attempts to match using a regular expression. The fixed version is: 4.7.11.",
    "reference_url": "https://github.com/advisories/GHSA-x5rq-j2xg-h7qm",
    "severity": 3,
    "patch": "5",
};

vulnerabilities["Literal"]["fc18cfb8cb0057669897f6246280f509"] = {
    "title": "Regular Expression Denial of Service in moment",
    "description": "Affected versions of moment are vulnerable to a low severity regular expression denial of service when parsing dates as strings.",
    "reference_url": "https://github.com/advisories/GHSA-446m-mv8f-q348",
    "severity": 2,
    "patch": "6",
};

if (!vulnerabilities["ForStatement"]) { vulnerabilities["ForStatement"] = {} };
vulnerabilities["ForStatement"]["17c2d6f19df654abd4e15bb962bcbce0"] = {
    "title": "XSS in jQuery <3.4.0 as used in Drupal, Backdrop CMS, and other products",
    "description": "jQuery before 3.4.0, as used in Drupal, Backdrop CMS, and other products, mishandles jQuery.extend(true, {}, ...) because of Object.prototype pollution",
    "reference_url": "https://github.com/advisories/GHSA-6c3j-c64m-qhgq",
    "severity": 2,
    "patch": "4",
};

patches["1"] = {
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
};
patches["2"] = {
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
};
patches["3"] = {
    "type": "Literal",
    "value": {},
    "raw": "/^(?:(<[\\w\\W]+>)[^>]*|#([\\w-]*))$/",
    "regex": {
        "pattern": "^(?:(<[\\w\\W]+>)[^>]*|#([\\w-]*))$",
        "flags": ""
    }
};
patches["4"] = {
    "type": "ForStatement",
    "init": null,
    "test": {
        "type": "BinaryExpression",
        "left": {
            "type": "Identifier",
            "name": "i"
        },
        "operator": "<",
        "right": {
            "type": "Identifier",
            "name": "length"
        }
    },
    "update": {
        "type": "UpdateExpression",
        "operator": "++",
        "prefix": false,
        "argument": {
            "type": "Identifier",
            "name": "i"
        }
    },
    "body": {
        "type": "BlockStatement",
        "body": [{
            "type": "IfStatement",
            "test": {
                "type": "BinaryExpression",
                "left": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "name": "options"
                    },
                    "right": {
                        "type": "MemberExpression",
                        "object": {
                            "type": "Identifier",
                            "name": "arguments"
                        },
                        "property": {
                            "type": "Identifier",
                            "name": "i"
                        },
                        "computed": true,
                        "optional": false
                    }
                },
                "operator": "!=",
                "right": {
                    "type": "Literal",
                    "value": null,
                    "raw": "null"
                }
            },
            "consequent": {
                "type": "BlockStatement",
                "body": [{
                    "type": "ForInStatement",
                    "left": {
                        "type": "Identifier",
                        "name": "name"
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "options"
                    },
                    "body": {
                        "type": "BlockStatement",
                        "body": [{
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "AssignmentExpression",
                                "operator": "=",
                                "left": {
                                    "type": "Identifier",
                                    "name": "copy"
                                },
                                "right": {
                                    "type": "MemberExpression",
                                    "object": {
                                        "type": "Identifier",
                                        "name": "options"
                                    },
                                    "property": {
                                        "type": "Identifier",
                                        "name": "name"
                                    },
                                    "computed": true,
                                    "optional": false
                                }
                            }
                        }, {
                            "type": "IfStatement",
                            "test": {
                                "type": "BinaryExpression",
                                "left": {
                                    "type": "Identifier",
                                    "name": "target"
                                },
                                "operator": "===",
                                "right": {
                                    "type": "Identifier",
                                    "name": "copy"
                                }
                            },
                            "consequent": {
                                "type": "BlockStatement",
                                "body": [{
                                    "type": "ContinueStatement",
                                    "label": null
                                }]
                            },
                            "alternate": null
                        }, {
                            "type": "IfStatement",
                            "test": {
                                "type": "LogicalExpression",
                                "left": {
                                    "type": "LogicalExpression",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "deep"
                                    },
                                    "operator": "&&",
                                    "right": {
                                        "type": "Identifier",
                                        "name": "copy"
                                    }
                                },
                                "operator": "&&",
                                "right": {
                                    "type": "LogicalExpression",
                                    "left": {
                                        "type": "CallExpression",
                                        "callee": {
                                            "type": "MemberExpression",
                                            "object": {
                                                "type": "Identifier",
                                                "name": "jQuery"
                                            },
                                            "property": {
                                                "type": "Identifier",
                                                "name": "isPlainObject"
                                            },
                                            "computed": false,
                                            "optional": false
                                        },
                                        "arguments": [{
                                            "type": "Identifier",
                                            "name": "copy"
                                        }],
                                        "optional": false
                                    },
                                    "operator": "||",
                                    "right": {
                                        "type": "AssignmentExpression",
                                        "operator": "=",
                                        "left": {
                                            "type": "Identifier",
                                            "name": "copyIsArray"
                                        },
                                        "right": {
                                            "type": "CallExpression",
                                            "callee": {
                                                "type": "MemberExpression",
                                                "object": {
                                                    "type": "Identifier",
                                                    "name": "Array"
                                                },
                                                "property": {
                                                    "type": "Identifier",
                                                    "name": "isArray"
                                                },
                                                "computed": false,
                                                "optional": false
                                            },
                                            "arguments": [{
                                                "type": "Identifier",
                                                "name": "copy"
                                            }],
                                            "optional": false
                                        }
                                    }
                                }
                            },
                            "consequent": {
                                "type": "BlockStatement",
                                "body": [{
                                    "type": "ExpressionStatement",
                                    "expression": {
                                        "type": "AssignmentExpression",
                                        "operator": "=",
                                        "left": {
                                            "type": "Identifier",
                                            "name": "src"
                                        },
                                        "right": {
                                            "type": "MemberExpression",
                                            "object": {
                                                "type": "Identifier",
                                                "name": "target"
                                            },
                                            "property": {
                                                "type": "Identifier",
                                                "name": "name"
                                            },
                                            "computed": true,
                                            "optional": false
                                        }
                                    }
                                }, {
                                    "type": "IfStatement",
                                    "test": {
                                        "type": "LogicalExpression",
                                        "left": {
                                            "type": "Identifier",
                                            "name": "copyIsArray"
                                        },
                                        "operator": "&&",
                                        "right": {
                                            "type": "UnaryExpression",
                                            "operator": "!",
                                            "prefix": true,
                                            "argument": {
                                                "type": "CallExpression",
                                                "callee": {
                                                    "type": "MemberExpression",
                                                    "object": {
                                                        "type": "Identifier",
                                                        "name": "Array"
                                                    },
                                                    "property": {
                                                        "type": "Identifier",
                                                        "name": "isArray"
                                                    },
                                                    "computed": false,
                                                    "optional": false
                                                },
                                                "arguments": [{
                                                    "type": "Identifier",
                                                    "name": "src"
                                                }],
                                                "optional": false
                                            }
                                        }
                                    },
                                    "consequent": {
                                        "type": "BlockStatement",
                                        "body": [{
                                            "type": "ExpressionStatement",
                                            "expression": {
                                                "type": "AssignmentExpression",
                                                "operator": "=",
                                                "left": {
                                                    "type": "Identifier",
                                                    "name": "clone"
                                                },
                                                "right": {
                                                    "type": "ArrayExpression",
                                                    "elements": []
                                                }
                                            }
                                        }]
                                    },
                                    "alternate": {
                                        "type": "IfStatement",
                                        "test": {
                                            "type": "LogicalExpression",
                                            "left": {
                                                "type": "UnaryExpression",
                                                "operator": "!",
                                                "prefix": true,
                                                "argument": {
                                                    "type": "Identifier",
                                                    "name": "copyIsArray"
                                                }
                                            },
                                            "operator": "&&",
                                            "right": {
                                                "type": "UnaryExpression",
                                                "operator": "!",
                                                "prefix": true,
                                                "argument": {
                                                    "type": "CallExpression",
                                                    "callee": {
                                                        "type": "MemberExpression",
                                                        "object": {
                                                            "type": "Identifier",
                                                            "name": "jQuery"
                                                        },
                                                        "property": {
                                                            "type": "Identifier",
                                                            "name": "isPlainObject"
                                                        },
                                                        "computed": false,
                                                        "optional": false
                                                    },
                                                    "arguments": [{
                                                        "type": "Identifier",
                                                        "name": "src"
                                                    }],
                                                    "optional": false
                                                }
                                            }
                                        },
                                        "consequent": {
                                            "type": "BlockStatement",
                                            "body": [{
                                                "type": "ExpressionStatement",
                                                "expression": {
                                                    "type": "AssignmentExpression",
                                                    "operator": "=",
                                                    "left": {
                                                        "type": "Identifier",
                                                        "name": "clone"
                                                    },
                                                    "right": {
                                                        "type": "ObjectExpression",
                                                        "properties": []
                                                    }
                                                }
                                            }]
                                        },
                                        "alternate": {
                                            "type": "BlockStatement",
                                            "body": [{
                                                "type": "ExpressionStatement",
                                                "expression": {
                                                    "type": "AssignmentExpression",
                                                    "operator": "=",
                                                    "left": {
                                                        "type": "Identifier",
                                                        "name": "clone"
                                                    },
                                                    "right": {
                                                        "type": "Identifier",
                                                        "name": "src"
                                                    }
                                                }
                                            }]
                                        }
                                    }
                                }, {
                                    "type": "ExpressionStatement",
                                    "expression": {
                                        "type": "AssignmentExpression",
                                        "operator": "=",
                                        "left": {
                                            "type": "Identifier",
                                            "name": "copyIsArray"
                                        },
                                        "right": {
                                            "type": "Literal",
                                            "value": false,
                                            "raw": "false"
                                        }
                                    }
                                }, {
                                    "type": "ExpressionStatement",
                                    "expression": {
                                        "type": "AssignmentExpression",
                                        "operator": "=",
                                        "left": {
                                            "type": "MemberExpression",
                                            "object": {
                                                "type": "Identifier",
                                                "name": "target"
                                            },
                                            "property": {
                                                "type": "Identifier",
                                                "name": "name"
                                            },
                                            "computed": true,
                                            "optional": false
                                        },
                                        "right": {
                                            "type": "CallExpression",
                                            "callee": {
                                                "type": "MemberExpression",
                                                "object": {
                                                    "type": "Identifier",
                                                    "name": "jQuery"
                                                },
                                                "property": {
                                                    "type": "Identifier",
                                                    "name": "extend"
                                                },
                                                "computed": false,
                                                "optional": false
                                            },
                                            "arguments": [{
                                                "type": "Identifier",
                                                "name": "deep"
                                            }, {
                                                "type": "Identifier",
                                                "name": "clone"
                                            }, {
                                                "type": "Identifier",
                                                "name": "copy"
                                            }],
                                            "optional": false
                                        }
                                    }
                                }]
                            },
                            "alternate": {
                                "type": "IfStatement",
                                "test": {
                                    "type": "BinaryExpression",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "copy"
                                    },
                                    "operator": "!==",
                                    "right": {
                                        "type": "Identifier",
                                        "name": "undefined"
                                    }
                                },
                                "consequent": {
                                    "type": "BlockStatement",
                                    "body": [{
                                        "type": "ExpressionStatement",
                                        "expression": {
                                            "type": "AssignmentExpression",
                                            "operator": "=",
                                            "left": {
                                                "type": "MemberExpression",
                                                "object": {
                                                    "type": "Identifier",
                                                    "name": "target"
                                                },
                                                "property": {
                                                    "type": "Identifier",
                                                    "name": "name"
                                                },
                                                "computed": true,
                                                "optional": false
                                            },
                                            "right": {
                                                "type": "Identifier",
                                                "name": "copy"
                                            }
                                        }
                                    }]
                                },
                                "alternate": null
                            }
                        }]
                    }
                }]
            },
            "alternate": null
        }]
    }
};
patches["5"] =
{
    "id": "03e003bea5480d4d7b69b376727e51ad", "patch": {
        "type": "Program", "body": [{
            "type": "ExpressionStatement",
            "expression": { "type": "Literal", "value": {}, "raw": "/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/", "regex": { "pattern": "[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]", "flags": "" } }
        }]
    }
};
patches["6"] = { "id": "c01f42fee37ff03fb125a27e199c5830", "patch": { "type": "Program", "body": [{ "type": "ExpressionStatement", "expression": { "type": "Literal", "value": {}, "raw": "/[0-9]{0,256}['a-z\\u00A0-\\u05FF\\u0700-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]{1,256}|[\\u0600-\\u06FF\\/]{1,256}(\\s*?[\\u0600-\\u06FF]{1,256}){1,2}/i", "regex": { "pattern": "[0-9]{0,256}['a-z\\u00A0-\\u05FF\\u0700-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]{1,256}|[\\u0600-\\u06FF\\/]{1,256}(\\s*?[\\u0600-\\u06FF]{1,256}){1,2}", "flags": "i" } } }] } };



function processScript(input) {
    return finder.findMatches(input, vulnerabilities, patches);
}

module.exports = {
    processScript,
    vulnerabilities,
    patches
}