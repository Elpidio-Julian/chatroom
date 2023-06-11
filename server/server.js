const http = require('http');
const express = require('express');
const app = require("./app"); // uses middleware from app file and exports the express() app.
const server = http.createServer(app);

const PORT = process.env["PORT"] ?? 3000


//socket io necessities
const { Server } = require("socket.io");
const io = new Server(server);

// set up for hosting react build files with react
const path = require("path")
app.use(express.static(path.join(__dirname, "..", "build")))
app.use(express.static("public"))

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
      console.log(`message: ${msg}`)
      io.emit('chat message', msg);
    });
  });



app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
  });




  server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
  });