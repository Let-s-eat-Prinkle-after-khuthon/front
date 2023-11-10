const express = require("express");
const http = require("http");
const app = express();
const socketIo = require("socket.io");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    method: ["GET", "POST"],
  },
});

app.use(cors());
server.listen(PORT, () => {
  console.log(`서버가 ${PORT}에서 시작됐어요`);
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
}); // 연결확인
