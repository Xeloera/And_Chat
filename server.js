const io = require('socket.io')(3000)

const users = {}
const title = {}

io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name
    console.log(name)
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('new-title', atitle => {
    title[socket.id] = atitle
    console.log('title',atitle)
    socket.broadcast.emit('new-title-added', atitle)
  })
  socket.on('send-chat-message', message => {
    console.log(message)
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id]})
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })

})