const { Router } = require('express');
const router = Router();
const { createAnswer, getAnswer, updateAnswer } = require('../controllers/answersController.js')


// /asnwers/...
router.post('/', createAnswer);
router.get('/:id', getAnswer);
router.put('/', updateAnswer);

module.exports = router;
