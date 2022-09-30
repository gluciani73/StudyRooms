const { Router } = require('express');
const router = Router();
const { createQuestion,
    getAllQuestions,
    getQuestions,
    getQuestion,
    updateQuestion,
    deleteQuestion,
    likeQuestion,
    unlikeQuestion,
    viewQuestion,
    getQuestionsByUser,
    getDeletedQuestions,
    logDelete,
    rateQuestion } = require('../controllers/questionsController.js')

// /questions/...
router.post('/', createQuestion);
router.get('/all', getAllQuestions);
router.get('/deleted', getDeletedQuestions);
router.get('/:questionId', getQuestion);
router.get('/', getQuestions);
router.get('/user/:userId', getQuestionsByUser);
router.put('/:questionId', updateQuestion)
router.delete('/:questionId', deleteQuestion)
router.post('/review', viewQuestion)
router.post('/like/:questionId',likeQuestion)
router.delete('/like/:questionId',unlikeQuestion)
router.put('/active/:questionId', logDelete)
router.put('/rate/:questionId',rateQuestion)
module.exports = router;