const server = require('./src/app.js');

server.listen(3001, () => {
    console.log('server up (localhost:3001)');
});