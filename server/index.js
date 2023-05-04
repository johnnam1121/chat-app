const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

// does the port matter?? Been having problems with multiple connections
const PORT = 3001;

const server = http.createServer(app);

// add cors to accept requests from localhost:3000
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// when io socket is connected from client
io.on("connection", (socket) => {
  console.log(`+ ${socket.id} has connected`);

  // when user joins room with name and room
  socket.on("JoinedRoom", (data) => {
    socket.join(data.room);
    //console.log(`${data.name} with ID: ${socket.id} joined room: ${data.room}`);
  });

  // when newMessage is emitted
  socket.on("newMessage", (newMessage) => {
    //console.log(newMessage.name, newMessage.room)
    socket.to(newMessage.room).emit('displayMessage', newMessage);
  });

  socket.on("disconnect", () => {
    console.log(`- ${socket.id} has disconnected`);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});