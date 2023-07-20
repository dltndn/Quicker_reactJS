import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import React, { useState, useRef } from "react";

const Ip = styled.input`
width: 100%;
height: 2.25rem;
font-size: var(--font-small);
border-radius: 0.313rem;
border: 1px solid #efefef; /* 테두리 */
outline: none; /* 포커스 시 발생하는 외곽선 제거 */
background-color: #efefef;
padding-left: 0.625rem;
padding-right: 0.625rem;
text-align: left;
color: #a6a6a6;
&:focus {
    border-color: #efefef; /* 포커스 시 테두리 색상 변경 */
    background-color: #ffffff;
}
`;

function Profilesetting() {
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
            <Ip>배영준</Ip>
        </Set_div_top>
        <Hr></Hr>
        <Set_div_mid>
                <span>생년월일</span>
                <Set_span>2001.02.13</Set_span>
        </Set_div_mid>
        <Hr></Hr>
        <Set_div_mid>
                <span>연락처</span>
                <Set_span>010-9086-9502</Set_span>
        </Set_div_mid>
        <Hr></Hr>
        <Set_div_bot>
                <span>이메일</span>
                <Set_span>dudwns0213@naver.com</Set_span>
        </Set_div_bot>
        <Set_div>
                <span>집 주소</span>
                <Set_span>경기도 김포시 김포대로 926번길 46<br/>309동 704호</Set_span>
        </Set_div>
        </>
    );
}


export default Profilesetting;


const Topdiv = styled.div`
  display: flex;
  padding: var(--padding);
  color: var(--black-color);
  justify-content: center;
`;

const Topimg = styled.img`
  margin: 10px;
  width: 8rem;
  height: 8rem;
  border-radius: 100%;
  background-color: #ffffff;
`;

const Hr = styled.hr`
  margin-left: auto;
  margin-right: auto;
  width: 95%;
  height: 0.063rem;
  border: 0;
  background: #efefef;
`;
const Set_div = styled.div`
  display: flex;
  flex-direction:column;
  font-size: 14px;
  font-weight: bold;
  margin: 0.563rem;
  padding: 14px;
  border-radius: 0.313rem;
  border: 0rem;
  background-color: var(--white-color);
`;

const Set_div_top = styled(Set_div)`
  display: flex;
  flex-direction:column;
  font-size: 14px;
  font-weight: bold;
  margin: 0 0.563rem;
  padding: 14px;
  border-radius: 0.313rem 0.313rem 0 0;
  border: 0rem;
  background-color: var(--white-color);
`;

const Set_div_mid = styled(Set_div)`
    border-radius: 0;
    margin: 0 0.563rem;
`;

const Set_div_bot = styled(Set_div)`
  border-radius: 0px 0px 0.313rem 0.313rem;
  margin: 0 0.563rem;
  margin-bottom: 0.375rem;
`;

const Set_span = styled.div`
    margin-top: 8px;
    font-size: 12px;
    font-weight: normal;
`;

