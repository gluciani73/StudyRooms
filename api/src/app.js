const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const passport = require('passport')
const OAuth2Strategy = require('passport-google-oauth2')

const cors = require("cors")
const server = express();

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(morgan('dev'));
server.use(cors({origin: '*', credentials: true}))

const CLIENT_ID = '374729590488-tfhid7q5qv8snscaounusdtvmtet8utp.apps.googleusercontent.com'
const CLIENT_SECRET = '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'

passport.serializeUser( (user,cb)=> cb(null,user))
passport.deserializeUser( (user,cb)=> cb(null,user))

passport.use(new OAuth2Strategy({
  authorizationURL: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenURL: 'https://oauth2.googleapis.com/token',
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: "http://localhost:3001/users/google/login/callback"
},
function(accessToken, refreshToken, profile, cb) {
  /* User.findOrCreate({ exampleId: profile.id }, function (err, user) {
    return cb(err, user);
  }); */
  console.log(JSON.stringify(profile));
  return cb(null,profile)
}
));
passport.initialize()

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes);

// esto evita q se caiga todo si hay un error en nuestros controllers
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(message);
  res.status(status).json({ msg: message });
});

module.exports = server;
