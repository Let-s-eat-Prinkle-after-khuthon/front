import styled, { keyframes } from "styled-components";
import { useState } from "react";
<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Gaegu:wght@400;700&display=swap');
</style>;

export default function Show({ click, setClick, musicPlay }) {
  const [show, setShow] = useState(0);
  return (
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
          musicPlay();
        }}
      >
        Let's go!
      </Start>
    </Title>
  );
}

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
