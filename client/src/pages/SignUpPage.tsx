import React, { useState, useRef, ReactDOM } from 'react';
import Join_ani from "../components/join_ani";
import Join_input from "../components/join_input";
import ConfirmBtn from "../components/confirmBtn";
import TopBarOthers from "../components/topBarOthers";
import BottomBar from "../components/BottomBar";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const navigate = useNavigate()

  const name = useRef<HTMLInputElement>(null);
  const birthday = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const prePhoneNumber = useRef<HTMLInputElement>(null);
  const middlePhoneNumber = useRef<HTMLInputElement>(null);
  const lastPhoneNumber = useRef<HTMLInputElement>(null);
 
  const onClick = () => {
    let registerData = {
      name: name.current!.value,
      birthday: birthday.current!.value,
      email: email.current!.value,
      prePhoneNumber: prePhoneNumber.current!.value,
      middlePhoneNumber: middlePhoneNumber.current!.value,
      lastPhoneNumber: lastPhoneNumber.current!.value
    }
    fetch("http://localhost:9000/register", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
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
      <Join_ani></Join_ani>
      <Join_input refs={{ name, birthday, email, prePhoneNumber, middlePhoneNumber, lastPhoneNumber }}></Join_input>
      <ConfirmBtn content="확인" confirmLogic={() => {
        onClick()
        }} />
      <BottomBar></BottomBar>
    </div>
  );
}

export default SignUpPage;