const path = require("path");
require("dotenv").config()
const express = require("express");
const app = express();
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");
const morgan = require('morgan')
app.use(cors());
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../", 'client/dist')));

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT"],
  },
});

//establish a connection
io.on("connection", (socket) => {
  // specify the room the user belongs to
  socket.on("joinRoom", (data) => {
    socket.join(data);
  });

  //listen for incoming messages and room numbers {message, room}
  socket.on("sendMessage", (data) => {
    //respond ONLY to users in the same room
    socket.to(data.room).emit("receiveMessage", data.message);
  });
});


app.use('/', require('./routes/index.js'))
server.listen(PORT, () => {
  console.log("server running on " + PORT);
});
