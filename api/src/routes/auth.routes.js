const {Router} = require('express')
const router = Router()
const {signIn, signUp} = require('../controllers/auth.controller')

router.post('/auth/signup', signUp)
router.post('/auth/signin', signIn)

module.exports = router