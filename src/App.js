import "./App.css";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Gaegu:wght@400;700&display=swap');
</style>;

function App() {
  //연결 확인 부분
  const socket = io.connect("http://localhost:3001");
  const [audio, setAudio] = useState(); //소켓에서 데이터 수신
  const animalImage = process.env.PUBLIC_URL + "/animal.png";
  const [show, setShow] = useState(0);
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
    <Body show={show}>
      <Show click={click}>
        <Title
          show={show}
          onMouseOver={() => {
            setShow(1);
            console.log(show);
          }}
          onMouseOut={() => {
            setShow(0);
            console.log(show);
          }}
        >
          PLAY TOGETHER!
          <Start
            show={show}
            click={click}
            onClick={() => {
              setClick(1);
              console.log(click);
            }}
          >
            Let's go!
          </Start>
        </Title>
      </Show>

      <Main click={click}>
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
        <Logo src={animalImage} />
      </Main>
    </Body>
  );
}

export default App;

const fade = keyframes`
  from {
    opacity: 0;
  }
  to{
    opacity:1;
  }
`;

const bigger = keyframes`
  from {
    font-size: 70px;
  }
  to{
    font-size: 500px;
  }
`;

const Body = styled.div`
  width: inherit;
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;

  animation: ${fade} 3s;

  overflow: hidden;
`;

const typing = keyframes`
  from{
    width: 0
  }
`;

const blink = keyframes`
  50% {
    border-color: transparent
  }
`;

const Title = styled.h1`
  font-family: "Gaegu", sans-serif;
  margin-right: 20px;
  text-align: center;
  font-size: 70px;
  color: white;
  width: 22ch;
  animation: ${fade} 4s, ${typing} 3s steps(22),
    ${blink} 0.5s step-end infinite alternate;
  white-space: nowrap;
  overflow: hidden;
  border-right: 3px solid;
  transition: all 3s;
  &:hover {
    transform: translateY(-50px);
    color: black;
    animation: ${fade} 3s, ${typing} 3s steps(22);
  }
`;

const lotation = keyframes`
100% {
  transform: rotate(360deg);
`;

const Logo = styled.img`
  display: block;
  width: 300px;
  height: 300px;
  animation: ${lotation} 10s linear infinite;
  transform-origin: 50% 50%;
`;

const Start = styled.button`
  width: inherit;
  align-items: center;
  border: none;
  background-color: inherit;
  color: white;
  font-family: "Gaegu", sans-serif;
  font-size: 90px;
  display: ${(props) => (props.show ? "block" : "none")};
  animation: ${fade} 3s;
  font-weight: 800;
  cursor: pointer;
`;

const Main = styled.div`
  ${(props) =>
    !props.click && //primary 가 존재할 경우
    `
  display:none;
  background-color: white;
`}
`;

const Show = styled.div`
  ${(props) =>
    props.click && //primary 가 존재할 경우
    `
display:none;
`}
`;

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
