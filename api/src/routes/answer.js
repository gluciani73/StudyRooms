const { Router } = require('express');
const router = Router();
const { createAnswer, getAnswer, updateAnswer, likeAnswer } = require('../controllers/answersController.js')


// /asnwers/...
router.post('/', createAnswer);
router.get('/:id', getAnswer);
router.put('/:id', updateAnswer);
router.post('/answerId', likeAnswer)

module.exports = router;
