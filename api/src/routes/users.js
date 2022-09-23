const {Router} = require('express')
const passport = require('passport')
const router = Router()
const jwt = require('jsonwebtoken')

const AUTH_SECRET = process.env.AUTH_SECRET || "Secret!"
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

router.get('/google/login', passport.authenticate('google', {scope: ['profile', 'email']}))

router.get('/google/login/callback',
    passport.authenticate('google', {
        failureRedirect: '/users/google/login/failure',
        session:false
    }),
    (req,res)=> {
        const token = jwt.sign(req.user, AUTH_SECRET,{expiresIn:'1d'})
        res.json(token)
    })

router.get('/google/login/success', (req,res) => {res.json({msg: "salio todo bien"})})
router.get('/google/login/failure', (req,res) => {res.json({msg: "fallo todo"})})
router.post('/logout', (req, res, next) =>{
    req.logout((err) =>{
        if (err) { 
            return next(err); 
        }
      res.redirect('/')
    }
    );
  });
module.exports = router