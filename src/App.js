import logo from "./logo.svg";
import "./App.css";
import { io } from "socket.io-client";
import { useEffect } from "react";

function App() {
  const socket = io.connect("http://localhost:3001");
  const sendMessage = (err) => {
    if (err) {
      alert(err);
    } else {
      socket.emit("message", { message: "hi" });
      console.log("성공");
    }
  };

  return (
    <div className="App">
      <h1>피아노 페이지입니다</h1>
      <button
        onClick={() => {
          sendMessage();
        }}
      >
        서버 연결 확인
      </button>
    </div>
  );
}

export default App;
