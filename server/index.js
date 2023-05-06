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
    origin: "https://johnnam1121.github.io/chat-app/",
    methods: ["GET", "POST"],
  },
});

app.get('/', (req, res) => {
  res.send('Johns server is running properly')
})

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});


// Create a map to store active users for each room
const activeUsersMap = new Map();

io.on("connection", (socket) => {
  console.log(`+ ${socket.id} has connected`);

  socket.on("JoinedRoom", (data) => {
    socket.join(data.room);
    console.log(`${data.name} with ID: ${socket.id} joined room: ${data.room}`);

    socket.to(data.room).emit('newConnection', (data));

    // Add the user to the active users list for the room
    let activeUsers = activeUsersMap.get(data.room) || [];
    activeUsers.push({ socketId: socket.id, name: data.name });
    activeUsersMap.set(data.room, activeUsers);

    // Emit the updated active users list to all clients in the room
    io.to(data.room).emit("updateActiveUsers", activeUsers);
  });

  socket.on("newMessage", (newMessage) => {
    socket.to(newMessage.room).emit("displayMessage", newMessage);
  });

  socket.on("disconnect", () => {
    console.log(`- ${socket.id} has disconnected`);

    // Remove the user from the active users list for the room
    let room = '';
    let disconnectedUsername = '';

    activeUsersMap.forEach((activeUsers, key) => {
      const index = activeUsers.findIndex((user) => user.socketId === socket.id);
      if (index !== -1) {
        room = key;
        // Get the username of the disconnected user
        disconnectedUsername = activeUsers[index].name;
        activeUsers.splice(index, 1);
      }
    });

    // Emit the updated active users list to all clients in the room
    if (room) {
      io.to(room).emit("updateActiveUsers", activeUsersMap.get(room));
      // Emit userDisconnected event with the username
      io.to(room).emit("userDisconnected", disconnectedUsername);
    }
  });
});
