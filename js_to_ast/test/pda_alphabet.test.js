const pda = require('../src/pda_alphabet');

test('ProgramNode equality', () => {
    let first = new pda.ProgramNode();
    let second = new pda.ProgramNode();

    expect(first.equals(second)).toBe(true);
});

test('BlockStatementNode equality', () => {
    let first = new pda.BlockStatementNode();
    let second = new pda.BlockStatementNode();

    expect(first.equals(second)).toBe(true);
});

test('StaticBlockNode equality', () => {
    let first = new pda.StaticBlockNode();
    let second = new pda.StaticBlockNode();

    expect(first.equals(second)).toBe(true);
});

test('StatementNode equality', () => {
    let first = new pda.StatementNode();
    let second = new pda.StatementNode();

    expect(first.equals(second)).toBe(true);
});

test('EmptyStatementNode equality', () => {
    let first = new pda.EmptyStatementNode();
    let second = new pda.EmptyStatementNode();

    expect(first.equals(second)).toBe(true);
});

test('ExpressionStatementNode equality', () => {
    let first = new pda.ExpressionStatementNode();
    let second = new pda.ExpressionStatementNode();

    expect(first.equals(second)).toBe(true);
});

test('ParenthesizedExpressionNode equality', () => {
    let first = new pda.ParenthesizedExpressionNode();
    let second = new pda.ParenthesizedExpressionNode();

    expect(first.equals(second)).toBe(true);
});

test('ChainExpressionNode equality', () => {
    let first = new pda.ChainExpressionNode();
    let second = new pda.ChainExpressionNode();

    expect(first.equals(second)).toBe(true);
});

test('IfStatementNode equality', () => {
    let first = new pda.IfStatementNode();
    let second = new pda.IfStatementNode();

    expect(first.equals(second)).toBe(true);
});

test('LabeledStatementNode equality', () => {
    let first = new pda.LabeledStatementNode();
    let second = new pda.LabeledStatementNode();

    expect(first.equals(second)).toBe(true);
});

test('BreakStatementNode equality', () => {
    let first = new pda.BreakStatementNode();
    let second = new pda.BreakStatementNode();

    expect(first.equals(second)).toBe(true);
});

test('ContinueStatementNode equality', () => {
    let first = new pda.ContinueStatementNode();
    let second = new pda.ContinueStatementNode();

    expect(first.equals(second)).toBe(true);
});

test('WithStatementNode equality', () => {
    let first = new pda.WithStatementNode();
    let second = new pda.WithStatementNode();

    expect(first.equals(second)).toBe(true);
});

test('SwitchStatementNode equality', () => {
    let first = new pda.SwitchStatementNode();
    let second = new pda.SwitchStatementNode();

    expect(first.equals(second)).toBe(true);
});

test('SwitchCaseNode equality', () => {
    let first = new pda.SwitchCaseNode();
    let second = new pda.SwitchCaseNode();

    expect(first.equals(second)).toBe(true);
});

test('ReturnStatementNode equality', () => {
    let first = new pda.ReturnStatementNode();
    let second = new pda.ReturnStatementNode();

    expect(first.equals(second)).toBe(true);
});

test('YieldExpressionNode equality', () => {
    let first = new pda.YieldExpressionNode();
    let second = new pda.YieldExpressionNode();

    expect(first.equals(second)).toBe(true);
});

test('AwaitExpressionNode equality', () => {
    let first = new pda.AwaitExpressionNode();
    let second = new pda.AwaitExpressionNode();

    expect(first.equals(second)).toBe(true);
});

test('ThrowStatementNode equality', () => {
    let first = new pda.ThrowStatementNode();
    let second = new pda.ThrowStatementNode();

    expect(first.equals(second)).toBe(true);
});

test('SpreadElementNode equality', () => {
    let first = new pda.SpreadElementNode();
    let second = new pda.SpreadElementNode();

    expect(first.equals(second)).toBe(true);
});

