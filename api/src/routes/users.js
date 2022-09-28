const {Router} = require('express')
const passport = require('passport')
const router = Router()

const {signIn, signUp, getAllUsers, getUserById, changePassword, activateAccount, recoveryPOST, recoveryGET, updateUser} = require('../controllers/usersController')
const { userCreateValidator, userLoginValidator } = require('../middlewares/userValidators.js')
const googleAuthRoutes = require('./googleAuth.js')

// /users/...

router.post('/signup', userCreateValidator, signUp)
router.post('/signin', userLoginValidator ,signIn)
router.put('/changePassword/:userId', passport.authenticate('jwt', {session:false}), changePassword)

router.post('/recovery', recoveryPOST)
router.get('/recovery/:token', recoveryGET)
router.get('/', passport.authenticate('jwt', {session:false}), getAllUsers)
router.get('/:userId', passport.authenticate('jwt', {session:false}), getUserById)
router.get("/activateAccount/:token", activateAccount)
router.put('/update/:userId', passport.authenticate('jwt', {session:false}), updateUser)

router.use('/google', googleAuthRoutes)


module.exports = router