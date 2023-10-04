import {
  BsCoin,
  BsPencilSquare,
  BsEyeSlash,
  BsFileText,
  BsCheck2Circle,
  BsClipboardCheck,
  BsUiChecksGrid,
  BsExclamationCircle,
  BsGear,
} from "react-icons/bs";
import { AiOutlineLogout, AiOutlineCloseSquare } from "react-icons/ai";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import GetQkrwBalance from "../getQkrwBalance";
import { useEffect, useState } from "react";
// import Profile_settingPage from "../../pages/Profile_settingPage";
import { useVerificationStore } from "../../App";
import { useOrderState } from "../ShowOrders";
import WalletConnectBtn from "../blockChainTx/WalletConnectBtn";
import { useConnWalletInfo } from "../../App";
import NftProfile from "../NftProfile";
import { ImfoStyle } from "../../StyleCollection";
import { getFeeGovernorInfo } from "../../utils/ExecuteOrderFromBlockchain";
import { create } from "zustand";

const {
  Div0,
  Sc0_1,
  Sc1_1,
  Sc2_1,
  Sc3,
  Sc3_1,
  Scwal,
  Sp0,
  Sp1,
  Sp2,
  Bteye,
  Bticon,
  Bticonimg,
  Hr,
  Margin,
  Topbt,
  Topdiv,
  Toptx,
} = new ImfoStyle();

const money = require("../../image/money.png");

const img1 = require("../../image/ex1.jpg");

interface UseNftStateType {
  imgState: string;
  setImgState: (data: string) => void;
  imgList: string[];
  setImgList: (data: string[]) => void;
}

export const useNftState = create<UseNftStateType>((set) => ({
  imgState: "404",
  setImgState: (imgState: string) => set({ imgState }),
  imgList: ["404"],
  setImgList: (imgList: string[]) => set({ imgList }),
}));

function Imfo() {
  const navigate = useNavigate();
  const [isReward, setIsReward] = useState<boolean>(false);

  const { address, isConnected, setAddress, setIsMobile, setIsConneted } =
    useConnWalletInfo();

  const { isMember, userName } = useVerificationStore();
  const { setOrdersObj } = useOrderState();

  const disConnect = () => {
    setAddress(undefined);
    setIsMobile(null);
    setIsConneted(false);
    localStorage.setItem("kaikas_address", JSON.stringify(undefined));
  };

  const isPendingReward = async () => {
    if (address) {
      const roundData = await getFeeGovernorInfo(address);
      if (roundData.userRewards !== "0") {
        setIsReward(true)
      }
    }
  };

  useEffect(() => {
    isPendingReward()
    return () => {
      setIsReward(false)
    }
  }, []);

  useEffect(() => {
    if (!isConnected) {
      navigate("/");
    }
  }, [isConnected]);

  useEffect(() => {
    if (!isMember) {
      navigate("/");
    }
  }, [isMember]);

  return (
    <>
      <section>
        <Topdiv>
          <NftProfile />
          <Toptx>{userName}</Toptx>
          <Topbt onClick={() => navigate("/profile/setting")}>
            <BsPencilSquare></BsPencilSquare>
          </Topbt>
        </Topdiv>
      </section>
      <Scwal>
        <WalletConnectBtn />
      </Scwal>
      <Hr></Hr>
      <Sc3>
        <Div0>
          <span>지갑 주소</span>
          <Sp0>{address}</Sp0>
          <Bteye>
            <BsEyeSlash></BsEyeSlash>
          </Bteye>
        </Div0>
      </Sc3>
      <Sc3>
        <Div0>
          <span>지갑 잔액</span>
          <Sp1>
            {isConnected && address && <GetQkrwBalance address={address} />}
          </Sp1>
          <Bticon>
            <Bticonimg src={money} alt="" />
          </Bticon>
        </Div0>
      </Sc3>
      <Sc3_1>
        <Div0 onClick={() => navigate("/explorer")}>
          <BsCoin></BsCoin>
          <Sp2>실시간 거래 현황</Sp2>
        </Div0>
      </Sc3_1>
      <Sc3_1>
        <Div0 onClick={() => navigate("/staking")}>
          <BsCoin></BsCoin>
          <Sp2>스테이킹</Sp2>
        </Div0>
      </Sc3_1>
      <Sc3_1>
        <Div0 onClick={() => navigate("/feeGovernor")}>
          <BsCoin></BsCoin>
          <Sp2>거래수수료 투표</Sp2>
          {isReward && (<> 알림표시</>)}
        </Div0>
      </Sc3_1>
      <Sc0_1>
        <Div0
          onClick={() => {
            setOrdersObj(null);
            navigate("/orderlist");
          }}
        >
          <BsFileText></BsFileText>
          <Sp2>오더 내역</Sp2>
        </Div0>
      </Sc0_1>
      <Hr></Hr>
      <Sc1_1>
        <Div0
          onClick={() => {
            setOrdersObj(null);
            navigate("/fulfillmentlist");
          }}
        >
          <BsCheck2Circle></BsCheck2Circle>
          <Sp2>수행 내역</Sp2>
        </Div0>
      </Sc1_1>
      <Sc0_1>
        <Div0>
          <BsClipboardCheck></BsClipboardCheck>
          <Sp2>공지사항</Sp2>
        </Div0>
      </Sc0_1>
      <Hr></Hr>
      <Sc2_1>
        <Div0>
          <BsExclamationCircle></BsExclamationCircle>
          <Sp2>자주 묻는 질문</Sp2>
        </Div0>
      </Sc2_1>
      <Hr></Hr>
      <Sc2_1>
        <Div0>
          <BsUiChecksGrid></BsUiChecksGrid>
          <Sp2>이용약관</Sp2>
        </Div0>
      </Sc2_1>
      <Hr></Hr>
      <Sc1_1>
        <Div0>
          <BsGear></BsGear>
          <Sp2>설정</Sp2>
        </Div0>
      </Sc1_1>
      <Sc3_1>
        <Div0
          onClick={() => {
            disConnect();
          }}
        >
          <AiOutlineLogout></AiOutlineLogout>
          <Sp2>로그아웃</Sp2>
        </Div0>
      </Sc3_1>
      <Sc3_1>
        <Div0>
          <AiOutlineCloseSquare></AiOutlineCloseSquare>
          <Sp2>탈퇴하기</Sp2>
        </Div0>
      </Sc3_1>
      <Margin></Margin>
    </>
  );
}

export default Imfo;
