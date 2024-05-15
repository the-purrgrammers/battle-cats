const express = require("express");
const app = express();
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");
app.use(cors());
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("sendMessage", (data) => {
    data = data + " from the server";
    io.emit("receiveMessage", data);
  });
});

server.listen(PORT, () => {
  console.log("server running on " + PORT);
});
