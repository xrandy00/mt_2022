const acorn = require("acorn");
const walk = require("./my_walk")
const pda = require("./pda_alphabet")


function tryParse(code) {
    try {
        return acorn.parse(code, { ecmaVersion: "latest" })
    } catch (error) {
        console.error(error);
        return error;
    }

}

var ast = tryParse("var b = a + 2; var a = 1 + 1;");

var list = [];

walk.full(ast, node => {
    switch (node.type) {
        case "Program":
            list.push(new pda.ProgramNode(node));
            break;
        case "BlockStatement":
            list.push(new pda.BlockStatementNode(node));
            break;
        case "StaticBlock":
            list.push(new pda.StaticBlockNode(node));
            break;
        case "Statement":
            list.push(new pda.StatementNode(node));
            break;
        case "EmptyStatement":
            list.push(new pda.EmptyStatementNode(node));
            break;
        case "ExpressionStatement":
            list.push(new pda.ExpressionStatementNode(node));
            break;
        case "ParenthesizedExpression":
            list.push(new pda.ParenthesizedExpressionNode(node));
            break;
        case "ChainExpression":
            list.push(new pda.ChainExpressionNode(node));
            break;
        case "IfStatement":
            list.push(new pda.IfStatementNode(node));
            break;
        case "LabeledStatement":
            list.push(new pda.LabeledStatementNode(node));
            break;
        case "BreakStatement":
            list.push(new pda.BreakStatementNode(node));
            break;
        case "ContinueStatement":
            list.push(new pda.ContinueStatementNode(node));
            break;
        case "WithStatement":
            list.push(new pda.WithStatementNode(node));
            break;
        case "SwitchStatement":
            list.push(new pda.SwitchStatementNode(node));
            break;
        case "SwitchCase":
            list.push(new pda.SwitchCaseNode(node));
            break;
        case "ReturnStatement":
            list.push(new pda.ReturnStatementNode(node));
            break;
        case "YieldExpression":
            list.push(new pda.YieldExpressionNode(node));
            break;
        case "AwaitExpression":
            list.push(new pda.AwaitExpressionNode(node));
            break;
        case "ThrowStatement":
            list.push(new pda.ThrowStatementNode(node));
            break;
        case "SpreadElement":
            list.push(new pda.SpreadElementNode(node));
            break;
        case "TryStatement":
            list.push(new pda.TryStatementNode(node));
            break;
        case "CatchClause":
            list.push(new pda.CatchClauseNode(node));
            break;
        case "WhileStatement":
            list.push(new pda.WhileStatementNode(node));
            break;
        case "DoWhileStatement":
            list.push(new pda.DoWhileStatementNode(node));
            break;
        case "ForStatement":
            list.push(new pda.ForStatementNode(node));
            break;
        case "ForInStatement":
            list.push(new pda.ForInStatementNode(node));
            break;
        case "ForOfStatement":
            list.push(new pda.ForOfStatementNode(node));
            break;
        case "ForInit":
            list.push(new pda.ForInitNode(node));
            break;
        case "DebuggerStatement":
            list.push(new pda.DebuggerStatementNode(node));
            break;
        case "FunctionDeclaration":
            list.push(new pda.FunctionDeclarationNode(node));
            break;
        case "VariableDeclaration":
            list.push(new pda.VariableDeclarationNode(node));
            break;
        case "VariableDeclarator":
            list.push(new pda.VariableDeclaratorNode(node));
            break;
        case "Function":
            list.push(new pda.FunctionNode(node));
            break;
        case "Pattern":
            list.push(new pda.PatternNode(node));
            break;
        case "VariablePattern":
            list.push(new pda.VariablePatternNode(node));
            break;
        case "MemberPattern":
            list.push(new pda.MemberPatternNode(node));
            break;
        case "RestElement":
            list.push(new pda.RestElementNode(node));
            break;
        case "ArrayPattern":
            list.push(new pda.ArrayPatternNode(node));
            break;
        case "ObjectPattern":
            list.push(new pda.ObjectPatternNode(node));
            break;
        case "Expression":
            list.push(new pda.ExpressionNode(node));
            break;
        case "ThisExpression":
            list.push(new pda.ThisExpressionNode(node));
            break;
        case "Super":
            list.push(new pda.ProgramNSuperodeNode(node));
            break;
        case "MetaProperty":
            list.push(new pda.MetaPropertyNode(node));
            break;
        case "ArrayExpression":
            list.push(new pda.ArrayExpressionNode(node));
            break;
        case "ObjectExpression":
            list.push(new pda.ObjectExpressionNode(node));
            break;
        case "FunctionExpression":
            list.push(new pda.FunctionExpressionNode(node));
            break;
        case "ArrowFunctionExpression":
            list.push(new pda.ArrowFunctionExpressionNode(node));
            break;
        case "SequenceExpression":
            list.push(new pda.SequenceExpressionNode(node));
            break;
        case "TemplateLiteral":
            list.push(new pda.TemplateLiteralNode(node));
            break;
        case "TemplateElement":
            list.push(new pda.TemplateElementNode(node));
            break;
        case "UnaryExpression":
            list.push(new pda.UnaryExpressionNode(node));
            break;
        case "UpdateExpression":
            list.push(new pda.UpdateExpressionNode(node));
            break;
        case "BinaryExpression":
            list.push(new pda.BinaryExpressionNode(node));
            break;
        case "LogicalExpression":
            list.push(new pda.LogicalExpressionNode(node));
            break;
        case "AssignmentExpression":
            list.push(new pda.AssignmentExpressionNode(node));
            break;
        case "AssignmentPattern":
            list.push(new pda.AssignmentPatternNode(node));
            break;
        case "ConditionalExpression":
            list.push(new pda.ConditionalExpressionNode(node));
            break;
        case "NewExpression":
            list.push(new pda.NewExpressionNode(node));
            break;
        case "CallExpression":
            list.push(new pda.CallExpressionNode(node));
            break;
        case "MemberExpression":
            list.push(new pda.MemberExpressionNode(node));
            break;
        case "ExportNamedDeclaration":
            list.push(new pda.ExportNamedDeclarationNode(node));
            break;
        case "ExportDefaultDeclaration":
            list.push(new pda.ExportDefaultDeclarationNode(node));
            break;
        case "ExportAllDeclaration":
            list.push(new pda.ExportAllDeclarationNode(node));
            break;
        case "ImportDeclaration":
            list.push(new pda.ImportDeclarationNode(node));
            break;
        case "ImportExpression":
            list.push(new pda.ImportExpressionNode(node));
            break;
        case "ImportSpecifier":
            list.push(new pda.ImportSpecifierNode(node));
            break;
        case "ImportDefaultSpecifier":
            list.push(new pda.ImportDefaultSpecifierNode(node));
            break;
        case "ImportNamespaceSpecifier":
            list.push(new pda.ImportNamespaceSpecifierNode(node));
            break;
        case "Identifier":
            list.push(new pda.IdentifierNode(node));
            break;
        case "PrivateIdentifier":
            list.push(new pda.PrivateIdentifierNode(node));
            break;
        case "Literal":
            list.push(new pda.LiteralNode(node));
            break;
        case "TaggedTemplateExpression":
            list.push(new pda.TaggedTemplateExpressionNode(node))
            break;
        case "ClassDeclaration":
            list.push(new pda.ClassDeclarationNode(node));
            break;
        case "ClassExpression":
            list.push(new pda.ClassExpressionNode(node));
            break;
        case "Class":
            list.push(new pda.ClassNode(node));
            break;
        case "ClassBody":
            list.push(new pda.ClassBodyNode(node));
            break;
        case "MethodDefinition":
            list.push(new pda.MethodDefinitionNode(node));
            break;
        case "PropertyDefinition":
            list.push(new pda.PropertyDefinitionNode(node));
            break;
        case "Property":
            list.push(new pda.PropertyNode(node));
            break;
        default:
            break;
    }
})


console.log(list);

