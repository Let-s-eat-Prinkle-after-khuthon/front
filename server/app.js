const express = require("express");
const app = express();
const PORT = 3000;
const http = require("http");
const cors = require("cors");
const socketIo = require("socket.io");
const bodyParser = require("body-parser");
const server = http.createServer(app);
const io = socketIo(server);
const path = require("path");
const fs = require("fs");
const instRoutes = require("./server.js");

app.use(cors());
app.use(express.static(path.join(__dirname, "../client/chaenreact/build")));
app.use("/inst", instRoutes); //'/inst' 경로에 대한 요청은 instRoutes 파일로 라우팅
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("io", io);

io.on("connection", (socket) => {
  console.log("User connected");

  //클라이언트에서 'note'이벤트를 받았을 때 처리하는 코드
  socket.on("note", (data) => {
    console.log("클라이언트로부터 note 이벤트를 받았습니다: ", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../client/chaenreact/build", "index.html")
  );
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
