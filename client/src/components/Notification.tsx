import TopBarThin from './topBarthin';
import styled, { createGlobalStyle } from 'styled-components';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsChatLeftDots, BsTelephone, BsStickies } from "react-icons/bs";

import { HiPaperAirplane } from "react-icons/hi2";

const Chatdot = require('../image/Chatdot.png')
const Chatman = require('../image/Chatman.png')

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #efefef !important;
    height: 100%;
  }
`;
/* 
const SelectInput = styled.select`
  width: 6rem;
  height: 1.625rem;
  font-size: 0.75rem;
  border-radius: 0.5rem;
  border: 0;
  outline: #efefef;
  background-color: #d9d9d9;
  text-align: center;
  color: #000000;
  margin: 0.625rem 0.625rem 0 0.625rem;
  font-weight: bold;
  font-size: var(--font-small);
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

const Div1_1 = styled.div`
  font-size: 18px;
  padding: 12px 6px 6px 0px;
  font-weight: thin;
`;

const Div1_2 = styled.div`
  font-size: 12px;
  padding: 4px 6px 4px 0px;
  font-weight: bold;
`;

const Div1_3 = styled.div`
  font-size: 10px;
  padding: 4px 0px 4px 0px;
  font-weight: thin;
`;
*/

function Notification() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("");

  const handleSelectChange = (e: any) => {
    setSelectedType(e.target.value);
  };

  return (
    <>
      {/* <GlobalStyle />
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
      </Se0> */}
      <TopBarThin
        title="알림"
        title2=""
        redirectLogic={() => {
          navigate("/");
        }}
      />
      <Div0><Div1>김포시 김포대로 926번길 46 <Div2><BsTelephone/> 010-9086-9502 <BsStickies/></Div2></Div1>
      <div><Img1 src={Chatdot}></Img1></div>
      <Div1>김포시 김포대로 926번길 46 <Div2><BsTelephone/> 010-9086-9502 <BsStickies/></Div2></Div1></Div0>
      <Div3><Img2 src={Chatman}></Img2> <DivChat><span>대화내용 1</span></DivChat> <Divclock>오전 00:00</Divclock></Div3>
      <Divdate>0000년 00월 00일</Divdate>
      <Div4><Divclock>오전 00:00</Divclock><DivChat2><span>대화내용 1</span></DivChat2></Div4>
			<Sc0><div><Ip1>메세지 보내기</Ip1></div><HiPaperAirplane/></Sc0>
    </>
  );
}

export default Notification;

const Div0 = styled.div`
	margin: 0px 10px 5px 10px;
	border-style: solid;
  border-color: #efefef;
  border-width: 0.5px 0px 0.5px 0px;
`

const Div1 = styled.div`
  display: flex;
  padding: 10px 10px 10px 10px;
  flex-direction:column;
  font-size: 14px;
  font-weight: bold;
`

const Div2 = styled.div`
  font-size: 12px;
  font-weight: thin;
  color: #646464;
`

const Img1 = styled.img`
  width: 4px;
  margin: -5px 0px -5px 90px;

`

const Img2 = styled.img`
  width: 33px;
	height: 33px;
`

const Div3 = styled.div`
  display: flex;
	margin: 10px 10px 10px 15px;
`
const DivChat = styled.div`
	background-color: #f8f8f8;
	border-radius: 20px;
	justify-content: center;
  align-items: center;
  display: flex;
	margin: 0px 5px 0px 10px;
	padding: 8px;
`
const Divclock = styled.div`
	display: flex;
	align-items: flex-end;
	font-size: 8px;
	font-weight: thin;
	color: #adadad;
`

const Divdate = styled.div`
	width: 100%;
	margin: 10px 0 10px 0;
	display: flex;
	justify-content: center;
	font-size: 8px;
	font-weight: thin;
	color: #adadad;
`
const Div4 = styled(Div3)`
	justify-content: flex-end;
`

const DivChat2 = styled(DivChat)`
	background-color: #79AFFF;
	color:#ffffff;
`

const Sc0 = styled.section`
    position: fixed;
    display: flex;
    bottom: 0;
    width: 100%;
    height: 3.875rem;
    background-color: var(--white-color); 
    align-items: center;
    justify-content: center;
    text-align:center;
`;

const Ip1 = styled.input`
	border-radius: 20px;
	background-color: #e6e6e6;
	outline: none;
	height: auto;
	color: #A0A0A0;
`