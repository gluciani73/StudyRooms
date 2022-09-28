const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const passport = require('passport')
const googleAuthMiddleware = require('./middlewares/googleAuth.js')
const {jwtAuthMiddleware} = require('./middlewares/jwtAuthMiddleware.js') 

const cors = require("cors")
const server = express();

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));

server.use(cors({origin: '*'}))
server.use(morgan('combined'));

server.use(passport.initialize())

passport.use(jwtAuthMiddleware)
passport.use(googleAuthMiddleware);

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

