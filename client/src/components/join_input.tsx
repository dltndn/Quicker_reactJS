import React, { useState, useRef, ReactDOM } from 'react';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import { BsAt } from "react-icons/bs";
import { useConnWalletInfo } from '../App';
import { Join_inputStyle } from "../StyleCollection";

const {Div0, Div1, Divhid, Divtx, Maintx, Sc0, Sp, Ic, Ip,Em, Bt, Wal, Btwal} = new Join_inputStyle()


function Join_input({ refs }: props) {
  const [name, setName] = useState('');
  const [contact1, setContact1] = useState('');
  const [contact2, setContact2] = useState('');
  const { address } = useConnWalletInfo();

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
      <Divhid/>
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
