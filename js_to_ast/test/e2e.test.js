const sut = require("../src/parse");

test("Two way script", () => {
  let script = "var a = 1;";

  expect(sut.contains(sut.parse(script), sut.parse(script))).toBe(true);
});

test("Script contains", () => {
  let script1 = "var a = 1; var b = 2; var c = 3;";
  let script2 = "var b = 2;";

  expect(sut.contains(sut.parse(script1), sut.parse(script2))).toBe(true);
});

test("Script contains with comments", () => {
  let script1 = 
  `var fruits = ["Apple", "Banana", "Mango", "Orange", "Papaya"];
   var subarr = fruits.slice(1, 3);
   document.write(subarr); // Prints: Banana,Mango
   // hello
   var a = 1;`;
  let script2 = 
  `document.write(subarr);
  var a = 1;`;

  expect(sut.contains(sut.parse(script1), sut.parse(script2))).toBe(true);
});

// test("Minified Script contains", () => {
//   let script1 = "var a=1,b=2,c=3;";
//   let script2 = "var b = 2;";

//   expect(sut.contains(sut.parse(script1), sut.parse(script2))).toBe(true);
// });
