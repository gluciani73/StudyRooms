const {ExtractJwt, Strategy} = require('passport-jwt')
const { User } = require('../db.js')

const {AUTH_SECRET} = require('../CONSTANTS.js')

const jwtAuthMiddleware = new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: AUTH_SECRET
}, (payload, done)=>{
    const user = User.findOne({where:{email:payload.email}})
    if(user) return done(null, user)
    else return done(null, false)
})

module.exports = {jwtAuthMiddleware}