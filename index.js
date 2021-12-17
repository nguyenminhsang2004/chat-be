const express = require('express')
const { Server } = require('socket.io')
const http = require('http')
const cors = require('cors')
require('dotenv').config()

const app = express()
const server = http.createServer(app)
app.use(cors())
app.use(express.json())

const routers = require(__dirname + '/routers')
app.use(routers)

server.listen(process.env.PORT || 5000, () => {
  console.log('Server on PORT 5000...')
})

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`)

  socket.on('join_room', (data) => {
    socket.join(data)
    console.log(`User with ID: ${socket.id} joined room: ${data}`)
  })

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data)
  })

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id)
  })
})
