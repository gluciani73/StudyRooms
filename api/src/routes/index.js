const { Router } = require('express');
const router = Router();


const categories = require('./categories');
const question = require('./question');
const usersRoutes = require('./users.js')
const answer = require('./answer.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/", help)
router.use(usersRoutes)
router.use(answer)
router.use('/categories', categories);
router.use('/Question', question);
router.get("/", (req,res)=> res.send("estamos en '/'"))


module.exports = router;