import { BsChevronRight } from "react-icons/bs";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { Web3Button } from "@web3modal/react";

const Div0 = styled.div`
  padding-top: var(--padding);
  padding-bottom: var(--padding);
`;
const Sp0 = styled.span`
  margin-top: var(--padding);
  padding: var(--padding);
  font-size: var(--font-md);
  font-weight: bold;
`;
const Sp1 = styled.span`
  padding-left: var(--padding);
  padding-bottom: var(--padding);
  font-size: var(--font-md);
  font-weight: bold;
`;
const Bt0 = styled.button`
  border: none;
  box-shadow: none;
  outline: none;
  background-color: var(--white-color);
  font-size: var(--font-small);
  margin-left: 0.313rem;
`;

type isConnectToWallet = {
  isConnect: boolean;
};

function Main_phrase({ isConnect }: isConnectToWallet) {
  const navigate = useNavigate();
  const [isMember, setIsMember] = useState<boolean>(false);
  let userName = "member";

  return (
    <>
      {isConnect ? (
        isMember ? (
          <section>
            <Div0>
              <Sp0>{userName}님!<br/></Sp0>
              <Sp1>현재 배송원이 물건을 배송중입니다.</Sp1>
              <Bt0 onClick={() => {
                    navigate("/");
                  }}>
                    <BsChevronRight />
                  </Bt0>
            </Div0>
          </section>
        ) : (
          <section>
            <Div0>
              <Sp0>안녕하세요!<br/></Sp0>
              <Sp1>회원가입을 진행해주세요.</Sp1>
              <Bt0 onClick={() => {
                    navigate("/signUp");
                  }}
                >
                  <BsChevronRight />
                </Bt0>
            </Div0>
          </section>
        )
      ) : (
        <section>
        <Div0>
          <Sp0>안녕하세요!<br/></Sp0>
          <Sp1>지갑을 연결해주세요.</Sp1>
              <Web3Button icon="hide" label="지갑연결" balance="hide" />
        </Div0>
        </section>
      )}
    </>
  );
}

export default Main_phrase;
