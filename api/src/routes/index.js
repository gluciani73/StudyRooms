const { Router } = require('express');
const router = Router();

const usersRoutes = require('./users.js')
const questionsRoutes = require('./question.js')
const answersRoutes = require('./answer.js');
const paymentRoutes = require('./payments.js')
const searchRoutes = require('./search.js');
const commentRoutes = require('./comment.js')

router.use("/users", usersRoutes)
router.use("/questions", questionsRoutes)
router.use("/answers", answersRoutes)
router.use("/payments", paymentRoutes)
router.use("/search", searchRoutes)
router.use("/comments", commentRoutes)

router.get("/", (req, res) => res.send("Respuesta del path / "))

module.exports = router;
