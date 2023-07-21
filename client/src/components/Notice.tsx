import TopBarThin from './topBarthin';
import styled, { createGlobalStyle } from 'styled-components';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsChatLeftDots, BsPencilSquare, BsChevronLeft, BsChevronRight, BsStickies, BsTelephone } from "react-icons/bs";
import { HiPaperAirplane } from 'react-icons/hi2';



const GlobalStyle = createGlobalStyle`
  body {
    background-color: #efefef !important;
    height: 100%;
  }
`;

const Se0 = styled.div`
  display: flex;
  background-color: #FFFFFF;
  margin: 0.625rem;
  border-radius: 5px;
  align-items: center;
`;

const Div0 = styled.div`
  flex: 1 1 5%;
  text-align: center;
  font-size: 10px;
`;

const Div1 = styled.div`
  flex: 1 1 80%;
  justify-content: center;
  margin: 10px;
`;


const Div1_2 = styled.div`
  font-size: 16px;
  padding:12px 6px 6px 0px;
  font-weight: bold;
`;

const Div1_3 = styled.div`
  font-size: 10px;
  padding: 4px 0px 4px 0px;
  font-weight: thin;
`;


function Notice() {
  const navigate = useNavigate();


  return (
    <>
      <GlobalStyle />
      <Se0>
          <Div1>
            <Div1_2>
              공지사항 예시 1
            </Div1_2>
            <Div1_3>2023.05.01</Div1_3>
          </Div1>
          <Div0 onClick={() => navigate('/profile/notice/1')}>
            <BsChevronRight  />
          </Div0>
      </Se0>
      <Se0>
        <Div1>
            <Div1_2>
              공지사항 예시 2
            </Div1_2>
            <Div1_3>2023.05.01</Div1_3>
          </Div1>
          <Div0 onClick={() => navigate('/profile/notice/2')}>
            <BsChevronRight />
          </Div0>
      </Se0>
      
      <Ic onClick={() => navigate('/profile/notice/write')}>
      <BsPencilSquare></BsPencilSquare>
      </Ic>
    </>
  );
}

export default Notice;

const Ic = styled.div`
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 20px;
  box-shadow: 0px 4px 2px #bebebe;
`