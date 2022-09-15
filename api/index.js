const server = require('./src/app.js');
const { conn, Category } = require('./src/db.js');
const axios = require('axios')
const sequelize = require('sequelize')

function createTestData() {
  axios.post('http://localhost:3001/users/signup', {
    userName: "testUser",
    firstName: "test",
    lastName: "user",
    email: "test@test.com",
    password: "1234",
    avatar: "test string",
  })
  axios.post('http://localhost:3001/users/signup', {
    userName: "testUser2",
    firstName: "test2",
    lastName: "user",
    email: "test2@test.com",
    password: "1234",
    avatar: "test string",
  })
  axios.post('http://localhost:3001/users/signup', {
    userName: "testUser3",
    firstName: "test3",
    lastName: "user",
    email: "test3@test.com",
    password: "1234",
    avatar: "test string",
  })

  const categ = [
    'Matematicas',
    'Historia',
    'Geografia',
    'Quimica',
    'Biologia',
    'Economia',
    'Programacion',
    'Filosofia',
    'Lenguas'
  ]

  categ.forEach(c => {
    Category.create({ category: c })
  })

}


conn.sync({ force: true })
  .then(() => {
    server.listen(3001, () => {
      console.log('server up (localhost:3001)'); // eslint-disable-line no-console
      createTestData()

    });
  })


/*     ..---..
     .'  _    `.
 __..'  (o)    :    LES DEJO UN PATO
`..__          ;
     `.       /
       ;      `..---...___
     .'                   `~-. .-')
    .                         ' _.'
   :                           :
   \                           '
    +                         J
     `._                   _.'
        `~--....___...---~' */