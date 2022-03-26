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
    var a;
    var b;
    var c = 1;
    var g;
    const d = 2;
    const e = 3;
    var f = 2;`;

    const input2 = `var a,b,c=1,g;const d=2,e=3;var f=2;`;

    let parsed1 = sut.tryParse(input1);
    let parsed2 = sut.tryParse(input2);

    let stringified1 = stringifyAndClean(parsed1);
    let stringified2 = stringifyAndClean(parsed2);


    expect(stringified1).toBe(stringified2);
});