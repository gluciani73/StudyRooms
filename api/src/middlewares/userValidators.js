const {check} = require('express-validator')
const { validateResult } = require('./validateHelper.js')

const userCreateValidator = [
    check('userName')
    .exists()
    .not().isEmpty()
    .isLength({min:1, max:10}),

    check('password')
    .exists()
    .not().isEmpty()
    .isLength({min:3, max:16}), // este cambiarlo mas adelante por algo mas estricto ;)
    
    check('firstName')
    .exists()
    .not().isEmpty()
    .isLength({min:3, max:15}),  
    
    check('lastName')
    .exists()
    .not().isEmpty()
    .isLength({min:3, max:15}),

    check('email')
    .exists()
    .not().isEmpty()
    .isEmail(),

    (req,res,next) => {
        validateResult(req,res,next)
    }
]

const userLoginValidator = [
    check('userName')
    .exists()
    .not().isEmpty(),

    check('password')
    .exists()
    .not().isEmpty()
    .isLength({min:3, max:16}),

    (req,res,next) => {
        validateResult(req,res,next)
    }
]

module.exports = { userCreateValidator, userLoginValidator }