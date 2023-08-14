import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import TopBarOthers from "../components/topBarOthers";
import { create } from "zustand";
import ConfirmBtn from "../components/confirmBtn";
import GetContractParams from "../components/blockChainTx/GetContractParams";
import SendTxK from "../components/blockChainTx/SendTxK";
import { useConnWalletInfo } from "../App";
import {
  getFeeGovernorInfo,
  getRoundLogs,
} from "../utils/ExecuteOrderFromBlockchain";

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
  const { pageState, setPageState, title, setTitle, roundInfo, setRoundInfo } =
    useFeeGovernor();
  const { address } = useConnWalletInfo();
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
    getFeeGovernorData(address);
  }, [address]);

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
        setTitle("수익정산");
        break;
    }
  }, [pageState]);

  // 사용자 투표권, 현재 라운드 정보 불러오기
  const getFeeGovernorData = async (address: string | undefined) => {
    if (address !== undefined) {
      try {
        const roundData = await getFeeGovernorInfo(address);
        setRoundInfo(roundData);
        setPageState("main");
      } catch (e) {
        console.log(e);
        navigate("/profile");
      }
    }
  };

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
        setPageState("previousResult");
        break;
    }
  };

  return (
    <>
      <TopBarOthers title={title} redirectLogic={redirectLogic} />
      {
        {
          loading: <div>로딩 애니메이션</div>,
          main: <Main roundInfo={roundInfo} />,
          previousResult: <PreviousResult />,
          vote: (
            <Vote
              userVoteEnable={roundInfo.userVoteEnable}
              successFunc={async () => await getFeeGovernorData(address)}
            />
          ),
          claimRewards: <ClaimRewards />,
        }[pageState]
      }
    </>
  );
};

interface SharesType {
  increase: number;
  freeze: number;
  decrease: number;
}

const sharesInit: SharesType = {
  increase: 0,
  freeze: 0,
  decrease: 0,
};
// 메인 화면
const Main = ({ roundInfo }: any) => {
  const { setPageState } = useFeeGovernor();
  const [feeShares, setFeeShares] = useState<SharesType>(sharesInit); // 거래 수수료 득표 지분율 배열
  const [secuDepoShares, setSecuDepoShares] = useState<SharesType>(sharesInit); // 배송원 보증금 득표 지분율 배열

  useEffect(() => {
    setFeeShares(
      calculateShares(
        roundInfo.increaseFee,
        roundInfo.freezeFee,
        roundInfo.decreaseFee
      )
    );
    setSecuDepoShares(
      calculateShares(
        roundInfo.increaseSecuDepo,
        roundInfo.freezeSecuDepo,
        roundInfo.decreaseSecuDepo
      )
    );
    return () => {
      setFeeShares(sharesInit);
      setSecuDepoShares(sharesInit);
    };
  }, []);

  return (
    <>
      {roundInfo && (
        <div>
          {roundInfo.userRewards !== "0" && (
            <div>
              <div>
                {convertToLocale(roundInfo.userRewards)}KRW를 정산 받으세요!
              </div>
              <button onClick={() => setPageState("claimRewards")}>
                정산받기
              </button>
            </div>
          )}
          <div>
            보유 투표권 {convertToLocale(roundInfo.userVotePower)} vQuicker
          </div>
          <div>
            가용 투표권 {convertToLocale(roundInfo.userVoteEnable)} vQuicker
          </div>
          <div>이번주 투표현황</div>
          <div>누적 수수료 | {convertToLocale(roundInfo.totalIncome)} KRW</div>
          <div>
            현재 투표량 | {convertToLocale(roundInfo.totalVotePower)} vQuicker
          </div>
          <br></br>
          <div>거래수수료 - {roundInfo.currentFee}%</div>
          <div>인상 | 원형그래프 | {feeShares.increase}%</div>
          <div>동결 | 원형그래프 | {feeShares.freeze}%</div>
          <div>인하 | 원형그래프 | {feeShares.decrease}%</div>
          <br></br>
          <div>배송원 보증금 - {roundInfo.currentSecuDepo}%</div>
          <div>인상 | 원형그래프 | {secuDepoShares.increase}%</div>
          <div>동결 | 원형그래프 | {secuDepoShares.freeze}%</div>
          <div>인하 | 원형그래프 | {secuDepoShares.decrease}%</div>
          <button onClick={() => setPageState("previousResult")}>
            지난투표
          </button>
          <button onClick={() => setPageState("vote")}>투표하기</button>
        </div>
      )}
    </>
  );
};

interface RoundLogType {
  round: string;
  treasuryFee: [];
  securityDepositFee: [];
  totalIncome: string;
}

// 지난투표 결과 목록 화면
const PreviousResult = () => {
  const [roundLogArr, setRoundLogArr] = useState<RoundLogType[]>([]);
  const [oldestRound, setOldestRound] = useState<number | null>(null);

  const getRoundLogData = async (
    index: string,
    startRound: string | undefined = undefined
  ) => {
    return await getRoundLogs(index, startRound);
  };

  const addRoundLogData = async () => {
    let objArr = roundLogArr;
    let newArrData = [];

    if (oldestRound === null) {
      // 첫 화면
      newArrData = await getRoundLogData("5");
    } else {
      newArrData = await getRoundLogData("5", String(oldestRound - 1));
    }
    for (let ele of newArrData) {
      objArr.push(ele);
    }
    setRoundLogArr(objArr);
    setOldestRound(Number(newArrData.at(-1).round));
  };
  // 라운드, 총 투표량, 수수료 수익, 각 항목 득표율
  useEffect(() => {
    addRoundLogData();
    return () => {
      setRoundLogArr([]);
      setOldestRound(null);
    };
  }, []);

  return (
    <>
      <div>라운드</div><div>정보</div>
      {roundLogArr.length === 0 ? (
        <div>로딩 애니메이션</div>
      ) : (
        <div>
          {roundLogArr.map((ele: RoundLogType, index: number) => (
            <RoundDataElement ele={ele} key={index} />
          ))}
          <button onClick={async () => await addRoundLogData()}>더보기</button>
        </div>
      )}
    </>
  );
};

