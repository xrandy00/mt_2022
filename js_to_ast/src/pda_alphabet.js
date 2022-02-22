class ProgramNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class BlockStatementNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class StaticBlockNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class StatementNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class EmptyStatementNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class ExpressionStatementNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class ParenthesizedExpressionNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class ChainExpressionNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class IfStatementNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class LabeledStatementNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class BreakStatementNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class ContinueStatementNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class WithStatementNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class SwitchStatementNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class SwitchCaseNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class ReturnStatementNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class YieldExpressionNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class AwaitExpressionNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class ThrowStatementNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class SpreadElementNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class TryStatementNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class CatchClauseNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class WhileStatementNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class DoWhileStatementNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class ForStatementNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class ForInStatementNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class ForOfStatementNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class ForInitNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class DebuggerStatementNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class FunctionDeclarationNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class VariableDeclarationNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return this.node.kind == other.node.kind;
    }

}
class VariableDeclaratorNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class FunctionNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class PatternNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class VariablePatternNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class MemberPatternNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class RestElementNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class ArrayPatternNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class ObjectPatternNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class ExpressionNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class ThisExpressionNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class SuperNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class MetaPropertyNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class ArrayExpressionNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class ObjectExpressionNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class FunctionExpressionNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class ArrowFunctionExpressionNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class SequenceExpressionNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class TemplateLiteralNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class TemplateElementNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return this.node.tail == other.node.tail && this.node.value == other.node.value;
    }

}
class UnaryExpressionNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return this.node.prefix == other.node.prefix;
    }

}
class UpdateExpressionNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return this.node.prefix == other.node.prefix;
    }

}
class BinaryExpressionNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class LogicalExpressionNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class AssignmentExpressionNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class AssignmentPatternNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class ConditionalExpressionNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class NewExpressionNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class CallExpressionNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return this.node.optional == other.node.optional;
    }

}
class MemberExpressionNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return this.node.computed == other.node.computed && this.node.optional == other.node.optional;
    }

}
class ExportNamedDeclarationNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class ExportDefaultDeclarationNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class ExportAllDeclarationNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class ImportDeclarationNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class ImportExpressionNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class ImportSpecifierNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class ImportDefaultSpecifierNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class ImportNamespaceSpecifierNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class IdentifierNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return this.node.name == other.node.name;
    }

}
class PrivateIdentifierNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return this.node.name == other.node.name;
    }

}
class LiteralNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return this.node.value == other.node.value && this.node.raw == other.node.raw && this.node.regex == other.node.regex && this.node.bigint == other.node.bigint;
    }

}
class TaggedTemplateExpressionNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class ClassDeclarationNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class ClassExpressionNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class ClassNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class ClassBodyNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return true;
    }

}
class MethodDefinitionNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return this.node.kind == other.node.kind && this.node.computed == other.node.computed && this.node.static == other.node.static;
    }

}
class PropertyDefinitionNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return this.node.computed == other.node.computed && this.node.static == other.node.static;
    }

}
class PropertyNode {
    constructor(node) {
        this.node = node;
    }

    equals(other) {
        if (typeof other != typeof this) {
            return false;
        }

        return this.node.kind == other.node.kind && this.node.method == other.node.method && this.node.shorthand == other.node.shorthand && this.node.computed == other.node.computed;
    }

}

module.exports = {
    ProgramNode,
    BlockStatementNode,
    StaticBlockNode,
    StatementNode,
    EmptyStatementNode,
    ExpressionStatementNode,
    ParenthesizedExpressionNode,
    ChainExpressionNode,
    IfStatementNode,
    LabeledStatementNode,
    BreakStatementNode,
    ContinueStatementNode,
    WithStatementNode,
    SwitchStatementNode,
    SwitchCaseNode,
    ReturnStatementNode,
    YieldExpressionNode,
    AwaitExpressionNode,
    ThrowStatementNode,
    SpreadElementNode,
    TryStatementNode,
    CatchClauseNode,
    WhileStatementNode,
    DoWhileStatementNode,
    ForStatementNode,
    ForInStatementNode,
    ForOfStatementNode,
    ForInitNode,
    DebuggerStatementNode,
    FunctionDeclarationNode,
    VariableDeclarationNode,
    VariableDeclaratorNode,
    FunctionNode,
    PatternNode,
    VariablePatternNode,
    MemberPatternNode,
    RestElementNode,
    ArrayPatternNode,
    ObjectPatternNode,
    ExpressionNode,
    ThisExpressionNode,
    SuperNode,
    MetaPropertyNode,
    ArrayExpressionNode,
    ObjectExpressionNode,
    FunctionExpressionNode,
    ArrowFunctionExpressionNode,
    SequenceExpressionNode,
    TemplateLiteralNode,
    TemplateElementNode,
    UnaryExpressionNode,
    UpdateExpressionNode,
    BinaryExpressionNode,
    LogicalExpressionNode,
    AssignmentExpressionNode,
    AssignmentPatternNode,
    ConditionalExpressionNode,
    NewExpressionNode,
    CallExpressionNode,
    MemberExpressionNode,
    ExportNamedDeclarationNode,
    ExportDefaultDeclarationNode,
    ExportAllDeclarationNode,
    ImportDeclarationNode,
    ImportExpressionNode,
    ImportSpecifierNode,
    ImportDefaultSpecifierNode,
    ImportNamespaceSpecifierNode,
    IdentifierNode,
    PrivateIdentifierNode,
    LiteralNode,
    TaggedTemplateExpressionNode,
    ClassDeclarationNode,
    ClassExpressionNode,
    ClassNode,
    ClassBodyNode,
    MethodDefinitionNode,
    PropertyDefinitionNode,
    PropertyNode,
}
