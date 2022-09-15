const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const axios = require('axios')

function createTestUsers(){
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
}


conn.sync({ force: true })
  .then(() => {
    server.listen(3001, () => {

      createTestUsers()

      console.log('server up (localhost:3001)'); // eslint-disable-line no-console
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