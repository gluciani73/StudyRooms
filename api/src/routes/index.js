const { Router } = require('express');
const router = Router();
const help = require('../controllers/help.js')

router.use("/", help)

module.exports = router;
