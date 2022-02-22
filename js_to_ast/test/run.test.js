const sut = require("../src/run");
const pda = require("../src/pda_alphabet");

function compareNodeLists(firstList, secondList) {
  if (firstList.length != secondList.length) {
    return false;
  }

  for (let index = 0; index < firstList.length; index++) {
    const first = firstList[index];
    const second = secondList[index];

    if (first.equals(second) == false) {
      console.log(first, second);
      return false;
    }
  }

  return true;
}

test("Assignment expression", () => {
  let code = "var a = 1;";
  let actual = sut.run(code);
  let expected = [
    new pda.ProgramNode({}),
    new pda.VariableDeclarationNode({ kind: "var" }),
    new pda.VariableDeclaratorNode({}),
    new pda.IdentifierNode({ name: "a" }),
    new pda.LiteralNode({ value: 1, raw: "1" }),
  ];

  expect(compareNodeLists(actual, expected)).toBe(true);
});

test("Assignment expression, different identifier", () => {
  let code = "var a = 1;";
  let actual = sut.run(code);
  let expected = [
    new pda.ProgramNode({}),
    new pda.VariableDeclarationNode({ kind: "var" }),
    new pda.VariableDeclaratorNode({}),
    new pda.IdentifierNode({ name: "b" }),
    new pda.LiteralNode({ value: 1, raw: "1" }),
  ];
  expect(compareNodeLists(actual, expected)).toBe(false);
});

test("Assignment expression, different value", () => {
  let code = "var a = 1;";
  let actual = sut.run(code);
  let expected = [
    new pda.ProgramNode({}),
    new pda.VariableDeclarationNode({ kind: "var" }),
    new pda.VariableDeclaratorNode({}),
    new pda.IdentifierNode({ name: "a" }),
    new pda.LiteralNode({ value: 2, raw: "1" }),
  ];
  expect(compareNodeLists(actual, expected)).toBe(false);
});

test("Assignment expression, different keyword", () => {
  let code = "var a = 1;";
  let actual = sut.run(code);
  let expected = [
    new pda.ProgramNode({}),
    new pda.VariableDeclarationNode({ kind: "let" }),
    new pda.VariableDeclaratorNode({}),
    new pda.IdentifierNode({ name: "a" }),
    new pda.LiteralNode({ value: 1, raw: "1" }),
  ];
  expect(compareNodeLists(actual, expected)).toBe(false);
});

test("Class with constructor declaration", () => {
  let code = "class Foo {constructor(bar){this.bar = bar;}}";
  let actual = sut.run(code);
  let expected = [
    new pda.ProgramNode({}),
    new pda.ClassDeclarationNode({ superClass: null }),
    new pda.IdentifierNode({ name: "Foo" }),
    new pda.ClassBodyNode(),
    new pda.MethodDefinitionNode({
      static: false,
      computed: false,
      kind: "constructor",
    }),
    new pda.FunctionExpressionNode({
      id: null,
      expression: false,
      generator: false,
      async: false,
    }),
    new pda.IdentifierNode({ name: "bar" }),
    new pda.BlockStatementNode(),
    new pda.ExpressionStatementNode(),
    new pda.AssignmentExpressionNode({ operator: "=" }),
    new pda.MemberExpressionNode({ computed: false, optional: false }),
    new pda.ThisExpressionNode(),
    new pda.IdentifierNode({ name: "bar" }),
  ];
  expect(compareNodeLists(actual, expected)).toBe(true);
});

test("Class with constructor declaration, false", () => {
  let code = "class Foo {constructor(bar){this.bar = bar;}}";
  let actual = sut.run(code);
  let expected = [
    new pda.ProgramNode({}),
    new pda.ClassDeclarationNode({ superClass: true }),
    new pda.IdentifierNode({ name: "Foo" }),
    new pda.ClassBodyNode(),
    new pda.MethodDefinitionNode({
      static: false,
      computed: false,
      kind: "constructor",
    }),
    new pda.FunctionExpressionNode({
      id: null,
      expression: false,
      generator: false,
      async: false,
    }),
    new pda.IdentifierNode({ name: "bar" }),
    new pda.BlockStatementNode(),
    new pda.ExpressionStatementNode(),
    new pda.AssignmentExpressionNode({ operator: "=" }),
    new pda.MemberExpressionNode({ computed: false, optional: false }),
    new pda.ThisExpressionNode(),
    new pda.IdentifierNode({ name: "bar" }),
  ];
  expect(compareNodeLists(actual, expected)).toBe(false);
});

