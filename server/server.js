const path = require("path");
require("dotenv").config();
const express = require("express");
const app = express();
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");
const morgan = require("morgan");
app.use(cors());
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../", "client/dist")));

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT"],
  },
});
const rooms = [];
io.on("connection", (socket) => {
  socket.emit("shareAllRooms", rooms);

  socket.on("addRoom", (room) => {
    rooms.push(room)
    io.emit("shareRoom", room);
  });

  socket.on("joinRoom", (room) => {
    if (!io.sockets.adapter.rooms.get(room)) {
      socket.join(room);
      console.log(io.sockets.adapter.rooms.get(room));
      socket.emit("assignPlayer", { player: "p1" });
    } else if (io.sockets.adapter.rooms.get(room).size < 2) {
      socket.join(room);
      console.log(io.sockets.adapter.rooms.get(room));
      socket.emit("assignPlayer", { player: "p2" });
      if (io.sockets.adapter.rooms.get(room).size === 2) {
        const roomIndex = rooms.indexOf(room);
        if (roomIndex !== -1) {
          rooms.splice(roomIndex, 1);
          io.emit("removeRoom", room);
        }
      }
    }
  });

  socket.on("shareNewTurn", (turn, room) => {
    io.to(room).emit("updatedTurn", turn);
  });
  socket.on("submitBoard", (board, room) => {
    io.to(room).emit("completedBoard", board);
  });
  socket.on("shareBoardAndTurn", (board, turn, room) => {
    socket.broadcast.to(room).emit("receiveBoardAndTurn", board, turn);
  });
  socket.on("gameCreated", (data) => {
    socket.broadcast.to(room).emit("gameExists", data);
  });
  socket.on("sendMessage", (playerMessage, room) => {
    io.to(room).emit("receivedMessage", playerMessage);
  });
});

// app.use("/", require("./routes/index.js"));
app.use("/auth", require("./routes/auth"));
app.use("/api/game", require("./routes/game"));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../", "client/dist/index.html"));
});

server.listen(PORT, () => {
  console.log("server running on " + PORT);
});
