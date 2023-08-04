import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import TopBarOthers from "../components/topBarOthers";
import { create } from "zustand";
import ConfirmBtn from "../components/confirmBtn";
import GetContractParams from "../components/blockChainTx/GetContractParams";
import SendTxK from "../components/blockChainTx/SendTxK";
import { useConnWalletInfo } from "../App";
import { getFeeGovernorInfo } from "../utils/ExecuteOrderFromBlockchain";

interface UseFeeGovernorType {
  title: string;
  setTitle: (para: string) => void;
  pageState: string;
  setPageState: (para: string) => void;
  roundInfo: any;
  setRoundInfo: (para: any) => void;
}

const useFeeGovernor = create<UseFeeGovernorType>((set) => ({
  title: "거래수수료 투표",
  setTitle: (title: string) => set({ title }),
  pageState: "loading", // loading | main | previousResult | vote | claimRewards
  setPageState: (pageState: string) => set({ pageState }),
  roundInfo: {},
  setRoundInfo: (roundInfo: any) => set({ roundInfo }),
}));

const FeeGovernorPage = () => {
  const { pageState, setPageState, title, setTitle, roundInfo, setRoundInfo } = useFeeGovernor();
  const { address } = useConnWalletInfo()
  const navigate = useNavigate();

  useEffect(() => {
    console.log("fee governor");
    
    return () => {
      setPageState("loading");
      setTitle("거래수수료 투표");
      console.log("fee governor end");
    };
  }, []);

  useEffect(() => {
    getFeeGovernorData(address)
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
      case "claimRewards":
        setTitle("수익정산")
        break
    }
  }, [pageState]);

  // 사용자 투표권, 현재 라운드 정보 불러오기
  const getFeeGovernorData = async (address: string | undefined) => {
    if (address !== undefined) {
        try {
            const roundData = await getFeeGovernorInfo(address)
            setRoundInfo(roundData)
            setPageState("main")
        } catch(e) {
            console.log(e)
            navigate("/profile")
        }
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
      case "claimRewards":
        setPageState("previousResult")
        break
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
          vote: <Vote userVoteEnable={roundInfo.userVoteEnable} successFunc={async () => await getFeeGovernorData(address)}/>,
          claimRewards: <ClaimRewards />
        }[pageState]
      }
    </>
  );
};

