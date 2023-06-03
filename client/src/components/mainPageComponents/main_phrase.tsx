import { BsChevronRight } from "react-icons/bs";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Web3Button } from "@web3modal/react";
import { useVerificationStore } from "../../App";
import { useAccount } from "wagmi";
import { SendDataToAndroid } from "../../utils/SendDataToAndroid";
import { checkIsDelivering } from "../../utils/ExecuteOrderFromBlockchain";
import MainOrderInformation from "./MainOrderInformation";

const Div0 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Div1 = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Sp0 = styled.div`
  padding: var(--padding) var(--padding) 0 var(--padding);
  font-size: var(--font-md);
  font-weight: bold;
`;

const Sp1 = styled.span`
  padding-top: var(--padding);
  padding-left: var(--padding);
  padding-bottom: var(--padding);
  font-size: var(--font-md);
  font-weight: bold;
`;

const Sp2 = styled.span`
  padding-right: var(--padding);
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
  const { isMember } = useVerificationStore();
  const { address } = useAccount();

  const sdta = new SendDataToAndroid(address);
  const testVal: boolean = true;

  const testFunc = () => {
    const timeId = setInterval(() => {
      sdta.sendIsMatchedOrder(true)
    }, 3000)
  }
  return (
    <>
      {isConnect ? (
        isMember ? (
          <>
            
            <section>
              <MainOrderInformation />
            </section>
            <button onClick={() => navigate("/execution/205")}>
                    임시배송페이지이동버튼
                  </button>
                  <button onClick={() => navigate("/client_confirm/10")}>
                    임시의뢰인확인페이지이동버튼
                  </button>
                  <button
                    onClick={() =>
                      (window.location.href = `quicker://link?walletAddress=${address?.toString()}`)
                    }
                  >
                    지갑주소앱으로전송
                  </button>
                  <button onClick={() => sdta.sendIsDelivering(true)}>
                    배송여부true전송
                  </button>
                  <button onClick={() => sdta.sendIsDelivering(false)}>
                    배송여부false전송
                  </button>
          </>
        ) : (
          <>
            <section>
              <Div0>
                <Sp0
                  onClick={() => {
                    navigate("/signUp");
                  }}
                >
                  안녕하세요!
                  <br />
                </Sp0>
              </Div0>
              <Div1>
                <Sp1
                  onClick={() => {
                    navigate("/signUp");
                  }}
                >
                  회원가입을 진행해주세요. {">"}
                </Sp1>
              </Div1>
            </section>
            <section>
              <>회원가입 애니메이션</>
            </section>
          </>
        )
      ) : (
        <>
          <section>
            <Div0>
              <button onClick={() => navigate("/explorer")}>
                실시간 거래현황 보러가기
              </button>
              <button onClick={() => testFunc()}>임시 배송시작 알림 전송 버튼</button>
              <Sp0>
                안녕하세요!
                <br />
              </Sp0>
            </Div0>
            <Div1>
              <Sp1>지갑을 연결해주세요.</Sp1>
              <Sp2>
                <Web3Button icon="hide" label="지갑연결" balance="hide" />
              </Sp2>
            </Div1>
          </section>
          <section>
            <div>지갑연결 애니메이션</div>
            <a
              href="https://dcentwallet.com/MobileApp"
              target="_blank"
              rel="noreferrer"
            >
              암호화폐 지갑이 없으신가요? {">"}
            </a>
          </section>
        </>
      )}
    </>
  );
}

export default Main_phrase;
