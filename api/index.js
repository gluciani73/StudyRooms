const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { createTestData } = require('./seeder.js')

conn.sync({ force: true })
  .then(() => {
    server.listen(process.env.PORT, async () => {
      await createTestData()
      console.log('--------------------------------');
      console.log('creada el mockup de datos');
      console.log(`'server up (port:${process.env.PORT})'`); // eslint-disable-line no-console
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