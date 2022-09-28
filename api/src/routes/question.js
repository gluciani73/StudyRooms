const { Router } = require('express');
const router = Router();
const { createQuestion, getQuestions, getQuestion, updateQuestion, deleteQuestion, likeQuestion, unlikeQuestion, viewQuestion, getQuestionsByUser} = require('../controllers/questionsController.js')


// /questions/...
router.post('/', createQuestion);
router.get('/:questionId', getQuestion);
router.get('/', getQuestions);
router.get('/user/:userId', getQuestionsByUser);
router.put('/:questionId', updateQuestion)
router.delete('/:questionId', deleteQuestion)
router.post('/review', viewQuestion)
router.post('/like/:questionId',likeQuestion)
router.delete('/like/:questionId',unlikeQuestion)

module.exports = router;