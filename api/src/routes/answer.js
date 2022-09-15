const { Router } = require('express');
const router = Router();
const {createAnswer} = require('../controllers/answersController.js')


// /asnwers/...
router.post('/', createAnswer);

module.exports = router;
