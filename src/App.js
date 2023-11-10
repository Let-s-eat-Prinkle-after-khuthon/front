import "./App.css";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Show from "./component/Show";
<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Gaegu:wght@400;700&display=swap');
</style>;

function App() {
  //연결 확인 부분
  const socket = io.connect("http://localhost:3001");
  const [audio, setAudio] = useState(); //소켓에서 데이터 수신
  const animalImage = process.env.PUBLIC_URL + "/animal.png";

  const [click, setClick] = useState(0);
  const sendMessage = (err) => {
    if (err) {
      alert(err);
    } else {
      socket.emit("send_message", "hi");
      console.log("서버 연결 성공");
    }
  };

  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const musicPlay = () => {
    audioContext.resume().then(() => {
      console.log(audioContext.state);
    });
  };
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
    <Body click={click}>
      {!click ? (
        <Show click={click} setClick={setClick} musicPlay={musicPlay} />
      ) : (
        <Main click={click}>
          <button
            onClick={() => {
              sendMessage();
            }}
          >
            서버 연결 확인
          </button>
          <Logo src={animalImage} />
        </Main>
      )}
    </Body>
  );
}

export default App;

const lotation = keyframes`
100% {
  transform: rotate(360deg);
`;

const fade = keyframes`
  from {
    opacity: 0;
  }
  to{
    opacity:1;
  }
`;
const Body = styled.div`
  width: inherit;
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  ${(props) =>
    props.click && //primary 가 존재할 경우
    `
      background-image: url("https://media.istockphoto.com/id/479280419/ko/%EB%B2%A1%ED%84%B0/%EB%8B%A8%EA%B3%84-%EC%BB%A4%ED%8A%BC.jpg?s=612x612&w=0&k=20&c=x2RiyVJZjwlk26bMKpSHbbugjqhJjf8TZf8Blu8gR5U=");
      background-size: cover; 
    `}
  animation: ${fade} 3s;

  overflow: hidden;
`;

const Logo = styled.img`
  display: block;
  width: 300px;
  height: 300px;
  animation: ${lotation} 10s linear infinite;
  transform-origin: 50% 50%;
`;

const Main = styled.div``;

const Box = styled.div`
  border-radius: 40px;
  width: 70%;
  height: 80%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: rgb(102, 0, 0);
  animation: ;
`;
