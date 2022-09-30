const { Router } = require('express');
const router = Router();

const usersRoutes = require('./users.js')
const questionsRoutes = require('./question.js')
const answersRoutes = require('./answer.js');
const paymentRoutes = require('./payments.js')
const searchRoutes = require('./search.js');
const commentRoutes = require('./comment.js')
const categoryRoutes = require('./categories.js')

const passport = require('passport')
const private = passport.authenticate('jwt', {session:false})

router.use("/users", usersRoutes)
router.use("/questions", private, questionsRoutes)
router.use("/answers", private, answersRoutes)
router.use("/payments", private, paymentRoutes)
router.use("/search", private, searchRoutes)
router.use("/comments", private, commentRoutes)
router.use("/categories", private, categoryRoutes)

router.get("/", (req, res) => res.send("Respuesta del path / "))

module.exports = router;
