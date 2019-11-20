const io = require('socket.io')(3000)

// user who is online now
const users = {}

io.on('connection', socket => {
    socket.on('new-user', name => {
        users[socket.id] = name
        socket.broadcast.emit('user-connected', { users: users, name: name })
    })
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message',
            { message: message, name: users[socket.id] });
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[sockets.id]
    })
    socket.on('typing-message', function (data) {
        socket.broadcast.emit('user-is-typing', data)
    })
})  