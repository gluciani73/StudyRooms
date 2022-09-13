const { Router } = require('express');
const router = Router();
const authRouter = require('./auth.routes.js')

router.use(authRouter)
router.use("/", (req,res)=> res.send("todo ok"))

module.exports = router;
