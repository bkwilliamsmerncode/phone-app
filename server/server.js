require('dotenv').config()

const express = require('express');
const app = express();
const http = require('http')
const {Server} = require('socket.io');
const mongoose = require('mongoose')
const cors = require('cors')


const MessagesController = require("./controllers/messages.controller")
const socketControllers = require('./socket/socketControllers')


const corsOptions ={
    origin:'http://localhost:3000', 
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(express.json( {limit: '50mb'}), express.urlencoded({extended: true}))

require('./config/mongoose.config')

const Routes = require('./routes/users.routes');
const MsgRoutes = require("./routes/messages.routes")

Routes(app)
MsgRoutes(app)

app.use(cors());

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", 
        methods: ["GET", "POST"]
    }
})

io.on('connection', (socket)=>{
      socket.on('join_room', (data)=>{
        console.log(`JOINING ROOM`, data)
          socket.join(data.room)
          console.log(socket.adapter.rooms)
      })
  
      socket.on('send_message', (data)=>{
        console.log(`${data.author} send a message in room ${data.room}`)
        MessagesController.saveMsg(data)
        io.in(data.room).emit('recieve_message', data)
        socketControllers.createMessage(data, socket, io)
      })
  })


server.listen(process.env.PORT, () => {
    console.log('Locked N Loaded - server is running on port:' + process.env.PORT)
})
