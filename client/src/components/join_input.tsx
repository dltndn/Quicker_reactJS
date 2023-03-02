<<<<<<< HEAD
import React, {useState, useRef, ReactDOM} from 'react';
import {Icon} from 'semantic-ui-react';
import styles from "../css/join_input.module.css"

interface refs {
    name: React.RefObject<HTMLInputElement>, 
    birthday : React.RefObject<HTMLInputElement>
    email : React.RefObject<HTMLInputElement>
    prePhoneNumber : React.RefObject<HTMLInputElement>
    middlePhoneNumber : React.RefObject<HTMLInputElement>
    lastPhoneNumber: React.RefObject<HTMLInputElement>
}

interface props {
    refs : refs
}
    // name : String | null,
    // birthday : String | null,
    // email : String | null,
    // prePhoneNumber : String | null,
    // middlePhoneNumber : String | null,
    // lastPhoneNumber : String | null
    // name, birthday, email, prePhoneNumber, middlePhoneNumber, lastPhoneNumber
function Join_input({refs} : props){
    // useref로 지정 
    // 온클릭 이벤트 설정
    // setData 반영

    // const name = useRef<HTMLInputElement>(null);
    // const birthday = useRef<HTMLInputElement>(null);
    // const email = useRef<HTMLInputElement>(null);
    // const prePhoneNumber = useRef<HTMLInputElement>(null);
    // const middlePhoneNumber = useRef<HTMLInputElement>(null);
    // const lastPhoneNumber = useRef<HTMLInputElement>(null);
    // const [data , setData] = useState<sendObject>({
    //     name : null,
    //     birthday : null,
    //     email : null,
    //     prePhoneNumber : null,
    //     middlePhoneNumber : null,
    //     lastPhoneNumber : null
    // })

    // const onClick = () => { 
    //     let registerData = {
    //         name : name.current!.value,
    //         birthday : birthday.current!.value,
    //         email : email.current!.value,
    //         prePhoneNumber : prePhoneNumber.current!.value,
    //         middlePhoneNumber : middlePhoneNumber.current!.value,
    //         lastPhoneNumber : lastPhoneNumber.current!.value
    //     }
    //     setData(registerData)
    // }

    return(
        <>
        <section className={styles.ipsect0}>
            <div className={styles.ipdiv1}>
                <span className={styles.ipspan}>
                    이름
                </span>
            </div>
            <div className={styles.ipdiv2}>
                <input ref={refs.name} type="text" className={styles.ipval} placeholder="성함을 입력해주세요"/>
            </div>
        </section>

        <section className={styles.ipsect}>
            <div className={styles.ipdiv1}>
                <span className={styles.ipspan}>
                    생년월일
                </span>
            </div>
            <div className={styles.ipbth}>
                <input ref={refs.birthday} type="date" className={styles.ipdate} placeholder="0000"/>
            </div>
        </section>

        <section className={styles.ipsect}>
            <div className={styles.ipdiv1}>
                <span className={styles.ipspan}>
                    이메일 주소
                </span>
            </div>
            <div className={styles.ipem0}>
                <input ref={refs.email}  type="text" className={styles.ipval} placeholder="ex0"/>
            </div>
            <div className={styles.ipic}>
                <Icon name='at' />
            </div>
            <div className={styles.ipem1}>
                <input type="number" className={styles.ipval} placeholder="gmail.com"/>
            </div>
        </section>

        <section className={styles.ipsect}>
            <div className={styles.ipdiv1}>
                <span className={styles.ipspan}>
                    연락처
                </span>
            </div>
            <div className={styles.ipnum0}>
                <input ref={refs.prePhoneNumber} type="number" className={styles.ipval} placeholder="0000"/>
            </div>
            <div className={styles.ipnum1}>
                <input ref={refs.middlePhoneNumber} type="number" className={styles.ipval} placeholder="0000"/>
            </div>
            <div className={styles.ipnum2}>
                <input ref={refs.lastPhoneNumber} type="number" className={styles.ipval} placeholder="0000"/>
            </div>
            <div className={styles.ipnum0}>
                <button className={styles.ipbutton}>
                    인증
                </button>
            </div>
        </section>
=======
import { useState } from 'react';
import styled from 'styled-components';
import {BsAt} from "react-icons/bs";
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
const Sp = styled.span`
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
    border: 0rem;
    outline: #efefef;
    background-color: #efefef;
    padding-left: 0.625rem;
    text-align: left;
    color: #a6a6a6;
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
function Join_input() {
  const [name, setName] = useState('');
  const [contact1, setContact1] = useState('');
  const [contact2, setContact2] = useState('');
  const { address } = useAccount();
>>>>>>> 2d57e6927eb693b987bd534e18a0cb4d832df661

  return(
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
          <Ip type="text" placeholder="성함을 입력해주세요" ></Ip>
        </Div0>
      </Sc0>
      <Sc0>
        <Divtx>
          <Sp>
            생년월일
          </Sp>
        </Divtx>
        <Div0>
          <Ip type="date"></Ip>
        </Div0>
      </Sc0>
      <Sc0>
        <Divtx>
          <Sp>이메일</Sp>
        </Divtx>
        <Em>
          <Ip type="text" placeholder="ex0"></Ip>
        </Em>
        <Ic><BsAt></BsAt></Ic>
        <Em>
          <Ip type="text" placeholder="gmail.com"></Ip>
        </Em>
      </Sc0>
      <Sc0>
        <Divtx>
          <Sp>연락처</Sp>
        </Divtx>
        <Div1>
          <Ip type="text" placeholder="000"/>
        </Div1>
        <Div1>
          <Ip type="text" placeholder="0000"/>
        </Div1>
        <Div1>
          <Ip type="text" placeholder="0000"/>
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