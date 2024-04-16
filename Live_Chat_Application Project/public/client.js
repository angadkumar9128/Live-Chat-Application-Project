const socket = io();

let username;

socket.on('requestUsername', () => {
  username = prompt('Please enter your username: ');
  socket.emit('setUsername', username);
});

const messages = document.getElementById('messages');
const inputMessage = document.getElementById('inputMessage');
const sendMessage = document.getElementById('sendMessage');

sendMessage.addEventListener('click', () => {
  const message = inputMessage.value.trim();
  if (message !== '') {
    socket.emit('message', message);
    inputMessage.value = '';
  }
});

socket.on('message', (data) => {
  const li = document.createElement('li');
  li.textContent = data;
  messages.appendChild(li);
});
