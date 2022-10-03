const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { createTestData } = require('./seeder.js');

// const createMockData = false; // <--- cambiar a false para no sobreescribir la DB

// conn.sync({ force: createMockData })
conn.sync({ alter: true })
  .then(() => {

    server.listen(process.env.PORT, async () => {

      createMockData && await createTestData();

      console.log('--------------------------------');
      // console.log('creada el mockup de datos');
      console.log(`'server up (port: ${process.env.PORT})'`); // eslint-disable-line no-console
    });
  })

// comentario de modificacion para validar delpoy en Heroku desde la branch develop , VALIDADA.
// AHORA CADA PUSH EN LA BRANCH DEVELOP DESPLIEGA EN HEROKU
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
