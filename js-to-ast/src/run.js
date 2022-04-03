const finder = require("./finder");

const generated_vulnerabilities = require('./generated_vulnerabilities.json')
const generated_patches = require('./generated_patches.json')

const manual_vulnerabilities = [{
    "title": "Debug Vulnerability",
    "description": "Initial debug vulnerability, caused by 'console.log(\"Hello World!\")'",
    "reference_url": "https://google.com",
    "severity": 0,
    "ast": "47e22f30b29c0de02bc6ff808e6105ff",
    "patch": 1,
},
{
    "title": "Debug Vulnerability 2",
    "description": "Initial debug vulnerability, caused by 'const parsedData = JSON.parse(data)'",
    "reference_url": "https://google.com",
    "severity": 1,
    "ast":"a176d38848d2fbeff55dee4731910452",
    "patch": 2,
},
{
    "title": "Cross-Site Scripting in jquery < 1.9.0",
    "description": "Regex leading to XSS is replaced for not vulnerable regex",
    "reference_url": "https://github.com/advisories/GHSA-2pqj-h3vj-pqgw",
    "severity": 3,
    "ast": "51abcac6495b7eafde220e9b91f2b77b",
    "patch": 3,
},
{
    "title": "Potential XSS vulnerability in jQuery < 3.5.0",
    "description": "Not fixable",
    "reference_url": "https://github.com/advisories/GHSA-gxr4-xjj5-5px2",
    "severity": 2,
    "ast": "cda0e636ff562bb13802bf3ba48a0a6f",
    "patch": 4,
},
{
    "title": "XSS in jQuery <3.4.0 as used in Drupal, Backdrop CMS, and other products",
    "description": "jQuery before 3.4.0, as used in Drupal, Backdrop CMS, and other products, mishandles jQuery.extend(true, {}, ...) because of Object.prototype pollution",
    "reference_url": "https://github.com/advisories/GHSA-6c3j-c64m-qhgq",
    "severity": 2,
    "ast": "0e82cfbdb8680509b68e412976a739de",
    "patch": 5,
}
];

const manual_patches = [
    {
        "id": 1,
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
        "id": 2,
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
        },
    },
    {
        "id": 3,
        "patch": {
            "type": "Literal",
            "value": {},
            "raw": "/^(?:(<[\\w\\W]+>)[^>]*|#([\\w-]*))$/",
            "regex": {
                "pattern": "^(?:(<[\\w\\W]+>)[^>]*|#([\\w-]*))$",
                "flags": ""
            }
        }
    },
    {
        "id": 4,
        "patch": {
            "type": "Literal",
            "value": {},
            "raw": "/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\\/\\0>\\x20\\t\\r\\n\\f]*)[^>]*)\\/>/gi",
            "regex": {
                "pattern": "<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\\/\\0>\\x20\\t\\r\\n\\f]*)[^>]*)\\/>",
                "flags": "gi"
            }
        }
    }, {
        "id": 5,
        "patch": {
            "type": "Program",
            "body": [{
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
            }]
        }
    }
];

const vulnerabilities = manual_vulnerabilities.concat(generated_vulnerabilities);
const patches = manual_patches.concat(generated_patches);


function processScript(input) {
    return finder.findMatches(input, vulnerabilities, patches);
}

module.exports = {
    processScript,
    vulnerabilities,
    patches
}