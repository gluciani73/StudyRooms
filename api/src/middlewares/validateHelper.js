const {validationResult} = require('express-validator')

const validateResult = (req,res,next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (error) {
        res.status(403).json({data:null, error: `${error.array()[0].msg} in ${error.array()[0].param}`})
    }
}

module.exports = { validateResult }