test("Class with constructor declaration, false", () => {
  let code = "class Foo {constructor(bar){this.bar = bar;}}";
  let actual = sut.run(code);
  let expected = [
    new pda.ProgramNode({}),
    new pda.ClassDeclarationNode({ superClass: null }),
    new pda.IdentifierNode({ name: "Foo" }),
    new pda.ClassBodyNode(),
    new pda.MethodDefinitionNode({
      static: false,
      computed: false,
      kind: "constructor2",
    }),
    new pda.FunctionExpressionNode({
      id: null,
      expression: false,
      generator: false,
      async: false,
    }),
    new pda.IdentifierNode({ name: "bar" }),
    new pda.BlockStatementNode(),
    new pda.ExpressionStatementNode(),
    new pda.AssignmentExpressionNode({ operator: "=" }),
    new pda.MemberExpressionNode({ computed: false, optional: false }),
    new pda.ThisExpressionNode(),
    new pda.IdentifierNode({ name: "bar" }),
  ];
  expect(compareNodeLists(actual, expected)).toBe(false);
});

test("Class with constructor declaration, false", () => {
  let code = "class Foo {constructor(bar){this.bar = bar;}}";
  let actual = sut.run(code);
  let expected = [
    new pda.ProgramNode({}),
    new pda.ClassDeclarationNode({ superClass: null }),
    new pda.IdentifierNode({ name: "Foob" }),
    new pda.ClassBodyNode(),
    new pda.MethodDefinitionNode({
      static: false,
      computed: false,
      kind: "constructor",
    }),
    new pda.FunctionExpressionNode({
      id: null,
      expression: false,
      generator: false,
      async: false,
    }),
    new pda.IdentifierNode({ name: "barz" }),
    new pda.BlockStatementNode(),
    new pda.ExpressionStatementNode(),
    new pda.AssignmentExpressionNode({ operator: "=" }),
    new pda.MemberExpressionNode({ computed: false, optional: false }),
    new pda.ThisExpressionNode(),
    new pda.IdentifierNode({ name: "bar" }),
  ];
  expect(compareNodeLists(actual, expected)).toBe(false);
});

test("Class with constructor declaration, false", () => {
  let code = "class Foo {constructor(bar){this.bar = bar;}}";
  let actual = sut.run(code);
  let expected = [
    new pda.ProgramNode({}),
    new pda.ClassDeclarationNode({ superClass: null }),
    new pda.IdentifierNode({ name: "Foo" }),
    new pda.ClassBodyNode(),
    new pda.MethodDefinitionNode({
      static: false,
      computed: false,
      kind: "constructor",
    }),
    new pda.FunctionExpressionNode({
      id: null,
      expression: false,
      generator: false,
      async: false,
    }),
    new pda.IdentifierNode({ name: "bar" }),
    new pda.BlockStatementNode(),
    new pda.ExpressionStatementNode(),
    new pda.AssignmentExpressionNode({ operator: "==" }),
    new pda.MemberExpressionNode({ computed: false, optional: false }),
    new pda.ThisExpressionNode(),
    new pda.IdentifierNode({ name: "bar" }),
  ];
  expect(compareNodeLists(actual, expected)).toBe(false);
});

test("Class with constructor declaration, false", () => {
  let code = "class Foo {constructor(bar){this.bar = bar;}}";
  let actual = sut.run(code);
  let expected = [
    new pda.ProgramNode({}),
    new pda.ClassDeclarationNode({ superClass: null }),
    new pda.IdentifierNode({ name: "Foo" }),
    new pda.ClassBodyNode(),
    new pda.MethodDefinitionNode({
      static: false,
      computed: false,
      kind: "constructor",
    }),
    new pda.FunctionExpressionNode({
      id: null,
      expression: false,
      generator: false,
      async: false,
    }),
    new pda.IdentifierNode({ name: "bar" }),
    new pda.BlockStatementNode(),
    new pda.ExpressionStatementNode(),
    new pda.AssignmentExpressionNode({ operator: "=" }),
    new pda.MemberExpressionNode({ computed: true, optional: false }),
    new pda.ThisExpressionNode(),
    new pda.IdentifierNode({ name: "bar" }),
  ];
  expect(compareNodeLists(actual, expected)).toBe(false);
});
