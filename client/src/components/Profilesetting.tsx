import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import React, { useState, useRef } from "react";
import { BsAt } from "react-icons/bs";
import { ProfilesettingStyle } from "../StyleCollection";

const {Div1, Set_div, Set_div_bot, Set_div_mid, Set_div_top, Set_span, Ic, Ip, Ip1, Ip2, 
Topdiv, Topimg, Hr, Em} = new ProfilesettingStyle()

function Profilesetting({ refs }: props) {
    const navigate = useNavigate();
    const [profilePhoto, setProfilePhoto] = useState<null | string>("https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png" // 트위터 기본 이미지 URL
    ); // 타입 수정
    const fileInputRef = useRef<HTMLInputElement>(null);
  
    const handleChangeProfilePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      const reader = new FileReader();
  
      reader.onload = () => {
        const result = reader.result as string;
        setProfilePhoto(result);
      };
  
      if (file) {
        reader.readAsDataURL(file);
      }
    };
  
  return (
    <>
      <Topdiv>
        <label>
          <Topimg
            src={profilePhoto ? profilePhoto : ""}
            alt="Profile"
          />
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleChangeProfilePhoto}
          />
        </label>
      </Topdiv>
        <Set_div_top>
            <span>이름</span>
            <Ip ref={refs.name} placeholder="이름"></Ip>
        </Set_div_top>
        <Hr></Hr> 
        <Set_div_mid>
                <span>생년월일</span>
                <Ip ref={refs.birthday} type="date"></Ip>
        </Set_div_mid>
        <Hr></Hr>
        <Set_div_mid>
                <span>연락처</span>
                <Div1>
                  <Ip1 ref={refs.prePhoneNumber} type="number" placeholder="000"/>
                  <Ip1 ref={refs.middlePhoneNumber} type="number" placeholder="0000"/>
                  <Ip1 ref={refs.lastPhoneNumber} type="number" placeholder="0000"/>
                </Div1>
        </Set_div_mid>
        <Hr></Hr>
        <Set_div_bot>
                <span>이메일</span>
                <Em>
                  <Ip2 ref={refs.preEmail} type="text" placeholder="ex0"></Ip2>
                <Ic><BsAt></BsAt></Ic>
                  <Ip2 ref={refs.lastEmail} type="text" placeholder="gmail.com"></Ip2>
                </Em>
        </Set_div_bot>
        <Set_div>
                <span>집 주소</span>
                <Set_span>경기도 김포시 김포대로 926번길 46<br/>309동 704호</Set_span>
        </Set_div>
        </>
    );
}


export default Profilesetting;

interface refs {
  name: React.RefObject<HTMLInputElement>,
  birthday: React.RefObject<HTMLInputElement>
  preEmail: React.RefObject<HTMLInputElement>
  lastEmail: React.RefObject<HTMLInputElement>
  prePhoneNumber: React.RefObject<HTMLInputElement>
  middlePhoneNumber: React.RefObject<HTMLInputElement>
  lastPhoneNumber: React.RefObject<HTMLInputElement>
}

interface props {
  refs: refs
}
