const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors: {origin: 'http://localhost:5173'}})
const PORT = 3001
const Message = require('./models/Message.js');
const Ticket = require('./models/Ticket.js');


const mongoose = require('mongoose');
try{
    mongoose.connect('mongodb://127.0.0.1:27017/web-zap');
}catch(error){
    console.log(error)
}
console.log('DB connected');

const message_data = [];

io.on('connection', socket => {
    console.log('User conectado!', socket.id)

    socket.on('disconect', reason => {
        console.log('User desconectado!', socket.id)
    })

    socket.on('set_username', username => {
        socket.data.username = username
        console.log(socket.data.username)
    })

    socket.on('message', text => {
        const message = Message.create({
            name: socket.data.username,
            message: text
        });
        message_data.push(message);
        io.emit('reveive_message', {
            text,
            authorId: socket.id,
            author: socket.data.username
        })
    })

    socket.on('ticket', reason => {
        console.log(message_data)
        const ticket = Ticket.create({
            messages: message_data
        });
        
        io.emit('ticket_view', {
            ticket
        })
    })
})

server.listen(PORT, () => console.log('Server running...'))