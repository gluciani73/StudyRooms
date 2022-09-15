const {Router} = require('express')
const router = Router()
const {signIn, signUp, getAllUsers} = require('../controllers/usersController')


router.post('/signup', signUp)
router.post('/signin', signIn)

router.get('/', getAllUsers)

module.exports = router