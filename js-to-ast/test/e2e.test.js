const sut = require("../src/finder");
const run = require("../src/run");

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

  const data = [
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

test("Unsafe defaults in `remark-html`", () => {
  const input = `export default function remarkHtml(options = {}) { \r\n  const handlers = options.handlers || {}\r\n  const schema =\r\n    options.sanitize && typeof options.sanitize === \'object\'\r\n      ? options.sanitize\r\n      : undefined\r\n\r\n  Object.assign(this, {Compiler: compiler})\r\n\r\n  \/**\r\n   * @type {import(\'unified\').CompilerFunction<Root, string>}\r\n   *\/\r\n  function compiler(node, file) {\r\n    const hast = toHast(node, {allowDangerousHtml: !options.sanitize, handlers})\r\n    \/\/ @ts-expect-error: assume root.\r\n    const cleanHast = options.sanitize ? sanitize(hast, schema) : hast\r\n    const result = toHtml(\r\n      \/\/ @ts-expect-error: assume root.\r\n      cleanHast,\r\n      Object.assign({}, options, {allowDangerousHtml: !options.sanitize})\r\n    )\r\n\r\n    if (file.extname) {      \r\n      file.extname = \'.html\'\r\n    }\r\n    \/\/ Add an eof eol.\r\n    return node &&\r\n      node.type &&\r\n      node.type === \'root\' &&\r\n      result &&\r\n      \/[^\\r\\n]\/.test(result.charAt(result.length - 1))\r\n      ? result + \'\\n\'\r\n      : result\r\n  }\r\n}
  `;

  expect(sut.findMatches(input, run.vulnerabilities)[1]).toBe(
    `export default function remarkHtml(settings) {
    const options = { ...settings || {} };
    let clean;
    if (typeof options.sanitize === 'boolean') {
        clean = options.sanitize;
        options.sanitize = undefined;
    }
    if (typeof clean !== 'boolean') {
        clean = true;
    }
    Object.assign(this, { Compiler: compiler });
    function compiler(node, file) {
        const hast = toHast(node, {
            allowDangerousHtml: !clean,
            handlers: options.handlers
        });
        const cleanHast = clean ? sanitize(hast, options.sanitize) : hast;
        const result = toHtml(cleanHast, Object.assign({}, options, { allowDangerousHtml: !clean }));
        if (file.extname) {
            file.extname = '.html';
        }
        return node && node.type && node.type === 'root' && result && /[^\\r\\n]/.test(result.charAt(result.length - 1)) ? result + '\\n' : result;
    }
}`);
});

