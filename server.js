const io = require('socket.io')(3000);
const user = {};

io.on('connection', socket => {
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', { message: message, userName: user[socket.id]});
    });
    socket.on('add-new-user', userName => {
        user[socket.id] = userName;
        socket.broadcast.emit('user-connected-message', userName);
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', user[socket.id]);
        delete user[socket.id];
    })
});