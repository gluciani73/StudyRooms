const {Router} = require('express')
const router = Router()

const {signIn, signUp, getAllUsers, getUserById, changePassword, activateAccount, recoveryPOST, recoveryGET} = require('../controllers/usersController')

// /users/...
router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/changePassword', changePassword)
router.post('/recovery', recoveryPOST)
router.get('/recovery/:token', recoveryGET)
router.get('/', getAllUsers)
router.get('/:userId', getUserById)
router.get("/activateAccount/:token", activateAccount)

module.exports = router