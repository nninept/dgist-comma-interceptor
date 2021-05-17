const express = require('express');
const cors = require('cors')
const PORT = process.env.PORT ? process.env.PORT : 5000
const app = express()

const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
let curv = 0

app.use(express.static('statics'))
app.use(express.urlencoded({extended: false}))
app.use(cors())


app.get('/', (req, res, next) => res.sendFile(__dirname + '/statics/html/index.html'))



io.on("connection", (socket) => {

  console.log("connected")
  socket.on("set-curv", (data) => {
    curv = data
    console.log(curv)
  });

  socket.on("send-car-data", (data)=>{
    console.log(data)
    socket.emit("send-curv", curv)
  })
});

process.once('SIGUSR2', function () {
    process.kill(process.pid, 'SIGUSR2');
  });

  process.on('SIGINT', function () {
    // this is only called on ctrl+c, not restart
    process.kill(process.pid, 'SIGINT');
  });

server.listen(PORT)
