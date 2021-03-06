/**
 *
 * @summary Unit test file for e2e detection
 * @author Vojtěch Randýsek, xrandy00@vutbr.cz
 *
 * Created at     : 2022-05-06 21:36:42 
 * Last modified  : 2022-05-06 21:37:12
 */



const sut = require("../src/finder");
const run = require("../src/run");


test("Unsafe defaults in `remark-html`", () => {
  const input = `
    \/**\r\n * @typedef {import(\'mdast\').Root} Root\r\n * @typedef {import(\'hast-util-sanitize\').Schema} Schema\r\n * @typedef {import(\'mdast-util-to-hast\').Handlers} Handlers\r\n *\r\n * @typedef Options\r\n *   Configuration.\r\n * @property {boolean|Schema|null} [sanitize]\r\n *   How to sanitize the output.\r\n * @property {Handlers} [handlers={}]\r\n *   Object mapping mdast nodes to functions handling them.\r\n *\/\r\nimport {toHtml} from \'hast-util-to-html\'\r\nimport {sanitize} from \'hast-util-sanitize\'\r\nimport {toHast} from \'mdast-util-to-hast\'\r\n\/**\r\n * Plugin to serialize markdown as HTML.\r\n *\r\n * @type {import(\'unified\').Plugin<[Options?]|void[], Root, string>}\r\n *\/\r\nexport default function remarkHtml(options = {}) {\r\n  const handlers = options.handlers || {}\r\n  const schema =\r\n    options.sanitize && typeof options.sanitize === \'object\'\r\n      ? options.sanitize\r\n      : undefined\r\n\r\n  Object.assign(this, {Compiler: compiler})\r\n\r\n  \/**\r\n   * @type {import(\'unified\').CompilerFunction<Root, string>}\r\n   *\/\r\n  function compiler(node, file) {\r\n    const hast = toHast(node, {allowDangerousHtml: !options.sanitize, handlers})\r\n    \/\/ @ts-expect-error: assume root.\r\n    const cleanHast = options.sanitize ? sanitize(hast, schema) : hast\r\n    const result = toHtml(\r\n      \/\/ @ts-expect-error: assume root.\r\n      cleanHast,\r\n      Object.assign({}, options, {allowDangerousHtml: !options.sanitize})\r\n    )\r\n\r\n    if (file.extname) {\r\n\r\n    \r\n          \r\n            \r\n    \r\n\r\n          \r\n    \r\n    \r\n  \r\n      file.extname = \'.html\'\r\n    }\r\n    \/\/ Add an eof eol.\r\n    return node &&\r\n      node.type &&\r\n      node.type === \'root\' &&\r\n      result &&\r\n      \/[^\\r\\n]\/.test(result.charAt(result.length - 1))\r\n      ? result + \'\\n\'\r\n      : result\r\n  }\r\n}
  `;

  expect(sut.findMatches(input, run.vulnerabilities, run.patches, run.meta).foundVulnerabilities[0].title).toBe("Unsafe defaults in remark-html");
});