import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { useVerificationStore } from "../../App";
import { SendDataToAndroid } from "../../utils/SendDataToAndroid";
import Lottie from "lottie-react";
import BottomWallet from "../../Lottie/BottomBarAni.json";
import joinmember from "../../Lottie/laptobman.json";
import { TwoPointRoute } from "../searchComponents/interface/route";
import { useConnWalletInfo } from "../../App";
import mainLoading from "../../Lottie/mainLoading.json";
import { Main_phraseStyle } from "../../StyleCollection";

const {DelPo, DelPo1, Div0, Divmain, Divmain1, Sc0, Sc3, Sc4, Sc5, Sp1, Sp1_1, Sp2
, Img, Notice_div, Notice_divfont_1, Notice_divfont_2, LotDiv} = new Main_phraseStyle()

const note = require("../../image/note.png");
const transaction = require("../../image/transactionstatus.png");
const pin = require("../../image/redPin.png");
const wallet = require("../../image/wallet.png");

const walletWebsiteUrl = "https://kaikas.zendesk.com/hc/ko/articles/10915901333913-%EB%AA%A8%EB%B0%94%EC%9D%BC-Kaikas-%EC%84%A4%EC%B9%98%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%ED%95%98%EB%82%98%EC%9A%94-";



type isConnectToWallet = {
  isConnect: boolean;
};

function Main_phrase({ isConnect }: isConnectToWallet) {
  const navigate = useNavigate();
  const { isMember } = useVerificationStore();
  const { address } = useConnWalletInfo();

  const MainOrderInformation = lazy(() => import("./MainOrderInformation"))
  const WalletConnectBtn = lazy(() => import("../blockChainTx/WalletConnectBtn"))

  const sdta = new SendDataToAndroid(address);

  // const testData = {"sX":127.04951606332,"sY":37.5701609651972,"name":"서울 서초구 우면동 1","x":127.024170188781,"y":37.4687523234136,"coordType":"wgs84"}
  const routeStartPointToEndPoint : TwoPointRoute = {
    
      sX : 127.04951606332,
      sY : 37.5701609651972,
      name: "서울 서초구 우면동 1",
      x: 127.024170188781,
      y: 37.4687523234136,
      coordType: 'wgs84',
    
  }
  return (
    <>
      {isConnect ? (
        <>
        {isMember === null ? (        <LotDiv>
          <Lottie animationData={mainLoading} />
        </LotDiv>):(<>
          {isMember ? (
          <>
            
            <section>
            <Suspense fallback={        <LotDiv>
          <Lottie animationData={mainLoading} />
        </LotDiv>}>
              <MainOrderInformation />
            </Suspense>
            </section>
            {/* <button onClick={() => navigate("/execution/205")}>
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
                  </button> */}
          </>
        ) : (
          <>
            <Div0>
                  <Sp1_1 onClick={() => {
                    navigate("/signUp");
                  }}>안녕하세요!</Sp1_1>
                </Div0>
                <Div0>
              <Sp1 onClick={() => {
                    navigate("/signUp");
                  }}>회원가입을 진행해주세요. {">"}</Sp1>
            </Div0>
              <Sc3>
                <Divmain>
                  회원 가입은 처음 한 번만 진행합니다!
                  <DelPo1>
                    <Lottie animationData={joinmember}/>
                  </DelPo1>
                </Divmain>
                </Sc3>
                <Sc0>
                  <Sc4>
                  </Sc4>
                </Sc0>
                <Sc5>
                  <Notice_div>
                    <Notice_divfont_1>공지</Notice_divfont_1>
                    <Notice_divfont_2>가나다라마바사</Notice_divfont_2>
                  </Notice_div>
                </Sc5> 
          </>
        )}
        </>)}
      </>
      ) : (
        <>
                <Div0>
                  <Sp1_1>안녕하세요!</Sp1_1>              <Sp2>
                {/* <Web3Button icon="hide" label="지갑연결" balance="hide" /> */}
                <Suspense fallback={        <LotDiv>
          <Lottie animationData={mainLoading} />
        </LotDiv>}>
                  <WalletConnectBtn />
                </Suspense>
              </Sp2>
                </Div0>
                <Div0>
              <Sp1>지갑을 연결해주세요.</Sp1>
            </Div0>
              <Sc3>
                <Divmain>
                서비스 이용을 위해 지갑 연결은 필수입니다!
                  <DelPo>
                    <Lottie animationData={BottomWallet}/>
                  </DelPo>
                </Divmain>
                </Sc3>
                <Sc0>
                  <Sc4 onClick={()=>{window.open(walletWebsiteUrl)}}>
                  <Divmain1 >
                    암호화폐 지갑이<br></br>
                    없으신가요?
                    <Img src={wallet} />
                  </Divmain1>
                  </Sc4>
                  <Sc4 onClick={() => navigate('/explorer')}>
                  <Divmain1 >
                    실시간 거래 현황
                    <Img src={transaction} />
                  </Divmain1>
                  </Sc4>
                </Sc0>
                <Sc5>
                  <Notice_div>
                    <Notice_divfont_1>공지</Notice_divfont_1>
                    <Notice_divfont_2>가나다라마바사</Notice_divfont_2>
                  </Notice_div>
                </Sc5> 
        </>
      )}
    </>
  );
}

export default Main_phrase;