test('TryStatementNode equality', () => {
    let first = new pda.TryStatementNode();
    let second = new pda.TryStatementNode();

    expect(first.equals(second)).toBe(true);
});

test('CatchClauseNode equality', () => {
    let first = new pda.CatchClauseNode();
    let second = new pda.CatchClauseNode();

    expect(first.equals(second)).toBe(true);
});

test('WhileStatementNode equality', () => {
    let first = new pda.WhileStatementNode();
    let second = new pda.WhileStatementNode();

    expect(first.equals(second)).toBe(true);
});

test('DoWhileStatementNode equality', () => {
    let first = new pda.DoWhileStatementNode();
    let second = new pda.DoWhileStatementNode();

    expect(first.equals(second)).toBe(true);
});

test('ForStatementNode equality', () => {
    let first = new pda.ForStatementNode();
    let second = new pda.ForStatementNode();

    expect(first.equals(second)).toBe(true);
});

test('ForInStatementNode equality', () => {
    let first = new pda.ForInStatementNode();
    let second = new pda.ForInStatementNode();

    expect(first.equals(second)).toBe(true);
});

test('ForOfStatementNode equality', () => {
    let first = new pda.ForOfStatementNode();
    let second = new pda.ForOfStatementNode();

    expect(first.equals(second)).toBe(true);
});

test('ForInitNode equality', () => {
    let first = new pda.ForInitNode();
    let second = new pda.ForInitNode();

    expect(first.equals(second)).toBe(true);
});

test('DebuggerStatementNode equality', () => {
    let first = new pda.DebuggerStatementNode();
    let second = new pda.DebuggerStatementNode();

    expect(first.equals(second)).toBe(true);
});

test('FunctionDeclarationNode equality', () => {
    let first = new pda.FunctionDeclarationNode();
    let second = new pda.FunctionDeclarationNode();

    expect(first.equals(second)).toBe(true);
});

test('VariableDeclarationNode equality', () => {
    let first = new pda.VariableDeclarationNode();
    let second = new pda.VariableDeclarationNode();

    expect(first.equals(second)).toBe(true);
});

test('VariableDeclaratorNode equality', () => {
    let first = new pda.VariableDeclaratorNode();
    let second = new pda.VariableDeclaratorNode();

    expect(first.equals(second)).toBe(true);
});

test('FunctionNode equality', () => {
    let first = new pda.FunctionNode();
    let second = new pda.FunctionNode();

    expect(first.equals(second)).toBe(true);
});

test('PatternNode equality', () => {
    let first = new pda.PatternNode();
    let second = new pda.PatternNode();

    expect(first.equals(second)).toBe(true);
});

test('VariablePatternNode equality', () => {
    let first = new pda.VariablePatternNode();
    let second = new pda.VariablePatternNode();

    expect(first.equals(second)).toBe(true);
});

test('MemberPatternNode equality', () => {
    let first = new pda.MemberPatternNode();
    let second = new pda.MemberPatternNode();

    expect(first.equals(second)).toBe(true);
});

test('RestElementNode equality', () => {
    let first = new pda.RestElementNode();
    let second = new pda.RestElementNode();

    expect(first.equals(second)).toBe(true);
});

test('ArrayPatternNode equality', () => {
    let first = new pda.ArrayPatternNode();
    let second = new pda.ArrayPatternNode();

    expect(first.equals(second)).toBe(true);
});

test('ObjectPatternNode equality', () => {
    let first = new pda.ObjectPatternNode();
    let second = new pda.ObjectPatternNode();

    expect(first.equals(second)).toBe(true);
});

test('ExpressionNode equality', () => {
    let first = new pda.ExpressionNode();
    let second = new pda.ExpressionNode();

    expect(first.equals(second)).toBe(true);
});

