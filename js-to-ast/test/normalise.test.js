const sut = require("../src/finder");

test("", () => {
    const input1 = `console.log("Hello World!");`;
    const input2 = `console.log('Hello World!');`;


    let parsed1 = sut.tryParse(input1);
    let parsed2 = sut.tryParse(input2);

    expect(parsed2).toStrictEqual(parsed1);
});