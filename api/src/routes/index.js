const { Router } = require('express');
const router = Router();

const usersRoutes = require('./users.js')
const questionsRoutes = require('./question.js')
const answersRoutes = require('./answer.js');
const paymentRoutes = require('./payments.js')

router.use("/users", usersRoutes)
router.use("/questions", questionsRoutes)
router.use("/answers", answersRoutes)
router.use("/payments", paymentRoutes)



router.get("/", (req,res)=> res.send("Respuesta del path / "))

module.exports = router;
