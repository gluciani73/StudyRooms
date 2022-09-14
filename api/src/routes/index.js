const { Router } = require('express');
const router = Router();
const authRouter = require('./auth.routes.js')
const questions = require('./question')
const answer = require('./answer.js');

router.use(authRouter)
router.use(answer)
router.use("/", (req, res) => res.send("Respuesta del path / "))
router.use("/questions", questions)

module.exports = router;
