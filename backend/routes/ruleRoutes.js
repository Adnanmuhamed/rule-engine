const express = require('express');
const { createRule, evaluateRule } = require('../controllers/ruleController');
const router = express.Router();

router.post('/create', createRule);
router.post('/evaluate', evaluateRule);

module.exports = router;