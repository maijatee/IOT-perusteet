const websocket = require('ws');

const server = new websocket.Server({ port: 8080 });

server.on('connection', socket => {
  console.log('client connected');

  socket.on('message' , message => {
    console.log('received: ' + message.toString());
    socket.send('echo: ${message}'); 

    });
     socket.on('close', () => {
        console.log('client disconnected');
    });

});