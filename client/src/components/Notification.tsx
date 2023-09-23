import TopBarThin from './topBarthin';
import styled, { createGlobalStyle } from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsChatLeftDots, BsTelephone, BsStickies } from "react-icons/bs";
import Done from "../Lottie/Done.json";
import Lottie from 'lottie-react';
import Modal from 'react-modal';
import { NotificationStyle } from "../StyleCollection";

const {Div0, Div1, Div1_1, Div1_2, Div1_3, Se0 ,SelectInput} = new NotificationStyle()


const Chatdot = require('../image/Chatdot.png')
const Chatman = require('../image/Chatman.png')

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #efefef !important;
    height: 100%;
  }
`;


function Notification() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("");

  const handleSelectChange = (e: any) => {
    setSelectedType(e.target.value);
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => setModalIsOpen(false), 2000);
  }, []);
  return (
    <>
 <GlobalStyle />
       <TopBarThin
        title="알림"
        title2=""
        redirectLogic={() => {
          navigate("/");
        }}
      />
      <SelectInput name="type" onChange={handleSelectChange}>
        <option value="">전체</option>
        <option value="aa">예시1</option>
        <option value="bb">예시2</option>
      </SelectInput>
      <Se0>
        {selectedType === "" || selectedType === "aa" ? (
          <Div0>
            <BsChatLeftDots />
          </Div0>
        ) : null}
        {selectedType === "" || selectedType === "aa" ? (
          <Div1>
            <Div1_1>예시1</Div1_1>
            <Div1_2>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse faucibus semper euismod. Pellentesque interdum quis
              purus in faucibus. Nullam porttitor mi
            </Div1_2>
            <Div1_3>3월 20일</Div1_3>
          </Div1>
        ) : null}
      </Se0>
      <Se0>
        {selectedType === "" || selectedType === "bb" ? (
          <Div0>
            <BsChatLeftDots />
          </Div0>
        ) : null}
        {selectedType === "" || selectedType === "bb" ? (
          <Div1>
            <Div1_1>예시2</Div1_1>
            <Div1_2>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse faucibus semper euismod. Pellentesque interdum quis
              purus in faucibus. Nullam porttitor mi
            </Div1_2>
            <Div1_3>3월 20일</Div1_3>
          </Div1>
        ) : null}
      </Se0> 


    </>
  );
}

export default Notification;

const Divdone = styled.div`
  display: flex;
  justify-content: center; 
  text-align: center;
  width: 300px;
  height: 300px;
`