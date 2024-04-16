const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 3000; // Use the provided PORT environment variable, or default to 3000
const users = {};

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('requestUsername');

  socket.on('setUsername', (username) => {
    users[socket.id] = username;
    io.emit('message', `${username} has joined the chat.`);
  });

  socket.on('disconnect', () => {
    if (users[socket.id]) {
      io.emit('message', `${users[socket.id]} has left the chat.`);
      delete users[socket.id];
    }
    console.log('User disconnected');
  });

  socket.on('message', (message) => {
    const username = users[socket.id] || 'Anonymous';
    io.emit('message', `${username}: ${message}`);
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
