const sut = require("../src/finder");

test("", () => {
    const input = `
    const fs = require("fs");
    const parse = require("../src/parse");
    
    const input = \`console.log("Hello World!");\`;
    
    fs.readFile("patterns.json", "utf8", function (err, data) {
      if (err) {
        return console.log(err);
      }
    
      const inputAst = parse.parse(input);
      console.log("Hello World!");
    
      const parsedData = JSON.parse(data);
      parsedData.forEach((vulnerability) => {
        const vulnerabilityAst = parse.convertJsonToAst(vulnerability.ast);
    
        const matched = parse.contains(inputAst, vulnerabilityAst);
        console.log(matched);
      });
    });
    `;

    const data =  [
        {
          "title": "Debug Vulnerability",
          "description": "Initial debug vulnerability, caused by 'console.log('Hello World')'",
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
        }
      ];

    expect(sut.findMatches(input, data)[1]).toBe(
      `const fs = require('fs');
const parse = require('../src/parse');
const input = \`console.log("Hello World!");\`;
fs.readFile('patterns.json', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    const inputAst = parse.parse(input);
    console.log('Hello World Fixed!');
    const parsedData = JSON.parse(data);
    parsedData.forEach(vulnerability => {
        const vulnerabilityAst = parse.convertJsonToAst(vulnerability.ast);
        const matched = parse.contains(inputAst, vulnerabilityAst);
        console.log(matched);
    });
});`);
});