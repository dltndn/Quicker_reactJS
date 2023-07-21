import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import React, { useState, useRef } from "react";
import { BsAt } from "react-icons/bs";

const Ip = styled.input`
height: 2.25rem;
font-size: var(--font-small);
border-radius: 0.313rem;
border: 1px solid #efefef; /* 테두리 */
outline: none; /* 포커스 시 발생하는 외곽선 제거 */
background-color: #efefef;
padding-left: 0.625rem;
padding-right: 0.625rem;
margin-top:6px;
text-align: left;
color: #a6a6a6;
&:focus {
    border-color: #efefef; /* 포커스 시 테두리 색상 변경 */
    background-color: #ffffff;
}
`;

const Ip1 = styled.input`
width: 110px;
height: 2.25rem;
font-size: var(--font-small);
border-radius: 0.313rem;
border: 1px solid #efefef; /* 테두리 */
outline: none; /* 포커스 시 발생하는 외곽선 제거 */
background-color: #efefef;
padding-left: 0.625rem;
padding-right: 0.625rem;
margin-top:6px;
text-align: center;
color: #a6a6a6;
&:focus {
    border-color: #efefef; /* 포커스 시 테두리 색상 변경 */
    background-color: #ffffff;
}
`;

const Ip2 = styled.input`
width: 110px;
height: 2.25rem;
font-size: var(--font-small);
border-radius: 0.313rem;
border: 1px solid #efefef; /* 테두리 */
outline: none; /* 포커스 시 발생하는 외곽선 제거 */
background-color: #efefef;
padding-left: 0.625rem;
padding-right: 0.625rem;
margin-top:6px;
text-align: center;
color: #a6a6a6;
&:focus {
    border-color: #efefef; /* 포커스 시 테두리 색상 변경 */
    background-color: #ffffff;
}
`;

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

const Div1 = styled.div`
margin-top: 10px;
display: flex;
justify-content: space-between;
`;

const Em = styled.div`
margin-top: 10px;
display: flex;
justify-content: space-between;
`;

const Ic = styled.div`
  font-size: 20px;
  margin-top: 10px;
`;