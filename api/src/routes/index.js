const { Router } = require('express');
const router = Router();

const usersRoutes = require('./users.js')
const questions = require('./question')
const answer = require('./answer.js');
const payment = require('./payment.js')

router.use("/users", usersRoutes)
router.use("/answer", answer)
router.use("/payment", payment)
router.use("/questions", questions)

router.get("/", (req,res)=> res.send("estamos en '/'"))

module.exports = router;