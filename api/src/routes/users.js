const {Router} = require('express')
const router = Router()

const {signIn, signUp, getAllUsers, getUserById, changePassword} = require('../controllers/usersController')

// /users/...
router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/changePassword', changePassword)
router.get('/', getAllUsers)
rotuer.get('/:userId, getUserById)

module.exports = router