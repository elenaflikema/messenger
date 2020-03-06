const socket = io('http://localhost:3000');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');
const messageContainer = document.getElementById('message-container');

const userName = prompt('What is your name?');
appendMessage('You joined');

socket.emit('add-new-user', userName);

socket.on('chat-message', data => {
    appendMessage(`${data.userName}: ${data.message}`);
});

socket.on('user-connected-message', userName => {
    appendMessage(`${userName} joined`);
});

socket.on('user-disconnected', userName => {
    appendMessage(`${userName} left`);
});

messageForm.addEventListener('submit', e => {
   e.preventDefault();
   const message = messageInput.value;
   appendMessage(`You: ${message}`);
   socket.emit('send-chat-message', message);
   messageInput.value = '';
});


function appendMessage(message) {
    const newMessageElement = document.createElement('div');
    newMessageElement.innerText = message;
    messageContainer.append(newMessageElement);
}