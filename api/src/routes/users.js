const {Router} = require('express')
const router = Router()

const {signIn, signUp, getAllUsers, getUserById, changePassword, activateAccount, updateUser} = require('../controllers/usersController')

// /users/...
router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/changePassword', changePassword)
router.get('/', getAllUsers)
router.get('/:userId', getUserById)
router.get("/activateAccount/:token", activateAccount)
router.put('/update/:userId', updateUser)

module.exports = router