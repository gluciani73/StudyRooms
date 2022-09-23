const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const passport = require('passport')
const OAuth2Strategy = require('passport-google-oauth2')
const session = require('express-session');

const cors = require("cors")
const server = express();

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(morgan('dev'));
server.use(cors({origin: '*'}))

server.use(session({
  secret: 'sessionSecret!',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
}));
server.use(passport.initialize())
server.use(passport.session())
passport.serializeUser( (user,cb)=> cb(null,user))
passport.deserializeUser( (user,cb)=> cb(null,user))

const CLIENT_ID = '924880684322-sm1pdikriuvgdqf3b57vsi8omr88kp3b.apps.googleusercontent.com'
const CLIENT_SECRET = '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'

passport.use(new OAuth2Strategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: "http://localhost:3001/users/google/login/callback",
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
function(accessToken, refreshToken, profile, done) {
  const user = {
    id: profile.id,
    firstName: profile.given_name,
    lastName: profile.family_name,
    avatar: profile.photos[0].value,
    email: profile.email
  }
  return done(null,user)
}
));

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
