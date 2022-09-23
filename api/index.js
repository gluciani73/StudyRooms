const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { createTestData } = require('./seeder.js')
// const dotenv = require('dotenv')
// dotenv.config();
console.log('entro a index.js')
conn.sync({ force: true })
  .then(() => {
    console.log('entro en sync.then')
    server.listen(process.env.PORT, async () => {
      console.log('entro en server.listen')
      await createTestData()
      console.log('termino el createTestData')
      console.log('--------------------------------');
      console.log('creada el mockup de datos');
      console.log(`'server up (port: ${process.env.PORT})'`); // eslint-disable-line no-console
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