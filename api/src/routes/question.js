const { Router } = require('express');
const {getQuestions, createQuestion} = require('../controllers/questionsController.js')

const router = Router();

// /questions/...
router.get('/', getQuestions);
router.post('/', createQuestion);

module.exports = router;