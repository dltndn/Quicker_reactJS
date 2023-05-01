import TopBarThin from './topBarthin';
import styled, { createGlobalStyle } from 'styled-components';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsChatLeftDots } from "react-icons/bs";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #efefef !important;
    height: 100%;
  }
`;

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

function Notification() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("");

  const handleSelectChange = (e: any) => {
    setSelectedType(e.target.value);
  };

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
