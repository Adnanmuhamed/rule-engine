const Rule = require('../models/ruleModel');
const { parseRuleString, evaluateAST } = require('../utils/astParser');


const createRule = async (req, res) => {
  try {
    const { ruleString } = req.body;
    const ast = parseRuleString(ruleString);

    const newRule = new Rule({ ruleString, ast });
    await newRule.save();

    res.status(201).json({ message: 'Rule created successfully', rule: newRule });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const evaluateRule = async (req, res) => {
  try {
    const { ruleId, data } = req.body;

    const rule = await Rule.findById(ruleId);
    if (!rule) return res.status(404).json({ error: 'Rule not found' });

    const result = evaluateAST(rule.ast, data);

    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createRule, evaluateRule };