const { Router } = require('express');
const router = Router();
const { createAnswer, getAnswer, updateAnswer, deleteAnswer } = require('../controllers/answersController.js')


// /asnwers/...
router.post('/', createAnswer);
router.get('/:questionId', getAnswer);
router.put('/:answerId', updateAnswer);
router.delete('/:answerId', deleteAnswer);

module.exports = router;
