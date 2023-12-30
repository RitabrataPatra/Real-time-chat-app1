const express = require('express');//currently working at 12:25pm on 30 December 2023
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');


//keep in mind:
//server delivery and client delivery is not done yet
//will need an sql file for that

const app = express();
const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {}
  });

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
    });
  });

  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});

