class ProgramNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class BlockStatementNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class StaticBlockNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class StatementNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class EmptyStatementNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class ExpressionStatementNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class ParenthesizedExpressionNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class ChainExpressionNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class IfStatementNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class LabeledStatementNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class BreakStatementNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class ContinueStatementNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class WithStatementNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class SwitchStatementNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class SwitchCaseNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class ReturnStatementNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class YieldExpressionNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class AwaitExpressionNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class ThrowStatementNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class SpreadElementNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class TryStatementNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class CatchClauseNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class WhileStatementNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class DoWhileStatementNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class ForStatementNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class ForInStatementNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class ForOfStatementNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class ForInitNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class DebuggerStatementNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class FunctionDeclarationNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class VariableDeclarationNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return this.node.kind == other.node.kind;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class VariableDeclaratorNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class FunctionNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class PatternNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class VariablePatternNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class MemberPatternNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class RestElementNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class ArrayPatternNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class ObjectPatternNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class ExpressionNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class ThisExpressionNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class SuperNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class MetaPropertyNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class ArrayExpressionNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class ObjectExpressionNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class FunctionExpressionNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return (
      this.node.id == other.node.id &&
      this.node.expression == other.node.expression &&
      this.node.generator == other.node.generator &&
      this.node.async == other.node.async
    );
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class ArrowFunctionExpressionNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class SequenceExpressionNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class TemplateLiteralNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class TemplateElementNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return (
      this.node.tail == other.node.tail && this.node.value == other.node.value
    );
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class UnaryExpressionNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return this.node.prefix == other.node.prefix;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class UpdateExpressionNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return this.node.prefix == other.node.prefix;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class BinaryExpressionNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class LogicalExpressionNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class AssignmentExpressionNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return this.node.operator == other.node.operator;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class AssignmentPatternNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class ConditionalExpressionNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class NewExpressionNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class CallExpressionNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return this.node.optional == other.node.optional;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class MemberExpressionNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return (
      this.node.computed == other.node.computed &&
      this.node.optional == other.node.optional
    );
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class ExportNamedDeclarationNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class ExportDefaultDeclarationNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class ExportAllDeclarationNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class ImportDeclarationNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class ImportExpressionNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class ImportSpecifierNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class ImportDefaultSpecifierNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class ImportNamespaceSpecifierNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class IdentifierNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return this.node.name == other.node.name;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class PrivateIdentifierNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return this.node.name == other.node.name;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class LiteralNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return (
      this.node.value == other.node.value &&
      this.node.raw == other.node.raw &&
      this.node.regex == other.node.regex &&
      this.node.bigint == other.node.bigint
    );
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class TaggedTemplateExpressionNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class ClassDeclarationNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return this.node.superClass == other.node.superClass;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class ClassExpressionNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class ClassNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class ClassBodyNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return true;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class MethodDefinitionNode {
  constructor(node) {
    this.node = node;
  }

  hasSameProperties(other) {
    return (
      this.node.kind == other.node.kind &&
      this.node.computed == other.node.computed &&
      this.node.static == other.node.static
    );
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return this.hasSameProperties(other) && other.hasSameProperties(this);
  }
}
class PropertyDefinitionNode {
  constructor(node) {
    this.node = node;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return (
      this.node.computed == other.node.computed &&
      this.node.static == other.node.static
    );
  }
}
class PropertyNode {
  constructor(node) {
    this.node = node;
  }

  equals(other) {
    if (other.constructor.name != this.constructor.name) {
      return false;
    }

    return (
      this.node.kind == other.node.kind &&
      this.node.method == other.node.method &&
      this.node.shorthand == other.node.shorthand &&
      this.node.computed == other.node.computed
    );
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
};
