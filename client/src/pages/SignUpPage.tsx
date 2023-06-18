import React, { useState, useRef, ReactDOM } from 'react';
import Join_input from "../components/join_input";
import ConfirmBtn from "../components/confirmBtn";
import TopBarOthers from "../components/topBarOthers";
import BottomBar from "../components/BottomBar";
import { useNavigate } from "react-router-dom";
import { useAccount } from 'wagmi';
import { useVerificationStore } from '../App';

const serverUrl = process.env.REACT_APP_SERVER_URL

function SignUpPage() {
  const navigate = useNavigate()
  const { address } = useAccount()
  const { setIsMember } = useVerificationStore()

  const name = useRef<HTMLInputElement>(null);
  const birthday = useRef<HTMLInputElement>(null);
  const preEmail = useRef<HTMLInputElement>(null);
  const lastEmail = useRef<HTMLInputElement>(null);
  const prePhoneNumber = useRef<HTMLInputElement>(null);
  const middlePhoneNumber = useRef<HTMLInputElement>(null);
  const lastPhoneNumber = useRef<HTMLInputElement>(null);
 
  const onClick = () => {
    
    
    let registerData = {
      User :{
        id: "",
        wallet_address : address,
        name: name.current!.value,
        email: preEmail.current!.value + lastEmail.current!.value,
        contact: prePhoneNumber.current!.value + middlePhoneNumber.current!.value + lastPhoneNumber.current!.value,
        manager: 0
      },
      Birthday :{
        id : "",
        year: parseInt(birthday.current!.value.substring(0, 4)),
        month: parseInt(birthday.current!.value.substring(5, 7)),
        date: parseInt(birthday.current!.value.substring(8, 10))
      }
    }
    fetch(`${serverUrl}register`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      setIsMember(true)
    })
    .catch((error) => {
      console.error("Error:", error);
    });
    navigate("/")
  }

  return (
    <div className="App">
      <TopBarOthers title="회원가입" redirectLogic={function () {
        navigate("/")
      }} />
      <Join_input refs={{ name, birthday, preEmail, lastEmail, prePhoneNumber, middlePhoneNumber, lastPhoneNumber }}></Join_input>
      <ConfirmBtn isDisabled={false} content="확인" confirmLogic={() => {
        onClick()
        }} />
      <BottomBar></BottomBar>
    </div>
  );
}

export default SignUpPage;
