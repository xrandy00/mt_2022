const escodegen = require("escodegen");
const acorn = require("acorn");
const walk = require("./my_walk");

function firstInSecond(a, b) {
  if (a === b) return true;

  if (typeof a != "object" || typeof b != "object" || a == null || b == null)
    return false;

  let keysA = Object.keys(a),
    keysB = Object.keys(b);

  if (keysA.length > keysB.length) return false;

  for (let key of keysA) {
    if (!keysB.includes(key)) return false;

    if (typeof a[key] === "function" || typeof b[key] === "function") {
      if (a[key].toString() != b[key].toString()) return false;
    } else {
      if (!firstInSecond(a[key], b[key])) return false;
    }
  }

  return true;
}

function tryParse(code) {
  try {
    return acorn.parse(code, { ecmaVersion: "latest" });
  } catch (error) {
    console.log(error);
    return false;
  }
}

// https://stackoverflow.com/questions/17382427/are-there-pointers-in-javascript/17382443#17382443
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

function findMatches(input, vulnerabilitiesList) {
  const ast = tryParse(input);
  if (ast == false) return false;

  const foundVulnerabilities = [];

  // go over each node
  walk.full(ast, (node) => {
    // go over each vulnerability
    vulnerabilitiesList.forEach((vulnerability) => {
      // if the node matches vulnerability
      if (firstInSecond(vulnerability.ast, node)) {
        replaceReferencedObj(node, vulnerability.patch);
        foundVulnerabilities.push(vulnerability);
      }
    });
  });

  if (foundVulnerabilities.length > 0) {
    const output = escodegen.generate(ast);
    return [foundVulnerabilities, output];
  }
  return [foundVulnerabilities, input];
}

module.exports = {
  tryParse,
  findMatches
}