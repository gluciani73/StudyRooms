const { Router } = require('express');
const router = Router();

const passport = require('passport')
const jwt = require('jsonwebtoken')

const {AUTH_SECRET, FRONT_URL} = require('../CONSTANTS.js')

router.get('/login', passport.authenticate('google', {session:false, scope: ['profile', 'email']}))

router.get('/login/callback',
    passport.authenticate('google', {
        failureRedirect: '/',
        session:false
    }),
    (req,res)=> {
        const token = jwt.sign(req.user, AUTH_SECRET,{expiresIn:'1d'})
        res.redirect(FRONT_URL+"/auth/"+token)
    })

module.exports = router;