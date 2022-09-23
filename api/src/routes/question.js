const { Router } = require('express');
const router = Router();
const { createQuestion, getQuestions, getQuestion, updateQuestion, deleteQuestion, likeQuestion } = require('../controllers/questionsController.js')


// /questions/...
router.post('/', createQuestion);
router.get('/:questionId', getQuestion);
router.get('/', getQuestions);
router.put('/:questionId', updateQuestion)
router.delete('/:questionId', deleteQuestion)


module.exports = router;