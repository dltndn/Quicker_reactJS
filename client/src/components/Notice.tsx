import TopBarThin from './topBarthin';
import styled, { createGlobalStyle } from 'styled-components';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsChatLeftDots, BsChevronLeft, BsChevronRight } from "react-icons/bs";

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
  flex: 1 1 15%;
  text-align: center;
  font-size: 25px;
`;

const Div1 = styled.div`
  flex: 1 1 80%;
  justify-content: center;
`;


const Div1_2 = styled.div`
  font-size: 12px;
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
      <TopBarThin
        title="공지사항"
        title2=""
        redirectLogic={() => {
          navigate("/");
        }}
      />
      <Se0>
          <Div1>
            <Div1_2>
              공지사항 예시 1
            </Div1_2>
            <Div1_3>2023.05.01</Div1_3>
          </Div1>
          <Div0>
            <BsChevronRight />
          </Div0>
      </Se0>
      <Se0>
        <Div1>
            <Div1_2>
              공지사항 예시 2
            </Div1_2>
            <Div1_3>2023.05.01</Div1_3>
          </Div1>
          <Div0>
            <BsChevronRight />
          </Div0>
      </Se0>
    </>
  );
}

export default Notice;
