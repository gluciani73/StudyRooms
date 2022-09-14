const { Router } = require('express');
const router = Router();
const help = require('../controllers/help.js')

const categories = require('./categories');
const question = require('./question');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/", help)

router.use('/categories', categories);
router.use('/Question', question);

module.exports = router;
