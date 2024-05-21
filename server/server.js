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
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../", "client/dist/index.html"));
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT"],
  },
});

io.on("connection", (socket) => {
  socket.on("joinRoom", (data) => {
    if (!io.sockets.adapter.rooms.get("gameRoom")) {
      socket.join(data);
      socket.emit("assignPlayer", { player: "p1" });
    } else if (io.sockets.adapter.rooms.get("gameRoom").size < 2) {
      socket.join(data);
      socket.emit("assignPlayer", { player: "p2" });
    }
  });
  socket.on("shareNewTurn", (data) => {
    socket.broadcast.to("gameRoom").emit("updatedTurn", data);
  });
});

// app.use("/", require("./routes/index.js"));
app.use("/auth", require("./auth"));
app.use("/api/game", require("./game"));

server.listen(PORT, () => {
  console.log("server running on " + PORT);
});
