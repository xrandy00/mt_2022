const sut = require("../src/parse");
const pda = require("../src/pda_alphabet");

test("Compare Node Lists", () => {
  let first = [
    new pda.ProgramNode({}),
    new pda.VariableDeclarationNode({ kind: "var" }),
    new pda.VariableDeclaratorNode({}),
    new pda.IdentifierNode({ name: "a" }),
    new pda.LiteralNode({ value: 1, raw: "1" }),
  ];
  let second = [
    new pda.ProgramNode({}),
    new pda.VariableDeclarationNode({ kind: "var" }),
    new pda.VariableDeclaratorNode({}),
    new pda.IdentifierNode({ name: "a" }),
    new pda.LiteralNode({ value: 1, raw: "1" }),
  ];

  expect(sut.compareNodeLists(first, second)).toBe(true);
});

test("Compare Node Lists, second shorter", () => {
  let first = [
    new pda.ProgramNode({}),
    new pda.VariableDeclarationNode({ kind: "var" }),
    new pda.VariableDeclaratorNode({}),
    new pda.IdentifierNode({ name: "a" }),
    new pda.LiteralNode({ value: 1, raw: "1" }),
  ];
  let second = [
    new pda.ProgramNode({}),
    new pda.VariableDeclarationNode({ kind: "var" }),
    new pda.VariableDeclaratorNode({}),
    new pda.IdentifierNode({ name: "a" }),
  ];

  expect(sut.compareNodeLists(first, second)).toBe(false);
});

test("Compare Node Lists, first shorter", () => {
  let first = [
    new pda.ProgramNode({}),
    new pda.VariableDeclarationNode({ kind: "var" }),
    new pda.VariableDeclaratorNode({}),
    new pda.IdentifierNode({ name: "a" }),
  ];
  let second = [
    new pda.ProgramNode({}),
    new pda.VariableDeclarationNode({ kind: "var" }),
    new pda.VariableDeclaratorNode({}),
    new pda.IdentifierNode({ name: "a" }),
    new pda.LiteralNode({ value: 1, raw: "1" }),
  ];

  expect(sut.compareNodeLists(first, second)).toBe(false);
});

test("Compare Node Lists, difference ", () => {
  let first = [
    new pda.ProgramNode({}),
    new pda.VariableDeclarationNode({ kind: "var" }),
    new pda.VariableDeclaratorNode({}),
    new pda.IdentifierNode({ name: "b" }),
    new pda.LiteralNode({ value: 1, raw: "1" }),
  ];
  let second = [
    new pda.ProgramNode({}),
    new pda.VariableDeclarationNode({ kind: "var" }),
    new pda.VariableDeclaratorNode({}),
    new pda.IdentifierNode({ name: "a" }),
    new pda.LiteralNode({ value: 1, raw: "1" }),
  ];

  expect(sut.compareNodeLists(first, second)).toBe(false);
});

test("Contains ", () => {
  expect(
    sut.contains([new pda.ProgramNode({})], [new pda.ProgramNode({})])
  ).toBe(true);
  expect(
    sut.contains(
      [
        new pda.ProgramNode({}),
        new pda.VariableDeclarationNode({ kind: "var" }),
        new pda.VariableDeclaratorNode({}),
        new pda.IdentifierNode({ name: "b" }),
        new pda.LiteralNode({ value: 1, raw: "1" }),
      ],
      [
        new pda.VariableDeclarationNode({ kind: "var" }),
        new pda.VariableDeclaratorNode({}),
        new pda.IdentifierNode({ name: "b" }),
      ]
    )
  ).toBe(true);

  expect(
    sut.contains(
      [new pda.ProgramNode({})],
      [new pda.VariableDeclarationNode({ kind: "var" })]
    )
  ).toBe(false);
  
  expect(
    sut.contains(
      [new pda.ProgramNode({})],
      [
        new pda.ProgramNode({}),
        new pda.VariableDeclarationNode({ kind: "var" }),
        new pda.VariableDeclarationNode({ kind: "var" }),
      ]
    )
  ).toBe(false);
  expect(
    sut.contains(
      [
        new pda.VariableDeclarationNode({ kind: "var" }),
        new pda.VariableDeclaratorNode({}),
        new pda.IdentifierNode({ name: "b" }),
        new pda.LiteralNode({ value: 1, raw: "1" }),
      ],
      [new pda.ProgramNode({})]
    )
  ).toBe(false);
});

