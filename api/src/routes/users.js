const {Router} = require('express')
const router = Router()

const {signIn, signUp, getAllUsers, getUserById, changePassword, activateAccount, recoveryPOST, recoveryGET, updateUser} = require('../controllers/usersController')
const { userCreateValidator, userLoginValidator } = require('../middlewares/userValidators.js')
const googleAuthRoutes = require('./googleAuth.js')

const passport = require('passport')
const private = passport.authenticate('jwt', {session:false})

// /users/...
router.post('/signup', userCreateValidator, signUp)
router.post('/signin', userLoginValidator ,signIn)
router.put('/changePassword/:userId', private, changePassword)
router.post('/recovery', recoveryPOST)
router.get('/recovery/:token', recoveryGET)
router.get('/', private, getAllUsers)
router.get('/:userId', private, getUserById)
router.get("/activateAccount/:token", activateAccount)
router.put('/update/:userId', private, updateUser)

router.use('/google', googleAuthRoutes)


module.exports = router