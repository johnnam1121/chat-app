const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());
const PORT = 3001;


const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`+ ${socket.id} has connected`);

  socket.on("JoinedRoom", (data) => {
    socket.join(data.room);
    console.log(`${data.name} with ID: ${socket.id} joined room: ${data.room}`);
  });

  socket.on("newMessage", (newMessage) => {
    console.log(newMessage.name, newMessage.room)
    socket.to(newMessage.room).emit('displayMessage', newMessage);
  });

  socket.on("disconnect", () => {
    console.log(`- ${socket.id} has disconnected`);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});