import React, { useState, useRef, ReactDOM } from 'react';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import { BsAt } from "react-icons/bs";
import { useAccount } from 'wagmi';

const Maintx = styled.div`
  background-color: #efefef;
  min-height: 21.25rem;
  display: grid;
  justify-content:space-around;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
`;
  const Sc0 = styled.section`
  padding: var(--padding) var(--padding) calc(var(--padding) / 2) var(--padding);
  display: flex;
  justify-content: center; 
`;
  const Divtx = styled.div`
  padding: 0 calc(var(--padding) / 2) 0 calc(var(--padding) / 2);
  flex: 1 1 25%;
  align-items: center;
  margin-top: 0.563rem;
`;
  const Div0 = styled.div`
  padding: 0 calc(var(--padding) / 2) 0 calc(var(--padding) / 2);
  flex: 1 1 80%;
`;
  const Div1 = styled.div`
  padding: 0 calc(var(--padding) / 2) 0 calc(var(--padding) / 2);
  flex: 1 1 20%;
`;
const Sp = styled.div`
  font-size: var(--font-small);
  font-weight: bold;
`;
  const Bt = styled.button`
    width: 100%;
    height: 2.25rem;
    font-size: var(--font-small);
    border-radius: 0.313rem;
    border: 0rem;
    outline: #efefef;
    background-color: #0D6EFD;
    text-align: center;
    color: var(--white-color);
`;

  const Dt = styled.input`
  position: relative;
  /* Remove clear button and spinner */
  &::-webkit-clear-button,
  &::-webkit-inner-spin-button {
  display: none;
  }
  /* Style the calendar icon */
  &::-webkit-calendar-picker-indicator {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  color: transparent;
  cursor: pointer;
  }
`;
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



const Ic = styled.div`
  padding-top: 0.438rem;
`;
  const Em = styled.div`
  padding: 0 calc(var(--padding) / 2) 0 calc(var(--padding) / 2);
  flex: 1 1 38%;
`;
  const Wal = styled.div`
    padding: 0 calc(var(--padding) / 2) 0 calc(var(--padding) / 2);
    width: 100%;
`;


  const Btwal = styled.button`
    width: 100%;
    height: 2.25rem;
    font-size: var(--font-small);
    border-radius: 0.313rem;
    border: 0rem;
    outline: #efefef;
    background-color: #efefef;
    padding-left: 0.625rem;
    text-align: left;
    color: #a6a6a6;
`;

function Join_input({ refs }: props) {
  const [name, setName] = useState('');
  const [contact1, setContact1] = useState('');
  const [contact2, setContact2] = useState('');
  const { address } = useAccount();

  return (
    <>
      <section>
        <Maintx>
          환영합니다.
        </Maintx>
      </section>
      <Sc0>
        <Divtx>
          <Sp>이름
          </Sp>
        </Divtx>
        <Div0>
          <Ip ref={refs.name} type="text" placeholder="성함을 입력해주세요" ></Ip>
        </Div0>
      </Sc0>
      <Sc0>
        <Divtx>
          <Sp>
            생년월일
          </Sp>
        </Divtx>
        <Div0>
          <Ip ref={refs.birthday} type="date"></Ip>
        </Div0>
      </Sc0>
      <Sc0>
        <Divtx>
          <Sp>이메일</Sp>
        </Divtx>
        <Em>
          <Ip ref={refs.preEmail} type="text" placeholder="ex0"></Ip>
        </Em>
        <Ic><BsAt></BsAt></Ic>
        <Em>
          <Ip ref={refs.lastEmail} type="text" placeholder="gmail.com"></Ip>
        </Em>
      </Sc0>
      <Sc0>
        <Divtx>
          <Sp>연락처</Sp>
        </Divtx>
        <Div1>
          <Ip ref={refs.prePhoneNumber} type="number" placeholder="000"/>
        </Div1>
        <Div1>
          <Ip ref={refs.middlePhoneNumber} type="number" placeholder="0000"/>
        </Div1>
        <Div1>
          <Ip ref={refs.lastPhoneNumber} type="number" placeholder="0000"/>
        </Div1>
        <Div1>
          <Bt>인증</Bt>
        </Div1>
      </Sc0>
      <Sc0>
        <Divtx>
          <Sp>지갑 주소</Sp>
        </Divtx>
      </Sc0>
      <Sc0>
        <Wal>
          <Btwal>
            {address}
          </Btwal>
        </Wal>
      </Sc0>
    </>
  );
}

export default Join_input;

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
