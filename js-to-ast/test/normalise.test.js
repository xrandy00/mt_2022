/**
 *
 * @summary Unit test file for functionality related to normalisation of AST
 * @author Vojtěch Randýsek, xrandy00@vutbr.cz
 *
 * Created at     : 2022-05-06 21:37:21 
 * Last modified  : 2022-05-06 21:37:38
 */


const sut = require("../src/finder");

function stringifyAndClean(ast) {
    return JSON.stringify(ast, (k, v) => (k === 'start' || k === 'end' || k === 'sourceType') ? undefined : v);
}

test("String quotes normalisation", () => {
    const input1 = `console.log("Hello World!");`;
    const input2 = `console.log('Hello World!');`;

    let parsed1 = sut.tryParse(input1);
    let parsed2 = sut.tryParse(input2);

    expect(parsed2).toStrictEqual(parsed1);
});


test("Variable declaration merging", () => {
    const input1 = `
    let a;
    let b;
    let c = 1;
    let g;
    const d = 2;
    const e = 3;
    let f = 2;`;

    const input2 = `let a,b,c=1,g;const d=2,e=3;let f=2;`;

    let parsed1 = sut.tryParse(input1);
    let parsed2 = sut.tryParse(input2);

    let stringified1 = stringifyAndClean(parsed1);
    let stringified2 = stringifyAndClean(parsed2);


    expect(stringified1).toBe(stringified2);
});

test("Variable declaration test", () => {
    const input1 = `
    var a  = "hello";
    var b  = 'world';
    `;

    const input2 = `
    var a="hello",b="world";
    `;

    let parsed1 = sut.tryParse(input1);
    let parsed2 = sut.tryParse(input2);

    let stringified1 = stringifyAndClean(parsed1);
    let stringified2 = stringifyAndClean(parsed2);

    expect(stringified1).toBe(stringified2);
});