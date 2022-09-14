const { Router } = require('express');
const router = Router();
const authRouter = require('./auth.routes.js')
const questions = require('./question')
const answer = require('./answer')

router.use(authRouter)
router.use("/", (req, res) => res.send("Respuesta del path / "))
router.use("/questions", questions)
router.use("/answers", answer)

module.exports = router;
