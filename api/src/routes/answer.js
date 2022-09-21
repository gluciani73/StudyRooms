const { Router } = require('express');
const router = Router();
const { createAnswer, getAnswer, updateAnswer, deleteAnswer } = require('../controllers/answersController.js')


// /asnwers/...
router.post('/', createAnswer);
router.get('/:id', getAnswer);
router.put('/:id', updateAnswer);
router.delete('/:id', deleteAnswer);

module.exports = router;