test("Assignment expression", () => {
  let code = "var a = 1;";
  let actual = sut.parse(code);
  let expected = [
    new pda.VariableDeclarationNode({ kind: "var" }),
    new pda.VariableDeclaratorNode({}),
    new pda.IdentifierNode({ name: "a" }),
    new pda.LiteralNode({ value: 1, raw: "1" }),
  ];

  expect(sut.compareNodeLists(actual, expected)).toBe(true);
});

test("Assignment expression, different identifier", () => {
  let code = "var a = 1;";
  let actual = sut.parse(code);
  let expected = [
    new pda.VariableDeclarationNode({ kind: "var" }),
    new pda.VariableDeclaratorNode({}),
    new pda.IdentifierNode({ name: "b" }),
    new pda.LiteralNode({ value: 1, raw: "1" }),
  ];
  expect(sut.compareNodeLists(actual, expected)).toBe(false);
});

test("Assignment expression, different value", () => {
  let code = "var a = 1;";
  let actual = sut.parse(code);
  let expected = [
    new pda.VariableDeclarationNode({ kind: "var" }),
    new pda.VariableDeclaratorNode({}),
    new pda.IdentifierNode({ name: "a" }),
    new pda.LiteralNode({ value: 2, raw: "1" }),
  ];
  expect(sut.compareNodeLists(actual, expected)).toBe(false);
});

test("Assignment expression, different keyword", () => {
  let code = "var a = 1;";
  let actual = sut.parse(code);
  let expected = [
    new pda.VariableDeclarationNode({ kind: "let" }),
    new pda.VariableDeclaratorNode({}),
    new pda.IdentifierNode({ name: "a" }),
    new pda.LiteralNode({ value: 1, raw: "1" }),
  ];
  expect(sut.compareNodeLists(actual, expected)).toBe(false);
});

test("Class with constructor declaration", () => {
  let code = "class Foo {constructor(bar){this.bar = bar;}}";
  let actual = sut.parse(code);
  let expected = [
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
  expect(sut.compareNodeLists(actual, expected)).toBe(true);
});

test("Class with constructor declaration, false", () => {
  let code = "class Foo {constructor(bar){this.bar = bar;}}";
  let actual = sut.parse(code);
  let expected = [
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
  expect(sut.compareNodeLists(actual, expected)).toBe(false);
});

test("Class with constructor declaration, false", () => {
  let code = "class Foo {constructor(bar){this.bar = bar;}}";
  let actual = sut.parse(code);
  let expected = [
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
  expect(sut.compareNodeLists(actual, expected)).toBe(false);
});

test("Class with constructor declaration, false", () => {
  let code = "class Foo {constructor(bar){this.bar = bar;}}";
  let actual = sut.parse(code);
  let expected = [
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
  expect(sut.compareNodeLists(actual, expected)).toBe(false);
});

test("Class with constructor declaration, false", () => {
  let code = "class Foo {constructor(bar){this.bar = bar;}}";
  let actual = sut.parse(code);
  let expected = [
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
  expect(sut.compareNodeLists(actual, expected)).toBe(false);
});

test("Class with constructor declaration, false", () => {
  let code = "class Foo {constructor(bar){this.bar = bar;}}";
  let actual = sut.parse(code);
  let expected = [
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
  expect(sut.compareNodeLists(actual, expected)).toBe(false);
});
