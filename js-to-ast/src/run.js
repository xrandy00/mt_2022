const finder = require("./finder");

// this needs to be from some external source probably
const vulnerabilities = [
  {
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
        "arguments": [
          {
            "type": "Literal",
            "value": "Hello World!",
            "raw": "\"Hello World!\""
          }
        ],
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
        "arguments": [
          {
            "type": "Literal",
            "value": "Hello World Fixed!",
            "raw": "\"Hello World Fixed!\""
          }
        ],
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
      "declarations": [
        {
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
            "arguments": [
              {
                "type": "Identifier",
                "name": "data"
              }
            ],
            "optional": false
          }
        }
      ],
      "kind": "const"
    },
    "patch": {
      "type": "VariableDeclaration",
      "declarations": [
        {
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
            "arguments": [
              {
                "type": "Identifier",
                "name": "data"
              }
            ],
            "optional": false
          }
        }
      ],
      "kind": "const"
    }
  },
  {
    "title": "Unsafe defaults in `remark-html`",
    "description": "The documentation of remark-html has mentioned that it was safe by default. In practise the default was never safe and had to be opted into. This means arbitrary HTML can be passed through leading to potential XSS attacks.",
    "reference_url": "https://github.com/advisories/GHSA-9q5w-79cv-947m",
    "severity": 1,
    "ast": {
      "type": "ExportDefaultDeclaration",
      "declaration": {
        "type": "FunctionDeclaration",
        "id": {
          "type": "Identifier",
          "name": "remarkHtml"
        },
        "expression": false,
        "generator": false,
        "async": false,
        "params": [
          {
            "type": "AssignmentPattern",
            "left": {
              "type": "Identifier",
              "name": "options"
            },
            "right": {
              "type": "ObjectExpression",
              "properties": []
            }
          }
        ],
        "body": {
          "type": "BlockStatement",
          "body": [
            {
              "type": "VariableDeclaration",
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "id": {
                    "type": "Identifier",
                    "name": "handlers"
                  },
                  "init": {
                    "type": "LogicalExpression",
                    "left": {
                      "type": "MemberExpression",
                      "object": {
                        "type": "Identifier",
                        "name": "options"
                      },
                      "property": {
                        "type": "Identifier",
                        "name": "handlers"
                      },
                      "computed": false,
                      "optional": false
                    },
                    "operator": "||",
                    "right": {
                      "type": "ObjectExpression",
                      "properties": []
                    }
                  }
                }
              ],
              "kind": "const"
            },
            {
              "type": "VariableDeclaration",
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "id": {
                    "type": "Identifier",
                    "name": "schema"
                  },
                  "init": {
                    "type": "ConditionalExpression",
                    "test": {
                      "type": "LogicalExpression",
                      "left": {
                        "type": "MemberExpression",
                        "object": {
                          "type": "Identifier",
                          "name": "options"
                        },
                        "property": {
                          "type": "Identifier",
                          "name": "sanitize"
                        },
                        "computed": false,
                        "optional": false
                      },
                      "operator": "&&",
                      "right": {
                        "type": "BinaryExpression",
                        "left": {
                          "type": "UnaryExpression",
                          "operator": "typeof",
                          "prefix": true,
                          "argument": {
                            "type": "MemberExpression",
                            "object": {
                              "type": "Identifier",
                              "name": "options"
                            },
                            "property": {
                              "type": "Identifier",
                              "name": "sanitize"
                            },
                            "computed": false,
                            "optional": false
                          }
                        },
                        "operator": "===",
                        "right": {
                          "type": "Literal",
                          "value": "object",
                          "raw": "'object'"
                        }
                      }
                    },
                    "consequent": {
                      "type": "MemberExpression",
                      "object": {
                        "type": "Identifier",
                        "name": "options"
                      },
                      "property": {
                        "type": "Identifier",
                        "name": "sanitize"
                      },
                      "computed": false,
                      "optional": false
                    },
                    "alternate": {
                      "type": "Identifier",
                      "name": "undefined"
                    }
                  }
                }
              ],
              "kind": "const"
            },
            {
              "type": "ExpressionStatement",
              "expression": {
                "type": "CallExpression",
                "callee": {
                  "type": "MemberExpression",
                  "object": {
                    "type": "Identifier",
                    "name": "Object"
                  },
                  "property": {
                    "type": "Identifier",
                    "name": "assign"
                  },
                  "computed": false,
                  "optional": false
                },
                "arguments": [
                  {
                    "type": "ThisExpression"
                  },
                  {
                    "type": "ObjectExpression",
                    "properties": [
                      {
                        "type": "Property",
                        "method": false,
                        "shorthand": false,
                        "computed": false,
                        "key": {
                          "type": "Identifier",
                          "name": "Compiler"
                        },
                        "value": {
                          "type": "Identifier",
                          "name": "compiler"
                        },
                        "kind": "init"
                      }
                    ]
                  }
                ],
                "optional": false
              }
            },
            {
              "type": "FunctionDeclaration",
              "id": {
                "type": "Identifier",
                "name": "compiler"
              },
              "expression": false,
              "generator": false,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "name": "node"
                },
                {
                  "type": "Identifier",
                  "name": "file"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "body": [
                  {
                    "type": "VariableDeclaration",
                    "declarations": [
                      {
                        "type": "VariableDeclarator",
                        "id": {
                          "type": "Identifier",
                          "name": "hast"
                        },
                        "init": {
                          "type": "CallExpression",
                          "callee": {
                            "type": "Identifier",
                            "name": "toHast"
                          },
                          "arguments": [
                            {
                              "type": "Identifier",
                              "name": "node"
                            },
                            {
                              "type": "ObjectExpression",
                              "properties": [
                                {
                                  "type": "Property",
                                  "method": false,
                                  "shorthand": false,
                                  "computed": false,
                                  "key": {
                                    "type": "Identifier",
                                    "name": "allowDangerousHtml"
                                  },
                                  "value": {
                                    "type": "UnaryExpression",
                                    "operator": "!",
                                    "prefix": true,
                                    "argument": {
                                      "type": "MemberExpression",
                                      "object": {
                                        "type": "Identifier",
                                        "name": "options"
                                      },
                                      "property": {
                                        "type": "Identifier",
                                        "name": "sanitize"
                                      },
                                      "computed": false,
                                      "optional": false
                                    }
                                  },
                                  "kind": "init"
                                },
                                {
                                  "type": "Property",
                                  "method": false,
                                  "shorthand": true,
                                  "computed": false,
                                  "key": {
                                    "type": "Identifier",
                                    "name": "handlers"
                                  },
                                  "kind": "init",
                                  "value": {
                                    "type": "Identifier",
                                    "name": "handlers"
                                  }
                                }
                              ]
                            }
                          ],
                          "optional": false
                        }
                      }
                    ],
                    "kind": "const"
                  },
                  {
                    "type": "VariableDeclaration",
                    "declarations": [
                      {
                        "type": "VariableDeclarator",
                        "id": {
                          "type": "Identifier",
                          "name": "cleanHast"
                        },
                        "init": {
                          "type": "ConditionalExpression",
                          "test": {
                            "type": "MemberExpression",
                            "object": {
                              "type": "Identifier",
                              "name": "options"
                            },
                            "property": {
                              "type": "Identifier",
                              "name": "sanitize"
                            },
                            "computed": false,
                            "optional": false
                          },
                          "consequent": {
                            "type": "CallExpression",
                            "callee": {
                              "type": "Identifier",
                              "name": "sanitize"
                            },
                            "arguments": [
                              {
                                "type": "Identifier",
                                "name": "hast"
                              },
                              {
                                "type": "Identifier",
                                "name": "schema"
                              }
                            ],
                            "optional": false
                          },
                          "alternate": {
                            "type": "Identifier",
                            "name": "hast"
                          }
                        }
                      }
                    ],
                    "kind": "const"
                  },
                  {
                    "type": "VariableDeclaration",
                    "declarations": [
                      {
                        "type": "VariableDeclarator",
                        "id": {
                          "type": "Identifier",
                          "name": "result"
                        },
                        "init": {
                          "type": "CallExpression",
                          "callee": {
                            "type": "Identifier",
                            "name": "toHtml"
                          },
                          "arguments": [
                            {
                              "type": "Identifier",
                              "name": "cleanHast"
                            },
                            {
                              "type": "CallExpression",
                              "callee": {
                                "type": "MemberExpression",
                                "object": {
                                  "type": "Identifier",
                                  "name": "Object"
                                },
                                "property": {
                                  "type": "Identifier",
                                  "name": "assign"
                                },
                                "computed": false,
                                "optional": false
                              },
                              "arguments": [
                                {
                                  "type": "ObjectExpression",
                                  "properties": []
                                },
                                {
                                  "type": "Identifier",
                                  "name": "options"
                                },
                                {
                                  "type": "ObjectExpression",
                                  "properties": [
                                    {
                                      "type": "Property",
                                      "method": false,
                                      "shorthand": false,
                                      "computed": false,
                                      "key": {
                                        "type": "Identifier",
                                        "name": "allowDangerousHtml"
                                      },
                                      "value": {
                                        "type": "UnaryExpression",
                                        "operator": "!",
                                        "prefix": true,
                                        "argument": {
                                          "type": "MemberExpression",
                                          "object": {
                                            "type": "Identifier",
                                            "name": "options"
                                          },
                                          "property": {
                                            "type": "Identifier",
                                            "name": "sanitize"
                                          },
                                          "computed": false,
                                          "optional": false
                                        }
                                      },
                                      "kind": "init"
                                    }
                                  ]
                                }
                              ],
                              "optional": false
                            }
                          ],
                          "optional": false
                        }
                      }
                    ],
                    "kind": "const"
                  },
                  {
                    "type": "IfStatement",
                    "test": {
                      "type": "MemberExpression",
                      "object": {
                        "type": "Identifier",
                        "name": "file"
                      },
                      "property": {
                        "type": "Identifier",
                        "name": "extname"
                      },
                      "computed": false,
                      "optional": false
                    },
                    "consequent": {
                      "type": "BlockStatement",
                      "body": [
                        {
                          "type": "ExpressionStatement",
                          "expression": {
                            "type": "AssignmentExpression",
                            "operator": "=",
                            "left": {
                              "type": "MemberExpression",
                              "object": {
                                "type": "Identifier",
                                "name": "file"
                              },
                              "property": {
                                "type": "Identifier",
                                "name": "extname"
                              },
                              "computed": false,
                              "optional": false
                            },
                            "right": {
                              "type": "Literal",
                              "value": ".html",
                              "raw": "'.html'"
                            }
                          }
                        }
                      ]
                    },
                    "alternate": null
                  },
                  {
                    "type": "ReturnStatement",
                    "argument": {
                      "type": "ConditionalExpression",
                      "test": {
                        "type": "LogicalExpression",
                        "left": {
                          "type": "LogicalExpression",
                          "left": {
                            "type": "LogicalExpression",
                            "left": {
                              "type": "LogicalExpression",
                              "left": {
                                "type": "Identifier",
                                "name": "node"
                              },
                              "operator": "&&",
                              "right": {
                                "type": "MemberExpression",
                                "object": {
                                  "type": "Identifier",
                                  "name": "node"
                                },
                                "property": {
                                  "type": "Identifier",
                                  "name": "type"
                                },
                                "computed": false,
                                "optional": false
                              }
                            },
                            "operator": "&&",
                            "right": {
                              "type": "BinaryExpression",
                              "left": {
                                "type": "MemberExpression",
                                "object": {
                                  "type": "Identifier",
                                  "name": "node"
                                },
                                "property": {
                                  "type": "Identifier",
                                  "name": "type"
                                },
                                "computed": false,
                                "optional": false
                              },
                              "operator": "===",
                              "right": {
                                "type": "Literal",
                                "value": "root",
                                "raw": "'root'"
                              }
                            }
                          },
                          "operator": "&&",
                          "right": {
                            "type": "Identifier",
                            "name": "result"
                          }
                        },
                        "operator": "&&",
                        "right": {
                          "type": "CallExpression",
                          "callee": {
                            "type": "MemberExpression",
                            "object": {
                              "type": "Literal",
                              "value": {},
                              "raw": "/[^\\r\\n]/",
                              "regex": {
                                "pattern": "[^\\r\\n]",
                                "flags": ""
                              }
                            },
                            "property": {
                              "type": "Identifier",
                              "name": "test"
                            },
                            "computed": false,
                            "optional": false
                          },
                          "arguments": [
                            {
                              "type": "CallExpression",
                              "callee": {
                                "type": "MemberExpression",
                                "object": {
                                  "type": "Identifier",
                                  "name": "result"
                                },
                                "property": {
                                  "type": "Identifier",
                                  "name": "charAt"
                                },
                                "computed": false,
                                "optional": false
                              },
                              "arguments": [
                                {
                                  "type": "BinaryExpression",
                                  "left": {
                                    "type": "MemberExpression",
                                    "object": {
                                      "type": "Identifier",
                                      "name": "result"
                                    },
                                    "property": {
                                      "type": "Identifier",
                                      "name": "length"
                                    },
                                    "computed": false,
                                    "optional": false
                                  },
                                  "operator": "-",
                                  "right": {
                                    "type": "Literal",
                                    "value": 1,
                                    "raw": "1"
                                  }
                                }
                              ],
                              "optional": false
                            }
                          ],
                          "optional": false
                        }
                      },
                      "consequent": {
                        "type": "BinaryExpression",
                        "left": {
                          "type": "Identifier",
                          "name": "result"
                        },
                        "operator": "+",
                        "right": {
                          "type": "Literal",
                          "value": "\n",
                          "raw": "'\\n'"
                        }
                      },
                      "alternate": {
                        "type": "Identifier",
                        "name": "result"
                      }
                    }
                  }
                ]
              }
            }
          ]
        }
      }
    },
    "patch": {
      "type": "ExportDefaultDeclaration",
      "declaration": {
        "type": "FunctionDeclaration",
        "id": {
          "type": "Identifier",
          "name": "remarkHtml"
        },
        "expression": false,
        "generator": false,
        "async": false,
        "params": [
          {
            "type": "Identifier",
            "name": "settings"
          }
        ],
        "body": {
          "type": "BlockStatement",
          "body": [
            {
              "type": "VariableDeclaration",
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "id": {
                    "type": "Identifier",
                    "name": "options"
                  },
                  "init": {
                    "type": "ObjectExpression",
                    "properties": [
                      {
                        "type": "SpreadElement",
                        "argument": {
                          "type": "LogicalExpression",
                          "left": {
                            "type": "Identifier",
                            "name": "settings"
                          },
                          "operator": "||",
                          "right": {
                            "type": "ObjectExpression",
                            "properties": []
                          }
                        }
                      }
                    ]
                  }
                }
              ],
              "kind": "const"
            },
            {
              "type": "VariableDeclaration",
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "id": {
                    "type": "Identifier",
                    "name": "clean"
                  },
                  "init": null
                }
              ],
              "kind": "let"
            },
            {
              "type": "IfStatement",
              "test": {
                "type": "BinaryExpression",
                "left": {
                  "type": "UnaryExpression",
                  "operator": "typeof",
                  "prefix": true,
                  "argument": {
                    "type": "MemberExpression",
                    "object": {
                      "type": "Identifier",
                      "name": "options"
                    },
                    "property": {
                      "type": "Identifier",
                      "name": "sanitize"
                    },
                    "computed": false,
                    "optional": false
                  }
                },
                "operator": "===",
                "right": {
                  "type": "Literal",
                  "value": "boolean",
                  "raw": "'boolean'"
                }
              },
              "consequent": {
                "type": "BlockStatement",
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "expression": {
                      "type": "AssignmentExpression",
                      "operator": "=",
                      "left": {
                        "type": "Identifier",
                        "name": "clean"
                      },
                      "right": {
                        "type": "MemberExpression",
                        "object": {
                          "type": "Identifier",
                          "name": "options"
                        },
                        "property": {
                          "type": "Identifier",
                          "name": "sanitize"
                        },
                        "computed": false,
                        "optional": false
                      }
                    }
                  },
                  {
                    "type": "ExpressionStatement",
                    "expression": {
                      "type": "AssignmentExpression",
                      "operator": "=",
                      "left": {
                        "type": "MemberExpression",
                        "object": {
                          "type": "Identifier",
                          "name": "options"
                        },
                        "property": {
                          "type": "Identifier",
                          "name": "sanitize"
                        },
                        "computed": false,
                        "optional": false
                      },
                      "right": {
                        "type": "Identifier",
                        "name": "undefined"
                      }
                    }
                  }
                ]
              },
              "alternate": null
            },
            {
              "type": "IfStatement",
              "test": {
                "type": "BinaryExpression",
                "left": {
                  "type": "UnaryExpression",
                  "operator": "typeof",
                  "prefix": true,
                  "argument": {
                    "type": "Identifier",
                    "name": "clean"
                  }
                },
                "operator": "!==",
                "right": {
                  "type": "Literal",
                  "value": "boolean",
                  "raw": "'boolean'"
                }
              },
              "consequent": {
                "type": "BlockStatement",
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "expression": {
                      "type": "AssignmentExpression",
                      "operator": "=",
                      "left": {
                        "type": "Identifier",
                        "name": "clean"
                      },
                      "right": {
                        "type": "Literal",
                        "value": true,
                        "raw": "true"
                      }
                    }
                  }
                ]
              },
              "alternate": null
            },
            {
              "type": "ExpressionStatement",
              "expression": {
                "type": "CallExpression",
                "callee": {
                  "type": "MemberExpression",
                  "object": {
                    "type": "Identifier",
                    "name": "Object"
                  },
                  "property": {
                    "type": "Identifier",
                    "name": "assign"
                  },
                  "computed": false,
                  "optional": false
                },
                "arguments": [
                  {
                    "type": "ThisExpression"
                  },
                  {
                    "type": "ObjectExpression",
                    "properties": [
                      {
                        "type": "Property",
                        "method": false,
                        "shorthand": false,
                        "computed": false,
                        "key": {
                          "type": "Identifier",
                          "name": "Compiler"
                        },
                        "value": {
                          "type": "Identifier",
                          "name": "compiler"
                        },
                        "kind": "init"
                      }
                    ]
                  }
                ],
                "optional": false
              }
            },
            {
              "type": "FunctionDeclaration",
              "id": {
                "type": "Identifier",
                "name": "compiler"
              },
              "expression": false,
              "generator": false,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "name": "node"
                },
                {
                  "type": "Identifier",
                  "name": "file"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "body": [
                  {
                    "type": "VariableDeclaration",
                    "declarations": [
                      {
                        "type": "VariableDeclarator",
                        "id": {
                          "type": "Identifier",
                          "name": "hast"
                        },
                        "init": {
                          "type": "CallExpression",
                          "callee": {
                            "type": "Identifier",
                            "name": "toHast"
                          },
                          "arguments": [
                            {
                              "type": "Identifier",
                              "name": "node"
                            },
                            {
                              "type": "ObjectExpression",
                              "properties": [
                                {
                                  "type": "Property",
                                  "method": false,
                                  "shorthand": false,
                                  "computed": false,
                                  "key": {
                                    "type": "Identifier",
                                    "name": "allowDangerousHtml"
                                  },
                                  "value": {
                                    "type": "UnaryExpression",
                                    "operator": "!",
                                    "prefix": true,
                                    "argument": {
                                      "type": "Identifier",
                                      "name": "clean"
                                    }
                                  },
                                  "kind": "init"
                                },
                                {
                                  "type": "Property",
                                  "method": false,
                                  "shorthand": false,
                                  "computed": false,
                                  "key": {
                                    "type": "Identifier",
                                    "name": "handlers"
                                  },
                                  "value": {
                                    "type": "MemberExpression",
                                    "object": {
                                      "type": "Identifier",
                                      "name": "options"
                                    },
                                    "property": {
                                      "type": "Identifier",
                                      "name": "handlers"
                                    },
                                    "computed": false,
                                    "optional": false
                                  },
                                  "kind": "init"
                                }
                              ]
                            }
                          ],
                          "optional": false
                        }
                      }
                    ],
                    "kind": "const"
                  },
                  {
                    "type": "VariableDeclaration",
                    "declarations": [
                      {
                        "type": "VariableDeclarator",
                        "id": {
                          "type": "Identifier",
                          "name": "cleanHast"
                        },
                        "init": {
                          "type": "ConditionalExpression",
                          "test": {
                            "type": "Identifier",
                            "name": "clean"
                          },
                          "consequent": {
                            "type": "CallExpression",
                            "callee": {
                              "type": "Identifier",
                              "name": "sanitize"
                            },
                            "arguments": [
                              {
                                "type": "Identifier",
                                "name": "hast"
                              },
                              {
                                "type": "MemberExpression",
                                "object": {
                                  "type": "Identifier",
                                  "name": "options"
                                },
                                "property": {
                                  "type": "Identifier",
                                  "name": "sanitize"
                                },
                                "computed": false,
                                "optional": false
                              }
                            ],
                            "optional": false
                          },
                          "alternate": {
                            "type": "Identifier",
                            "name": "hast"
                          }
                        }
                      }
                    ],
                    "kind": "const"
                  },
                  {
                    "type": "VariableDeclaration",
                    "declarations": [
                      {
                        "type": "VariableDeclarator",
                        "id": {
                          "type": "Identifier",
                          "name": "result"
                        },
                        "init": {
                          "type": "CallExpression",
                          "callee": {
                            "type": "Identifier",
                            "name": "toHtml"
                          },
                          "arguments": [
                            {
                              "type": "Identifier",
                              "name": "cleanHast"
                            },
                            {
                              "type": "CallExpression",
                              "callee": {
                                "type": "MemberExpression",
                                "object": {
                                  "type": "Identifier",
                                  "name": "Object"
                                },
                                "property": {
                                  "type": "Identifier",
                                  "name": "assign"
                                },
                                "computed": false,
                                "optional": false
                              },
                              "arguments": [
                                {
                                  "type": "ObjectExpression",
                                  "properties": []
                                },
                                {
                                  "type": "Identifier",
                                  "name": "options"
                                },
                                {
                                  "type": "ObjectExpression",
                                  "properties": [
                                    {
                                      "type": "Property",
                                      "method": false,
                                      "shorthand": false,
                                      "computed": false,
                                      "key": {
                                        "type": "Identifier",
                                        "name": "allowDangerousHtml"
                                      },
                                      "value": {
                                        "type": "UnaryExpression",
                                        "operator": "!",
                                        "prefix": true,
                                        "argument": {
                                          "type": "Identifier",
                                          "name": "clean"
                                        }
                                      },
                                      "kind": "init"
                                    }
                                  ]
                                }
                              ],
                              "optional": false
                            }
                          ],
                          "optional": false
                        }
                      }
                    ],
                    "kind": "const"
                  },
                  {
                    "type": "IfStatement",
                    "test": {
                      "type": "MemberExpression",
                      "object": {
                        "type": "Identifier",
                        "name": "file"
                      },
                      "property": {
                        "type": "Identifier",
                        "name": "extname"
                      },
                      "computed": false,
                      "optional": false
                    },
                    "consequent": {
                      "type": "BlockStatement",
                      "body": [
                        {
                          "type": "ExpressionStatement",
                          "expression": {
                            "type": "AssignmentExpression",
                            "operator": "=",
                            "left": {
                              "type": "MemberExpression",
                              "object": {
                                "type": "Identifier",
                                "name": "file"
                              },
                              "property": {
                                "type": "Identifier",
                                "name": "extname"
                              },
                              "computed": false,
                              "optional": false
                            },
                            "right": {
                              "type": "Literal",
                              "value": ".html",
                              "raw": "'.html'"
                            }
                          }
                        }
                      ]
                    },
                    "alternate": null
                  },
                  {
                    "type": "ReturnStatement",
                    "argument": {
                      "type": "ConditionalExpression",
                      "test": {
                        "type": "LogicalExpression",
                        "left": {
                          "type": "LogicalExpression",
                          "left": {
                            "type": "LogicalExpression",
                            "left": {
                              "type": "LogicalExpression",
                              "left": {
                                "type": "Identifier",
                                "name": "node"
                              },
                              "operator": "&&",
                              "right": {
                                "type": "MemberExpression",
                                "object": {
                                  "type": "Identifier",
                                  "name": "node"
                                },
                                "property": {
                                  "type": "Identifier",
                                  "name": "type"
                                },
                                "computed": false,
                                "optional": false
                              }
                            },
                            "operator": "&&",
                            "right": {
                              "type": "BinaryExpression",
                              "left": {
                                "type": "MemberExpression",
                                "object": {
                                  "type": "Identifier",
                                  "name": "node"
                                },
                                "property": {
                                  "type": "Identifier",
                                  "name": "type"
                                },
                                "computed": false,
                                "optional": false
                              },
                              "operator": "===",
                              "right": {
                                "type": "Literal",
                                "value": "root",
                                "raw": "'root'"
                              }
                            }
                          },
                          "operator": "&&",
                          "right": {
                            "type": "Identifier",
                            "name": "result"
                          }
                        },
                        "operator": "&&",
                        "right": {
                          "type": "CallExpression",
                          "callee": {
                            "type": "MemberExpression",
                            "object": {
                              "type": "Literal",
                              "value": {},
                              "raw": "/[^\\r\\n]/",
                              "regex": {
                                "pattern": "[^\\r\\n]",
                                "flags": ""
                              }
                            },
                            "property": {
                              "type": "Identifier",
                              "name": "test"
                            },
                            "computed": false,
                            "optional": false
                          },
                          "arguments": [
                            {
                              "type": "CallExpression",
                              "callee": {
                                "type": "MemberExpression",
                                "object": {
                                  "type": "Identifier",
                                  "name": "result"
                                },
                                "property": {
                                  "type": "Identifier",
                                  "name": "charAt"
                                },
                                "computed": false,
                                "optional": false
                              },
                              "arguments": [
                                {
                                  "type": "BinaryExpression",
                                  "left": {
                                    "type": "MemberExpression",
                                    "object": {
                                      "type": "Identifier",
                                      "name": "result"
                                    },
                                    "property": {
                                      "type": "Identifier",
                                      "name": "length"
                                    },
                                    "computed": false,
                                    "optional": false
                                  },
                                  "operator": "-",
                                  "right": {
                                    "type": "Literal",
                                    "value": 1,
                                    "raw": "1"
                                  }
                                }
                              ],
                              "optional": false
                            }
                          ],
                          "optional": false
                        }
                      },
                      "consequent": {
                        "type": "BinaryExpression",
                        "left": {
                          "type": "Identifier",
                          "name": "result"
                        },
                        "operator": "+",
                        "right": {
                          "type": "Literal",
                          "value": "\n",
                          "raw": "'\\n'"
                        }
                      },
                      "alternate": {
                        "type": "Identifier",
                        "name": "result"
                      }
                    }
                  }
                ]
              }
            }
          ]
        }
      }
    },
  }
];


function processScript(input) {
  return finder.findMatches(input, vulnerabilities);
}

module.exports = {
  processScript,
  vulnerabilities
}