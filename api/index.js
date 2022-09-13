const server = require('./src/app.js');
const { conn } = require('./src/db.js');
conn.sync({ force: false })
  .then(() => {
    server.listen(3001, () => {
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