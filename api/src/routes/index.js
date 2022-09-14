const { Router } = require('express');
const router = Router();

const usersRoutes = require('./users.js')
const questions = require('./question')
const answer = require('./answer.js');

router.use(usersRoutes)

router.use(answer)

router.use("/questions", questions)

router.get("/", (req,res)=> res.send("Respuesta del path / "))

module.exports = router;
