const { Router } = require('express');
const router = Router();
const { createQuestion, getQuestions, getQuestion, updateQuestion } = require('../controllers/questionsController.js')


// /questions/...
router.post('/', createQuestion);
router.get('/:questionId', getQuestion);
router.get('/', getQuestions);
router.put('/:id', updateQuestion)

module.exports = router;