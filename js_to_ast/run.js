const acorn = require("acorn");
const walk = require("./my_walk")


function tryParse(code) {
    try {
        return acorn.parse(code, { ecmaVersion: "latest" })
    } catch (error) {
        console.error(error);
        return error;
    }

}

var ast = tryParse("var a = 1 + 1; var b = a + 2;");
console.log(ast)
walk.full(ast, node => {
    console.log(`There's a ${node.type}`)
},

)
