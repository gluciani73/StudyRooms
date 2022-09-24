const { Router } = require('express');
const router = Router();
const { createAnswer, getAnswer, updateAnswer, likeAnswer, deleteVotesXAnswer } = require('../controllers/answersController.js')


// /asnwers/...
router.post('/', createAnswer);
router.get('/:id', getAnswer);
router.put('/:id', updateAnswer);
router.post('/answerId', likeAnswer)
router.delete('/:answerId', deleteVotesXAnswer)

module.exports = router;
