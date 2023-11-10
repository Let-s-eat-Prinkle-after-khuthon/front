import logo from "./logo.svg";
import "./App.css";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

function App() {
  //연결 확인 부분
  const socket = io.connect("http://localhost:3001");
  const [audio, setAudio] = useState(); //소켓에서 데이터 수신
  const sendMessage = (err) => {
    if (err) {
      alert(err);
    } else {
      socket.emit("send_message", "hi");
      console.log("서버 연결 성공");
    }
  };

  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  useEffect(() => {
    socket.on("audio", (data) => {
      const binaryData = atob(data);
      const arrayBuffer = new ArrayBuffer(binaryData.length);
      const byteArray = new Uint8Array(arrayBuffer);
      for (let i = 0; i < binaryData.length; i++) {
        byteArray[i] = binaryData.charCodeAt(i);
      }
      audioContext.decodeAudioData(arrayBuffer, function (buffer) {
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start(0);
      });
    });
  }, []);

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
      <button
        onClick={() => {
          audioContext.resume().then(() => {
            console.log(audioContext.state);
          });
        }}
      >
        합주시작
      </button>
    </div>
  );
}

export default App;
