// this script shows AST in format neede by patterns.json of given js code

const walk = require("./my_walk");
const finder = require("./finder");

// TODO - I somehow need to make it that:
// 1) input is the whole script/file + specify what part of it is the error

const input = `
  const parsedData = JSON.parse(data);
`;

const patch = `
    const parsedData = JSON.stringify(data);
`;

const inputAst = finder.tryParse(input);
const patchAst = finder.tryParse(patch);

walk.full(inputAst, (node) => {
  delete node.start;
  delete node.end;
});

walk.full(patchAst, (node) => {
  delete node.start;
  delete node.end;
});

console.log('finished');

const inputAstBody = inputAst.body;
const patchAstBody = patchAst.body;

if (inputAstBody.length == 1) {
  // cool
  console.log(JSON.stringify(inputAstBody[0]));
} else {
  // not cool - what to do?
  console.log('found multiple declarations in root, not handable yet');
}

if (patchAstBody.length == 1) {
  // cool
  console.log(JSON.stringify(patchAstBody[0]));

} else {
  // not cool - what to do?
  console.log('found multiple declarations in root, not handable yet');

}

