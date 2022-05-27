/**
 * Main responsibilities are merging generated vulnerabilities with manually created ones
 * and calling finder functions.
 *
 * @summary Entry point of the library 
 * @author Vojtěch Randýsek, xrandy00@vutbr.cz
 *
 * Created at     : 2022-05-07 10:39:20 
 * Last modified  : 2022-05-08 21:42:46
 */

const finder = require("./finder");
const vulnerabilities = require('./generated_vulnerabilities.json');
const meta = require('./generated_vulnerabilities_meta.json');
const patches = require('./generated_patches.json');

if (!vulnerabilities["Literal"]) { vulnerabilities["Literal"] = {} };
vulnerabilities["Literal"]["db7383b991dfba6eacc2fef99ddcf52e7c4834bd"] = {
    "id": "1",
    "patch": "4f8df2f6113fc55ac56e9db43f0ee240",
};
vulnerabilities["Literal"]["b2d9ed949a390ecfe2150e5232ed09d12bff399d"] = {
    "id": "1",
    "patch": "4f8df2f6113fc55ac56e9db43f0ee240",
};
vulnerabilities["Literal"]["7ae1c57c069a8cefcc1129dec38ba0737bb08633"] = {
    "id": "1",
    "patch": "4f8df2f6113fc55ac56e9db43f0ee240",
};

meta["1"] = {
    "id": "1",
    "title": "Cross-Site Scripting in jquery < 1.9.0",
    "description": "Regex leading to XSS is replaced for not vulnerable regex https://github.com/jquery/jquery/commit/05531fc4080ae24070930d15ae0cea7ae056457d",
    "reference_url": "https://github.com/advisories/GHSA-2pqj-h3vj-pqgw",
    "severity": 2,
};

vulnerabilities["Literal"]["4f01a926f122ce680ae19ac416ceb8d64f773cce"] = {
    "id": "2",
    "patch": null,
};

meta["2"] = {
    "id": "2",
    "title": "Potential XSS vulnerability in jQuery < 3.5.0",
    "description": "Not fixable",
    "reference_url": "https://github.com/advisories/GHSA-gxr4-xjj5-5px2",
    "severity": 2,
};

vulnerabilities["Literal"]["e8e907ce5d18209c9c4a1f032503b7f2b6269bdc"] = {
    "id": "3",
    "patch": "5c8cef7506ef500b0a0ad03e752d5901b91777f2",
};

meta["3"] = {
    "id": "3",
    "title": "Regular Expression Denial of Service (ReDoS) in lodash",
    "description": "lodash prior to 4.7.11 is affected by: CWE-400: Uncontrolled Resource Consumption. The impact is: Denial of service. The component is: Date handler. The attack vector is: Attacker provides very long strings, which the library attempts to match using a regular expression. The fixed version is: 4.7.11.",
    "reference_url": "https://github.com/advisories/GHSA-x5rq-j2xg-h7qm",
    "severity": 3,
};

vulnerabilities["Literal"]["8ab27866a78cb90b217c8fbf55f45937cb605f65"] = {
    "id": "4",
    "patch": "882742bd8a389619b1df44176377133edad5e327",
};

meta["4"] = {
    "id": "4",
    "title": "Regular Expression Denial of Service in moment",
    "description": "Affected versions of moment are vulnerable to a low severity regular expression denial of service when parsing dates as strings.",
    "reference_url": "https://github.com/advisories/GHSA-446m-mv8f-q348",
    "severity": 2,
};

if (!vulnerabilities["ForStatement"]) { vulnerabilities["ForStatement"] = {} };
vulnerabilities["ForStatement"]["3f0157fc66c024972ab5dd1443838f9eaf0e67a0"] = {
    "id": "5",
    "patch": "4cb7c87adf6cb47d361956495b491353bbc89580",
};

meta["5"] = {
    "id": "5",
    "title": "XSS in jQuery <3.4.0 as used in Drupal, Backdrop CMS, and other products",
    "description": "jQuery before 3.4.0, as used in Drupal, Backdrop CMS, and other products, mishandles jQuery.extend(true, {}, ...) because of Object.prototype pollution",
    "reference_url": "https://github.com/advisories/GHSA-6c3j-c64m-qhgq",
    "severity": 2,
};

patches["4f8df2f6113fc55ac56e9db43f0ee240"] = {
    "type": "Literal",
    "value": {},
    "raw": "/^(?:(<[\\w\\W]+>)[^>]*|#([\\w-]*))$/",
    "regex": {
        "pattern": "^(?:(<[\\w\\W]+>)[^>]*|#([\\w-]*))$",
        "flags": ""
    }
};
patches["4cb7c87adf6cb47d361956495b491353bbc895804"] = {
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
patches["5c8cef7506ef500b0a0ad03e752d5901b91777f2"] =
{
    "type": "Literal", "value": {}, "raw": "/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/", "regex": { "pattern": "[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]", "flags": "" }
};
patches["882742bd8a389619b1df44176377133edad5e327"] = { "type": "Literal", "value": {}, "raw": "/[0-9]{0,256}['a-z\\u00A0-\\u05FF\\u0700-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]{1,256}|[\\u0600-\\u06FF\\/]{1,256}(\\s*?[\\u0600-\\u06FF]{1,256}){1,2}/i", "regex": { "pattern": "[0-9]{0,256}['a-z\\u00A0-\\u05FF\\u0700-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]{1,256}|[\\u0600-\\u06FF\\/]{1,256}(\\s*?[\\u0600-\\u06FF]{1,256}){1,2}", "flags": "i" } };

function processScript(input) {
    try {
        return finder.findMatches(input, vulnerabilities, patches, meta);
    } catch {
        return null;
    }
}

module.exports = {
    processScript,
    vulnerabilities,
    patches,
    meta
}