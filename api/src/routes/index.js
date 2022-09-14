const { Router } = require('express');
const router = Router();
const usersRoutes = require('./users.js')

router.use(usersRoutes)
router.get("/", (req,res)=> res.send("todo ok"))

module.exports = router;