// 메인 화면
const Main = ({ roundInfo }: any) => {
  const { setPageState } = useFeeGovernor();
  const [feeShares, setFeeShares] = useState<number[]>([0, 0, 0]) // 거래 수수료 득표 지분율 배열
  const [secuDepoShares, setSecuDepoShares] = useState<number[]>([0, 0, 0]) // 배송원 보증금 득표 지분율 배열

  useEffect(() => {
    setFeeShares(calculateShares(roundInfo.increaseFee, roundInfo.freezeFee, roundInfo.decreaseFee))
    setSecuDepoShares(calculateShares(roundInfo.increaseSecuDepo, roundInfo.freezeSecuDepo, roundInfo.decreaseSecuDepo))
    return () => {
      console.log("main end");
    };
  }, []);

  const calculateShares = (input1: string, input2: string, input3: string) => {
    const number1 = Number(input1);
    const number2 = Number(input2);
    const number3 = Number(input3);
  
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
    {roundInfo && (<div>
        {roundInfo.userRewards !== "0" && (<div><div>{convertToLocale(roundInfo.userRewards)}KRW를 정산 받으세요!</div><button onClick={() => setPageState("claimRewards")}>정산받기</button></div>)}
        <div>보유 투표권 {convertToLocale(roundInfo.userVotePower)} vQuicker</div>
      <div>가용 투표권 {convertToLocale(roundInfo.userVoteEnable)} vQuicker</div>
      <div>이번주 투표현황</div>
      <div>누적 수수료 | {convertToLocale(roundInfo.totalIncome)} KRW</div>
      <div>현재 투표량 | {convertToLocale(roundInfo.totalVotePower)} vQuicker</div>
      <br></br>
      <div>거래수수료 - {roundInfo.currentFee}%</div>
      <div>인상 | 원형그래프 | {feeShares[0]}%</div>
      <div>동결 | 원형그래프 | {feeShares[1]}%</div>
      <div>인하 | 원형그래프 | {feeShares[2]}%</div>
      <br></br>
      <div>배송원 보증금 - {roundInfo.currentSecuDepo}%</div>
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
    const { setPageState } = useFeeGovernor();
  useEffect(() => {
    return () => {
      
    };
  }, []);

  return (
    <>
      <div></div>
    </>
  );
};

type VoteType = {
    userVoteEnable: any;
    successFunc: () => void;
}
// 투표하기 화면
const Vote = ({ userVoteEnable, successFunc }: VoteType) => {
  const [isInfoPage, setIsInfoPage] = useState<boolean>(true);
  const [feeIndex, setFeeIndex] = useState<string>("1") // 거래수수료 - 인상(0) | 동결(1) | 인하(2)
  const [secuIndex, setSecuIndex] = useState<string>("1") // 배송원 보증금 - 인상(0) | 동결(1) | 인하(2)

  useEffect(() => {
    return () => {
      setIsInfoPage(true)
      setFeeIndex("1")
      setSecuIndex("1")
    };
  }, []);

  const onClick = () => {
    if (userVoteEnable === "0") {
        alert("가용 투표권이 없습니다")
    } else {
        setIsInfoPage(false);
    }
  };

  const setFeeIndexState = (e: any) => {
    setFeeIndex(e.target.value)
  }

  const setSecuIndexState = (e: any) => {
    setSecuIndex(e.target.value)
  }

  return (
    <>
      {isInfoPage ? (
        <div>
          <>animation</>
          <>가용 투표권은 {convertToLocale(userVoteEnable)} vQuicker 입니다.</>
          <ConfirmBtn
            content={"다음"}
            confirmLogic={onClick}
            isDisabled={false}
          />
        </div>
      ) : (
        <div>
            <div>
                <div>거래수수료</div>
                <label>
                    <input type="radio" name="feeType" value={"0"} onChange={setFeeIndexState}/>
                    인상
                </label>
                <label>
                    <input type="radio" name="feeType" value={"1"} onChange={setFeeIndexState} defaultChecked/>
                    동결
                </label>
                <label>
                    <input type="radio" name="feeType" value={"2"} onChange={setFeeIndexState}/>
                    인하
                </label>
            </div>
            <div>
                <div>배송원 보증금</div>
                <label>
                    <input type="radio" name="secuType" value={"0"} onChange={setSecuIndexState}/>
                    인상
                </label>
                <label>
                    <input type="radio" name="secuType" value={"1"} onChange={setSecuIndexState} defaultChecked/>
                    동결
                </label>
                <label>
                    <input type="radio" name="secuType" value={"2"} onChange={setSecuIndexState}/>
                    인하
                </label>
            </div>
            <SendTxK param={GetContractParams.castVote(feeIndex, secuIndex, userVoteEnable)} successFunc={successFunc}/>
        </div>
      )}
    </>
  );
};

// 수수료 수익 정산 화면
const ClaimRewards = () => {
    const { setPageState, roundInfo, setRoundInfo } = useFeeGovernor();

    const successFunc = () => {
        let roundData = roundInfo
        roundData.userRewards = "0"
        setRoundInfo(roundData)
        setPageState("main");
    }

    return(<>
        <div>animation</div>
        <div>지난 투표한 주의 수수료 수익을 분배받아요</div>
        <SendTxK param={GetContractParams.claimRewards()} successFunc={successFunc}/>
    </>)
}

const convertToLocale = (data: string) => {
    return Number(data).toLocaleString()
  }

export default FeeGovernorPage;
