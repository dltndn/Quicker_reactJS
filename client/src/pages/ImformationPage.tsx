import TopBarOthers from "../components/topBarOthers";
import Imfo from "../components/orderComponents/imfo";
import BottomBar from "../components/BottomBar";
import styled, { createGlobalStyle } from 'styled-components';
import React from "react";
import { useNavigate } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #e6e6e6 !important;
    height: 100%;
  }
`;

function ImformationPage() {
  const navigate = useNavigate()
  return (
      <>
        <GlobalStyle />
        <TopBarOthers title="프로필" redirectLogic={function (){navigate("/")} }></TopBarOthers>
        <Imfo/>
        <BottomBar/>
      </>
  );
}
  
  export default ImformationPage;
