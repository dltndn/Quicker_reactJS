import TopBarThin from './topBarthin';
import styled, { createGlobalStyle } from 'styled-components';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  BsPencilSquare, BsChevronRight} from "react-icons/bs";
import { NoticeStyle } from "../StyleCollection";

const {Div0, Div1, Div1_2, Div1_3, Se0, Ic} = new NoticeStyle()



const GlobalStyle = createGlobalStyle`
  body {
    background-color: #efefef !important;
    height: 100%;
  }
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

