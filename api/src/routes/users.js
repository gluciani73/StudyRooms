const {Router} = require('express')
const router = Router()
const {signIn, signUp, getAllUsers, getUserById} = require('../controllers/usersController')

// /users/...
router.post('/signup', signUp)
router.post('/signin', signIn)
router.get('/', getAllUsers)
router.get('/:userId', getUserById)

module.exports = router