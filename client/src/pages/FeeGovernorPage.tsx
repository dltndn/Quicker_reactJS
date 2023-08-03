import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import TopBarOthers from "../components/topBarOthers";
import { create } from "zustand";
import ConfirmBtn from "../components/confirmBtn";
import GetContractParams from "../components/blockChainTx/GetContractParams";
import SendTxK from "../components/blockChainTx/SendTxK";
import { useConnWalletInfo } from "../App";
import { getFeeGovernorInfo } from "../utils/ExecuteOrderFromBlockchain";
import { changeBalanceToForm } from "../utils/CalAny";

interface UseFeeGovernorType {
  title: string;
  setTitle: (para: string) => void;
  pageState: string;
  setPageState: (para: string) => void;
}

const useFeeGovernor = create<UseFeeGovernorType>((set) => ({
  title: "거래수수료 투표",
  setTitle: (title: string) => set({ title }),
  pageState: "loading", // loading | main | previousResult | vote
  setPageState: (pageState: string) => set({ pageState }),
}));

const FeeGovernorPage = () => {
  const { pageState, setPageState, title, setTitle } = useFeeGovernor();
  const { address } = useConnWalletInfo()
  const navigate = useNavigate();

  const [roundInfo, setRoundInfo] = useState<any>({})

  useEffect(() => {
    console.log("fee governor");
    
    return () => {
      setPageState("loading");
      setTitle("거래수수료 투표");
      console.log("fee governor end");
    };
  }, []);

  useEffect(() => {
    if (address !== undefined) {
        getFeeGovernorData(address)
    }
  }, [address])

  useEffect(() => {
    switch (pageState) {
      case "main":
        setTitle("거래수수료 투표");
        break;
      case "previousResult":
        setTitle("지난투표");
        break;
      case "vote":
        setTitle("투표하기");
        break;
    }
  }, [pageState]);

  // 사용자 투표권, 현재 라운드 정보 불러오기
  const getFeeGovernorData = async (address: string) => {
    try {
        setRoundInfo(await getFeeGovernorInfo(address))
        setPageState("main")
    } catch(e) {
        console.log(e)
        navigate("/profile")
    }
  }

  const redirectLogic = () => {
    switch (pageState) {
      case "main":
        navigate("/profile");
        break;
      case "previousResult":
        setPageState("main");
        break;
      case "vote":
        setPageState("main");
        break;
    }
  };

  return (
    <>
      <TopBarOthers title={title} redirectLogic={redirectLogic} />
      {
        {
          loading: <div>로딩 애니메이션</div>,
          main: <Main roundInfo={roundInfo}/>,
          previousResult: <PreviousResult userRewards={roundInfo.userRewards}/>,
          vote: <Vote userVoteEnable={roundInfo.userVoteEnable}/>,
        }[pageState]
      }
    </>
  );
};

// 메인 화면
const Main = (roundInfo: any) => {
  const { setPageState } = useFeeGovernor();
  const [feeShares, setFeeShares] = useState<number[]>([0, 0, 0]) // 거래 수수료 득표 지분율 배열
  const [secuDepoShares, setSecuDepoShares] = useState<number[]>([0, 0, 0]) // 배송원 보증금 득표 지분율 배열

  const roundData = roundInfo.roundInfo

  useEffect(() => {
    setFeeShares(calculateShares(roundData.increaseFee, roundData.freezeFee, roundData.decreaseFee))
    setSecuDepoShares(calculateShares(roundData.increaseSecuDepo, roundData.freezeSecuDepo, roundData.decreaseSecuDepo))
    return () => {
      console.log("main end");
    };
  }, []);

  const converToLocale = (data: string) => {
    return Number(data).toLocaleString()
  }

  const calculateShares = (input1: string, input2: string, input3: string) => {
    const number1 = parseFloat(input1);
    const number2 = parseFloat(input2);
    const number3 = parseFloat(input3);
  
    if (isNaN(number1) || isNaN(number2) || isNaN(number3)) {
        return [0, 0, 0]
    }
  
    const total = number1 + number2 + number3;
  
    if (total === 0) {
      return [0, 0, 0]
    }
  
    const share1 = (number1 / total) * 100;
    const share2 = (number2 / total) * 100;
    const share3 = (number3 / total) * 100;
  
    return [Number(share1.toFixed(2)), Number(share2.toFixed(2)), Number(share3.toFixed(2))];
  }

  return (
    <>
    {roundData && (<div> <div>보유 투표권 {converToLocale(roundData.userVotePower)} vQuicker</div>
      <div>가용 투표권 {converToLocale(roundData.userVoteEnable)} vQuicker</div>
      <div>이번주 투표현황</div>
      <div>누적 수수료 | {converToLocale(roundData.totalIncome)} KRW</div>
      <div>현재 투표량 | {converToLocale(roundData.totalVotePower)} vQuicker</div>
      <br></br>
      <div>거래수수료 - {roundData.currentFee}%</div>
      <div>인상 | 원형그래프 | {feeShares[0]}%</div>
      <div>동결 | 원형그래프 | {feeShares[1]}%</div>
      <div>인하 | 원형그래프 | {feeShares[2]}%</div>
      <br></br>
      <div>배송원 보증금 - {roundData.currentSecuDepo}%</div>
      <div>인상 | 원형그래프 | {secuDepoShares[0]}%</div>
      <div>동결 | 원형그래프 | {secuDepoShares[1]}%</div>
      <div>인하 | 원형그래프 | {secuDepoShares[2]}%</div>
      <button onClick={() => setPageState("previousResult")}>지난투표</button>
      <button onClick={() => setPageState("vote")}>투표하기</button>
    </div>)}
    </>
  );
};

// 지난투표 화면
const PreviousResult = (userRewards: any) => {
  useEffect(() => {
    return () => {
      
    };
  }, []);

  return (
    <>
      <>지난투표 결과</>
    </>
  );
};

// 투표하기 화면
const Vote = (userVoteEnable: any) => {
  const [isInfoPage, setIsInfoPage] = useState<boolean>(true);

  useEffect(() => {
    return () => {
      setIsInfoPage(true)
    };
  }, []);

  const onClick = () => {
    setIsInfoPage(false);
  };

  return (
    <>
      {isInfoPage ? (
        <div>
          <>animation</>
          <>가용 투표권은 {"100"}vQuicker 입니다.</>
          <ConfirmBtn
            content={"다음"}
            confirmLogic={onClick}
            isDisabled={false}
          />
        </div>
      ) : (
        <div>인상, 동결, 인하</div>
      )}
    </>
  );
};

export default FeeGovernorPage;
