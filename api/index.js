const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { createTestData } = require('./seeder.js')

conn.sync({ force: true })
  .then(() => {
    server.listen(3001, async () => {
      await createTestData()
      console.log('--------------------------------');
      console.log('creada el mockup de datos');
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