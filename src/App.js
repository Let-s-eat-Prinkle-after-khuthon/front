import "./App.css";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Show from "./component/Show";
import { AiFillCaretLeft, AiFillCaretRight, AiFillSound } from "react-icons/ai";
import { BiSolidMusic, BsMusicNoteBeamed } from "react-icons/bs";
import { GiMusicalNotes } from "react-icons/gi";

function App() {
  //연결 확인 부분
  const socket = io.connect("http://localhost:3001");
  const [instType, setInstType] = useState(); //소켓에서 데이터 수신
  const [sym, setSym] = useState(true);
  const [cats, setCats] = useState(false);
  const [click, setClick] = useState(0); //화면 전환
  const sendMessage = (err) => {
    //서버 연결 확인
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

  socket.on("inst", (data) => {
    setInstType(data);
  }); //악기 종류 받아오기

  useEffect(() => {
    console.log(instType);
    if (instType == "sym") setSym(true);
    else if (instType == "cats") setCats(true);
    return () => {
      setInstType("");
      setSym(false);
      setCats(false);
    };
  }, [instType]);

  console.log(sym);
  return (
    <Body click={click}>
      {!click ? (
        <Show click={click} setClick={setClick} musicPlay={musicPlay} />
      ) : (
        <Main click={click}>
          <Box>
            <Tab>
              PLAY MUSIC
              <TabButton>
                <AiFillCaretRight />
              </TabButton>
              <TabButton>
                <AiFillSound />
              </TabButton>
              <TabButton>
                <AiFillCaretLeft />
              </TabButton>
            </Tab>
            <Screen>
              <StopChi src={process.env.PUBLIC_URL + "/chicken.png"}></StopChi>
              <StopCat src={process.env.PUBLIC_URL + "/cat.png"}></StopCat>
              <StopDog src={process.env.PUBLIC_URL + "/dog.png"}></StopDog>
              <StopDonk src={process.env.PUBLIC_URL + "/donkey.png"}></StopDonk>
            </Screen>
          </Box>
          {sym && console.log("sym true")}
          {cats && <img src={process.env.PUBLIC_URL + "/animal.jpg"}></img>}
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
const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to{
    opacity:0;
  }
`;

const bright = keyframes`
from{
  background-color: black;
}
to{
  background-color: white;
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
      background-color: #18a8f1;
    `}
  animation: ${fade} 2s;
  overflow: hidden;
`;

const Logo = styled.img`
  display: block;
  width: 30px;
  height: 30px;
  animation: ${lotation} 10s linear infinite;
  transform-origin: 50% 50%;
`;

const Main = styled.div`
  animation: ${bright} 3s;
  transition: all 3s;
`;

const Box = styled.div`
  background-color: #ffabe4;
  border: solid 8px #3819a0;
  min-width: 90vw;
  min-height: 80vh;
  overflow: hidden;
  border-radius: 4px;
`;
const Tab = styled.div`
  background-color: #3819a0;
  min-width: 85vw;
  min-height: 8vh;
  diplay: flex;
  justify-content: space-between;
  margin: 1%;
  color: white;
  line-height: 46px;
  align-items: center;
  overflow: hidden;
  font-size: 35px;
  padding-left: 20px;
  border-radius: 4px;
`;
const Screen = styled.div`
  border: solid 5px #3819a0;
  background-color: white;
  min-width: 85vw;
  min-height: 70vh;
  border-radius: 4px;
  margin: 1.5%;
  display: flex;
  justify-content: space-evenly;
`;

const TabButton = styled.div`
  width: 30px;
  overflow: hidden;
  max-height: 5vh;
  margin: 0.5%;
  text-align: center;
  font-weight: 800;
  color: #3819a0;
  font-size: 20px;
  background-color: white;
  float: right;
  border-radius: 4px;
`;

const move = keyframes`
0% {
  -webkit-transform: scale(1);
          transform: scale(1);
}
50% {
  -webkit-transform: scale(1.1);
          transform: scale(1.1);
}
100% {
  -webkit-transform: scale(1);
          transform: scale(1);
}
}
@keyframes pulsate-fwd {
0% {
  -webkit-transform: scale(1);
          transform: scale(1);
}
50% {
  -webkit-transform: scale(1.1);
          transform: scale(1.1);
}
100% {
  -webkit-transform: scale(1);
          transform: scale(1);
}
`;

const Music = styled.button`
  min-width: 30px;
  min-height: 30px;
  background-color: black;
  &:hover {
    animation: ${move} 10s linear infinite;
  }
`;

const StopCat = styled.img`
  width: 15vw;
  height: 35vh;
  animation: ${move} 1s infinite both;
  margin: auto;
  padding-bottom: 20px;
`;
const StopChi = styled.img`
  width: 15vw;
  height: 35vh;
  transform: translateY(120px);
  animation: ${move} 1.3s infinite both;
  margin: auto;
  padding-top: 20px;
`;
const StopDog = styled.img`
  width: 15vw;
  height: 35vh;
  transform: translate(0px, 40px);
  animation: ${move} 1.3s infinite both;
  margin: auto;
  padding-bottom: 20px;
`;
const StopDonk = styled.img`
  width: 15vw;
  height: 35vh;
  transform: translate(0px, 120px);
  animation: ${move} 1s infinite both;
  margin: auto;
  padding-top: 20px;
`;
