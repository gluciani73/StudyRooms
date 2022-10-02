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
const privateRouteRouteRoute = passport.authenticate('jwt', {session:false})

router.use("/users", usersRoutes)
router.use("/questions", privateRouteRouteRoute, questionsRoutes)
router.use("/answers", privateRouteRouteRoute, answersRoutes)
router.use("/payments", privateRouteRouteRoute, paymentRoutes)
router.use("/search", privateRouteRouteRoute, searchRoutes)
router.use("/comments", privateRouteRouteRoute, commentRoutes)
router.use("/categories", privateRouteRouteRoute, categoryRoutes)

router.get("/", (req, res) => res.send("Respuesta del path / "))

module.exports = router;
