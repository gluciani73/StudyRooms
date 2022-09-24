const OAuth2Strategy = require('passport-google-oauth2')
const { User } = require('../db.js')
const { CLIENT_ID, CLIENT_SECRET } = require('../CONSTANTS.js')

const mockURL = process.env.DB_LOCALHOST3001 || "https://studyrooms-deploy.herokuapp.com"

const googleAuthMiddleware = new OAuth2Strategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: mockURL+"/users/google/login/callback",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  async function(accessToken, refreshToken, profile, done) {
    const userFound = await User.findOne({ where: { email: profile.email } })
    if(!userFound){
      const createdUser = await User.create({
        userName: profile.email.split("@")[0],
        authType: "google",
        firstName: profile.given_name,
        lastName: profile.family_name,
        email: profile.email,
        avatar: profile.photos[0].value,
        isAdmin: false,
        isPremium: false,
        active: true,
      })
      const dataToSend = {
        id: createdUser.id,
        userName: createdUser.userName,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        email: createdUser.email,
        avatar: createdUser.avatar,
        active: createdUser.active
      }
      console.log(dataToSend);
      return done(null,dataToSend)
    }
    else{
      const dataToSend = {
        id: userFound.id,
        userName: userFound.userName,
        firstName: userFound.firstName,
        lastName: userFound.lastName,
        email: userFound.email,
        avatar: userFound.avatar,
        active: userFound.active
      }
      console.log(dataToSend);
      return done(null, dataToSend)
    }
  }
  )

  module.exports = googleAuthMiddleware