
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from 'styled-components';
import Profilesetting from "../components/Profilesetting";
import TopBarThin from "../components/topBarthin";
import React, { useState, useRef, ReactDOM } from 'react';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #efefef !important;
    height: 100%;
  }
`;

function Profile_settingPage() {
    const navigate = useNavigate()

    const name = useRef<HTMLInputElement>(null);
    const birthday = useRef<HTMLInputElement>(null);
    const preEmail = useRef<HTMLInputElement>(null);
    const lastEmail = useRef<HTMLInputElement>(null);
    const prePhoneNumber = useRef<HTMLInputElement>(null);
    const middlePhoneNumber = useRef<HTMLInputElement>(null);
    const lastPhoneNumber = useRef<HTMLInputElement>(null);
    
    return (
      <>
        <GlobalStyle />
        <TopBarThin title=" 내정보" title2="" redirectLogic={function (){navigate("/profile")} }/>
        <Profilesetting refs={{ name, birthday, preEmail, lastEmail, prePhoneNumber, middlePhoneNumber, lastPhoneNumber }}/>

      </>
    );
  }
  
  export default Profile_settingPage;