test('ThisExpressionNode equality', () => {
    let first = new pda.ThisExpressionNode();
    let second = new pda.ThisExpressionNode();

    expect(first.equals(second)).toBe(true);
});

test('SuperNode equality', () => {
    let first = new pda.SuperNode();
    let second = new pda.SuperNode();

    expect(first.equals(second)).toBe(true);
});

test('MetaPropertyNode equality', () => {
    let first = new pda.MetaPropertyNode();
    let second = new pda.MetaPropertyNode();

    expect(first.equals(second)).toBe(true);
});

test('ArrayExpressionNode equality', () => {
    let first = new pda.ArrayExpressionNode();
    let second = new pda.ArrayExpressionNode();

    expect(first.equals(second)).toBe(true);
});

test('ObjectExpressionNode equality', () => {
    let first = new pda.ObjectExpressionNode();
    let second = new pda.ObjectExpressionNode();

    expect(first.equals(second)).toBe(true);
});

test('FunctionExpressionNode equality', () => {
    let first = new pda.FunctionExpressionNode();
    let second = new pda.FunctionExpressionNode();

    expect(first.equals(second)).toBe(true);
});

test('ArrowFunctionExpressionNode equality', () => {
    let first = new pda.ArrowFunctionExpressionNode();
    let second = new pda.ArrowFunctionExpressionNode();

    expect(first.equals(second)).toBe(true);
});

test('SequenceExpressionNode equality', () => {
    let first = new pda.SequenceExpressionNode();
    let second = new pda.SequenceExpressionNode();

    expect(first.equals(second)).toBe(true);
});

test('TemplateLiteralNode equality', () => {
    let first = new pda.TemplateLiteralNode();
    let second = new pda.TemplateLiteralNode();

    expect(first.equals(second)).toBe(true);
});

test('TemplateElementNode equality', () => {
    let first = new pda.TemplateElementNode();
    let second = new pda.TemplateElementNode();

    expect(first.equals(second)).toBe(true);
});

test('UnaryExpressionNode equality', () => {
    let first = new pda.UnaryExpressionNode();
    let second = new pda.UnaryExpressionNode();

    expect(first.equals(second)).toBe(true);
});

test('UpdateExpressionNode equality', () => {
    let first = new pda.UpdateExpressionNode();
    let second = new pda.UpdateExpressionNode();

    expect(first.equals(second)).toBe(true);
});

test('BinaryExpressionNode equality', () => {
    let first = new pda.BinaryExpressionNode();
    let second = new pda.BinaryExpressionNode();

    expect(first.equals(second)).toBe(true);
});

test('LogicalExpressionNode equality', () => {
    let first = new pda.LogicalExpressionNode();
    let second = new pda.LogicalExpressionNode();

    expect(first.equals(second)).toBe(true);
});

test('AssignmentExpressionNode equality', () => {
    let first = new pda.AssignmentExpressionNode();
    let second = new pda.AssignmentExpressionNode();

    expect(first.equals(second)).toBe(true);
});

test('AssignmentPatternNode equality', () => {
    let first = new pda.AssignmentPatternNode();
    let second = new pda.AssignmentPatternNode();

    expect(first.equals(second)).toBe(true);
});

test('ConditionalExpressionNode equality', () => {
    let first = new pda.ConditionalExpressionNode();
    let second = new pda.ConditionalExpressionNode();

    expect(first.equals(second)).toBe(true);
});

test('NewExpressionNode equality', () => {
    let first = new pda.NewExpressionNode();
    let second = new pda.NewExpressionNode();

    expect(first.equals(second)).toBe(true);
});

test('CallExpressionNode equality', () => {
    let first = new pda.CallExpressionNode();
    let second = new pda.CallExpressionNode();

    expect(first.equals(second)).toBe(true);
});

test('MemberExpressionNode equality', () => {
    let first = new pda.MemberExpressionNode();
    let second = new pda.MemberExpressionNode();

    expect(first.equals(second)).toBe(true);
});