type RoundDataElementType = {
  ele: RoundLogType;
};
const RoundDataElement = ({ ele }: RoundDataElementType) => {
  const calVotePower = (voteResultArr: []) => {
    let result = 0;
    for (let data of voteResultArr) {
      result += Number(data);
    }
    return String(result);
  };
  const totalVotePower = convertToLocale(calVotePower(ele.treasuryFee));
  // @ts-ignore
  const feeShares = calculateShares(ele.treasuryFee[0], ele.treasuryFee[1], ele.treasuryFee[2]);
  // @ts-ignore
  const secuDepoShares = calculateShares(ele.securityDepositFee[0], ele.securityDepositFee[1], ele.securityDepositFee[2]);

  return (
    <>
      <div>{ele.round}</div>
      <div>투표량: {totalVotePower} vQuicker</div>
      <div>수수료 수익: {convertToLocale(ele.totalIncome)} krw</div>
      <div>
        거래 수수료
        <div>인상 | {feeShares.increase}%</div>
        <div>동결 | {feeShares.freeze}%</div>
        <div>인하 | {feeShares.decrease}%</div>
      </div>
      <div>
        배송원 보증금
        <div>인상 | {secuDepoShares.increase}%</div>
        <div>동결 | {secuDepoShares.freeze}%</div>
        <div>인하 | {secuDepoShares.decrease}%</div>
      </div>
    </>
  );
};

type VoteType = {
  userVoteEnable: any;
  successFunc: () => void;
};
// 투표하기 화면
const Vote = ({ userVoteEnable, successFunc }: VoteType) => {
  const [isInfoPage, setIsInfoPage] = useState<boolean>(true);
  const [feeIndex, setFeeIndex] = useState<string>("1"); // 거래수수료 - 인상(0) | 동결(1) | 인하(2)
  const [secuIndex, setSecuIndex] = useState<string>("1"); // 배송원 보증금 - 인상(0) | 동결(1) | 인하(2)

  useEffect(() => {
    return () => {
      setIsInfoPage(true);
      setFeeIndex("1");
      setSecuIndex("1");
    };
  }, []);

  const onClick = () => {
    if (userVoteEnable === "0") {
      alert("가용 투표권이 없습니다");
    } else {
      setIsInfoPage(false);
    }
  };

  const setFeeIndexState = (e: any) => {
    setFeeIndex(e.target.value);
  };

  const setSecuIndexState = (e: any) => {
    setSecuIndex(e.target.value);
  };

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
              <input
                type="radio"
                name="feeType"
                value={"0"}
                onChange={setFeeIndexState}
              />
              인상
            </label>
            <label>
              <input
                type="radio"
                name="feeType"
                value={"1"}
                onChange={setFeeIndexState}
                defaultChecked
              />
              동결
            </label>
            <label>
              <input
                type="radio"
                name="feeType"
                value={"2"}
                onChange={setFeeIndexState}
              />
              인하
            </label>
          </div>
          <div>
            <div>배송원 보증금</div>
            <label>
              <input
                type="radio"
                name="secuType"
                value={"0"}
                onChange={setSecuIndexState}
              />
              인상
            </label>
            <label>
              <input
                type="radio"
                name="secuType"
                value={"1"}
                onChange={setSecuIndexState}
                defaultChecked
              />
              동결
            </label>
            <label>
              <input
                type="radio"
                name="secuType"
                value={"2"}
                onChange={setSecuIndexState}
              />
              인하
            </label>
          </div>
          <SendTxK
            param={GetContractParams.castVote(
              feeIndex,
              secuIndex,
              userVoteEnable
            )}
            successFunc={successFunc}
          />
        </div>
      )}
    </>
  );
};

// 수수료 수익 정산 화면
const ClaimRewards = () => {
  const { setPageState, roundInfo, setRoundInfo } = useFeeGovernor();

  const successFunc = () => {
    let roundData = roundInfo;
    roundData.userRewards = "0";
    setRoundInfo(roundData);
    setPageState("main");
  };

  return (
    <>
      <div>animation</div>
      <div>지난 투표한 주의 수수료 수익을 분배받아요</div>
      <SendTxK
        param={GetContractParams.claimRewards()}
        successFunc={successFunc}
      />
    </>
  );
};

// 득표율 계산 함수
const calculateShares = (
  input1: string,
  input2: string,
  input3: string
): SharesType => {
  const number1 = Number(input1);
  const number2 = Number(input2);
  const number3 = Number(input3);

  if (isNaN(number1) || isNaN(number2) || isNaN(number3)) {
    return sharesInit;
  }
  const total = number1 + number2 + number3;
  if (total === 0) {
    return sharesInit;
  }
  const share1 = (number1 / total) * 100;
  const share2 = (number2 / total) * 100;
  const share3 = (number3 / total) * 100;

  return {
    increase: Number(share1.toFixed(2)),
    freeze: Number(share2.toFixed(2)),
    decrease: Number(share3.toFixed(2)),
  };
};

const convertToLocale = (data: string) => {
  return Number(data).toLocaleString();
};

export default FeeGovernorPage;
