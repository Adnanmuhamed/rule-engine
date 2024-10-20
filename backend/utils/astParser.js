class Node {
  constructor(type, value = null, left = null, right = null) {
    this.type = type;
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

// Improved parser to handle various rule strings
const parseRuleString = (ruleString) => {
  // Simple parsing logic assuming rules are in a specific format
  const rules = ruleString.split(' AND ').map((orRule) => {
    const orOperands = orRule.split(' OR ').map((operand) => {
      const [field, operator, value] = operand.trim().split(' ');
      return new Node('operand', { field, operator, value: isNaN(value) ? value : Number(value) });
    });
    // Return an OR node combining the operands
    return orOperands.reduce((prev, curr) => {
      if (prev === null) return curr; // If prev is null, set it to the first operand
      return new Node('OR', null, prev, curr);
    }, null);
  });

  // Return the root AND node combining all OR nodes
  return rules.reduce((prev, curr) => {
    if (prev === null) return curr; // If prev is null, set it to the first rule
    return new Node('AND', null, prev, curr);
  }, null);
};

const evaluateAST = (ast, data) => {
  if (ast.type === 'operand') {
    const { field, operator, value } = ast.value;
    switch (operator) {
      case '>':
        return data[field] > value;
      case '<':
        return data[field] < value;
      case '=':
        return data[field] === value;
      default:
        throw new Error(`Unknown operator: ${operator}`);
    }
  } else if (ast.type === 'AND') {
    return evaluateAST(ast.left, data) && evaluateAST(ast.right, data);
  } else if (ast.type === 'OR') {
    return evaluateAST(ast.left, data) || evaluateAST(ast.right, data);
  }
  throw new Error(`Unknown node type: ${ast.type}`);
};

// Sample usage
// const ruleString = "age > 30 AND department = Sales OR salary > 50000";
// const ast = parseRuleString(ruleString);

// const testData1 = { age: 35, department: 'Sales', salary: 60000 }; // Should evaluate to true
// const testData2 = { age: 28, department: 'HR', salary: 55000 }; // Should evaluate to false
// const testData3 = { age: 32, department: 'Sales', salary: 45000 }; // Should evaluate to true
// const testData4 = { age: 29, department: 'Sales', salary: 48000 }; // Should evaluate to false

// console.log(evaluateAST(ast, testData1)); // true
// console.log(evaluateAST(ast, testData2)); // false
// console.log(evaluateAST(ast, testData3)); // true
// console.log(evaluateAST(ast, testData4)); // false

module.exports = { parseRuleString, evaluateAST };
