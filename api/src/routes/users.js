const {Router} = require('express')
const passport = require('passport')
const router = Router()


const {signIn, signUp, getAllUsers, getUserById, changePassword, activateAccount, recoveryPOST, recoveryGET, updateUser} = require('../controllers/usersController')


// /users/...
router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/changePassword', changePassword)
router.post('/recovery', recoveryPOST)
router.get('/recovery/:token', recoveryGET)
router.get('/', getAllUsers)
router.get('/:userId', getUserById)
router.get("/activateAccount/:token", activateAccount)
router.put('/update/:userId', updateUser)

//  --->>  localhost:3001/users/google/login    

router.get('/google/login', passport.authenticate('google', {scope: 'profile'}))
router.get('/google/login/callback',
passport.authenticate('google', {
    successRedirect: '/google/login/success',
    failureRedirect: '/google/login/failure'
}))
router.get('/google/login/success', () => {res.json({msg: "salio todo bien"})})
router.get('/google/login/failure', () => {res.json({msg: "fallo todo"})})

module.exports = router