test('ExportNamedDeclarationNode equality', () => {
    let first = new pda.ExportNamedDeclarationNode();
    let second = new pda.ExportNamedDeclarationNode();

    expect(first.equals(second)).toBe(true);
});

test('ExportDefaultDeclarationNode equality', () => {
    let first = new pda.ExportDefaultDeclarationNode();
    let second = new pda.ExportDefaultDeclarationNode();

    expect(first.equals(second)).toBe(true);
});

test('ExportAllDeclarationNode equality', () => {
    let first = new pda.ExportAllDeclarationNode();
    let second = new pda.ExportAllDeclarationNode();

    expect(first.equals(second)).toBe(true);
});

test('ImportDeclarationNode equality', () => {
    let first = new pda.ImportDeclarationNode();
    let second = new pda.ImportDeclarationNode();

    expect(first.equals(second)).toBe(true);
});

test('ImportExpressionNode equality', () => {
    let first = new pda.ImportExpressionNode();
    let second = new pda.ImportExpressionNode();

    expect(first.equals(second)).toBe(true);
});

test('ImportSpecifierNode equality', () => {
    let first = new pda.ImportSpecifierNode();
    let second = new pda.ImportSpecifierNode();

    expect(first.equals(second)).toBe(true);
});

test('ImportDefaultSpecifierNode equality', () => {
    let first = new pda.ImportDefaultSpecifierNode();
    let second = new pda.ImportDefaultSpecifierNode();

    expect(first.equals(second)).toBe(true);
});

test('ImportNamespaceSpecifierNode equality', () => {
    let first = new pda.ImportNamespaceSpecifierNode();
    let second = new pda.ImportNamespaceSpecifierNode();

    expect(first.equals(second)).toBe(true);
});

test('IdentifierNode equality', () => {
    let first = new pda.IdentifierNode();
    let second = new pda.IdentifierNode();

    expect(first.equals(second)).toBe(true);
});

test('PrivateIdentifierNode equality', () => {
    let first = new pda.PrivateIdentifierNode();
    let second = new pda.PrivateIdentifierNode();

    expect(first.equals(second)).toBe(true);
});

test('LiteralNode equality', () => {
    let first = new pda.LiteralNode();
    let second = new pda.LiteralNode();

    expect(first.equals(second)).toBe(true);
});

test('TaggedTemplateExpressionNode equality', () => {
    let first = new pda.TaggedTemplateExpressionNode();
    let second = new pda.TaggedTemplateExpressionNode();

    expect(first.equals(second)).toBe(true);
});

test('ClassDeclarationNode equality', () => {
    let first = new pda.ClassDeclarationNode();
    let second = new pda.ClassDeclarationNode();

    expect(first.equals(second)).toBe(true);
});

test('ClassExpressionNode equality', () => {
    let first = new pda.ClassExpressionNode();
    let second = new pda.ClassExpressionNode();

    expect(first.equals(second)).toBe(true);
});

test('ClassNode equality', () => {
    let first = new pda.ClassNode();
    let second = new pda.ClassNode();

    expect(first.equals(second)).toBe(true);
});

test('ClassBodyNode equality', () => {
    let first = new pda.ClassBodyNode();
    let second = new pda.ClassBodyNode();

    expect(first.equals(second)).toBe(true);
});

test('MethodDefinitionNode equality', () => {
    let first = new pda.MethodDefinitionNode();
    let second = new pda.MethodDefinitionNode();

    expect(first.equals(second)).toBe(true);
});

test('PropertyDefinitionNode equality', () => {
    let first = new pda.PropertyDefinitionNode();
    let second = new pda.PropertyDefinitionNode();

    expect(first.equals(second)).toBe(true);
});

test('PropertyNode equality', () => {
    let first = new pda.PropertyNode();
    let second = new pda.PropertyNode();

    expect(first.equals(second)).toBe(true);
});