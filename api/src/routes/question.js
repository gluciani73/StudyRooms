const { Router } = require('express');
const {getQuestions, createQuestion, questionId} = require('../controllers/questionsController.js')

const router = Router();

// /questions/...
router.get('/', getQuestions);
router.post('/', createQuestion);
router.get('/:id', questionId);

module.exports = router;