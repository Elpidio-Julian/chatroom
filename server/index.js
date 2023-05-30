const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require("path")

app.use(express.static(path.join(__dirname, "..", "build")))
app.use(express.static("public"))

// app.get('/', (req, res) => {
//     res.send('<h1>Hello world</h1>');
//   });

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
      console.log(`message: ${msg}`)
      io.emit('chat message', msg);
    });
  });

server.listen(3000, () => {
    console.log('listening on *:3000');
  });