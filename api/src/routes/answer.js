const { Router } = require('express');
const router = Router();
const { createAnswer, getAnswer, updateAnswer, votesXAnswer } = require('../controllers/answersController.js')


// /asnwers/...
router.post('/', createAnswer);
router.get('/:id', getAnswer);
router.put('/:id', updateAnswer);
router.post('/', votesXAnswer)

module.exports = router;
