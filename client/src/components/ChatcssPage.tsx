import TopBarThin from './topBarthin';
import styled, { createGlobalStyle } from 'styled-components';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsChatLeftDots, BsChevronLeft, BsChevronRight, BsStickies, BsTelephone } from "react-icons/bs";
import { HiPaperAirplane } from 'react-icons/hi2';
import TopBarChat from './topBarChat';

const Chatdot = require("../image/Chatdot.png");
const Chatman = require("../image/Chatman.png");


function ChatcssPage() {
  const navigate = useNavigate();
  return (
    <>
      <TopBarChat
        title="상대방이름"
        redirectLogic={() => {
          navigate("/");
        }}
      ></TopBarChat>
      <Div0>
        <Div1>
        김포시 김포대로 926번길 46
          <Div2>
            <BsTelephone /> 010-9086-9502 <BsStickies />
          </Div2>
        </Div1>
        <div>
          <Img1 src={Chatdot}></Img1>
        </div>
        <Div1>
        김포시 김포대로 926번길 46
          <Div2>
            <BsTelephone /> 010-9086-9502 <BsStickies />
          </Div2>
        </Div1>
      </Div0>
      <form>
      <Sc0>     
            <Divinput>
              <Ip1 placeholder="메세지 보내기"></Ip1>
            </Divinput>
            <Bt1 type="submit">
              <HiPaperAirplane />
            </Bt1>
        </Sc0>
        </form>
        
    </>
  );
}

export default ChatcssPage;


const Div0 = styled.div`
  margin: 0px 10px 5px 10px;
  border-style: solid;
  border-color: #efefef;
  border-width: 0.5px 0px 0.5px 0px;
`;

const Div1 = styled.div`
  display: flex;
  padding: 10px 10px 10px 10px;
  flex-direction: column;
  font-size: 16px;
  font-weight: bold;
`;

const Div2 = styled.div`
  font-size: 12px;
  font-weight: thin;
  color: #646464;
  margin: 5px 0 5px 0;
`;

const Img1 = styled.img`
  width: 4px;
  margin: -5px 0px -5px 90px;
`;

const Img2 = styled.img`
  width: 33px;
  height: 33px;
`;

const Div3 = styled.div`
  display: flex;
  margin: 10px 10px 10px 15px;
`;
const DivChat = styled.div`
  background-color: #f8f8f8;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  display: flex;
  margin: 0px 5px 0px 10px;
  padding: 8px;
`;
const Divclock = styled.div`
  display: flex;
  align-items: flex-end;
  font-size: 8px;
  font-weight: thin;
  color: #adadad;
`;

const Divdate = styled.div`
  width: 100%;
  margin: 10px 0 10px 0;
  display: flex;
  justify-content: center;
  font-size: 8px;
  font-weight: thin;
  color: #adadad;
`;
const Div4 = styled(Div3)`
  justify-content: flex-end;
`;

const DivChat2 = styled(DivChat)`
  background-color: #79afff;
  color: #ffffff;
`;

const Sc0 = styled.section`
  position: fixed;
  display: flex;
  bottom: 0;
  width: 100%;
  height: 3.875rem;
  background-color: var(--white-color);
  align-items: center;
  justify-content: space-around;
  text-align: center;
`;

const Ip1 = styled.input`
  border-radius: 20px;
  border: none;
  width: 90%;
  background-color: #e6e6e6;
  outline: none;
  height: 100%;
  color: #a0a0a0;
  padding-left: 15px;
`;

const Bt1 = styled.button`
  border: none;
  background-color: #ffffff;
  width: 30px;
  font-size: 20px;
  margin: 5px 10px 0 0 ;
`

const Divinput = styled.div`
  width: 85%;
  height: 30px;
`
