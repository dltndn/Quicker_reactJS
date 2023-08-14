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
import styled, { createGlobalStyle } from "styled-components";
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from "apexcharts";
import Lottie from "lottie-react";
import mainLoaing from "../Lottie/mainLoading.json";

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

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #efefef !important;
    height: 100%;
  }
`;

const Sc3 = styled.section`
  margin: 0px 16px 16px 16px;
  padding: 16px;
  border-radius: 5px;
  border: none;
  border-width: 1px;
  border-color: #d9d9d9;
  background-color: #ffffff;
`;

const Sc3_1 = styled(Sc3)`
  margin: 16px 16px 0px 16px;
  padding: 16px;
  border-radius: 5px;
  border: none;
  border-width: 1px;
  border-color: #d9d9d9;
  background-color: #ffffff;
`;

const Flex1 = styled.div`
  display: flex;
  justify-content: space-between;
`

const Sc2 = styled.section`
  flex: 1 1 40;
  width: 45%;
  height: 150px;
  margin: 16px 8px 16px 16px;
  padding: 16px;
  border-radius: 5px;
  border: none;
  border-width: 1px;
  border-color: #d9d9d9;
  background-color: #ffffff;
`;

const Sc2_1 = styled(Sc2)`
  margin: 16px 16px 16px 8px;
  background-color: #54E1FF;
`;

const Tx1 = styled.span`
  color: #000;
  font-size: 14px;
  font-weight: bold;
`
const Tx1color = styled(Tx1)`
color: #FFF;
`
const Tx1_1 = styled(Tx1)`
  font-size: 16px;
`
const Tx1_2 = styled.div`
  color: #000;
  font-weight: bold;
  padding-top: 16px;
  font-size: 14px;
`
const Tx2 = styled.div`
  color: #000;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  padding-top: 30px;
`
const Tx3= styled.span`
  color: #747474;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
`
const Tx3color = styled(Tx3)`
color: #FFF;
`
const PercentTx1 = styled.div`
  margin: 12px 0 0px 0px;
  padding: 6px 0 6px 0px;
  font-size: 13px;
  font-weight: bold;
  color: #6c6c6c;
`;
const PercentTx2 = styled.span`
  font-size: 22px;
  font-weight: bold;
  color: #ff0a0a;
`;
const PercentTx3 = styled.span`
  font-size: 10px;
  font-weight: bold;
  color: #000000;
`;

const PercentTx4_1 = styled.div`
  font-size: 14px;
  color: #000;
  font-weight: bold;
  margin: 16px 16px 0px 0px;
`;

const PercentTx4_2 = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: #F00;
  padding-left: 8px;
`;
const PercentTx4_3 = styled(PercentTx4_2)`
  color: #747474;
`
const PercentTx4_4 = styled(PercentTx4_2)`
color: #0047FF;
`
const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 16px 0;
  background-color: #efefef;
`;

const BtWp_1 = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
    padding: 16px 0;
  justify-content: center;
  background-color: #efefef;
`

const SaveButton = styled.button`
  width: 45%;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`;
const SaveButton_1 = styled(SaveButton)`
  width: 90%;
`;

const LoadButton = styled.button`
  width: 45%;
  background-color: #17a2b8;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #117a8b;
  }
`;
const HideDiv = styled.div`
  height: 3.9rem;
`;
const HideDiv_1 = styled.div`
  height: 5.0rem;
`;
const LotDiv = styled.div`
  position: absolute;
  width: 100px;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Hr = styled.hr`
  margin-top: 16px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height: 0.063rem;
  border: 0;
  background: #e6e6e6;
`;

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
          loading:         
          <LotDiv>
          <Lottie animationData={mainLoaing} />
          </LotDiv>,
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
    <><GlobalStyle/>
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
          <></>
          <Flex1>
          <Sc2>
            <Tx1>보유 투표권</Tx1>
            <Tx2>
            {convertToLocale(roundInfo.userVotePower)} <Tx3>vQuicker</Tx3>
            </Tx2>
          </Sc2>
          <Sc2_1>
          <Tx1color>가용 투표권</Tx1color>
          <Tx2>
          {convertToLocale(roundInfo.userVoteEnable)} <Tx3color>vQuicker</Tx3color>
          </Tx2>
          </Sc2_1>
          </Flex1>
          <Sc3>
            <Tx1_1>금주 투표 현황</Tx1_1>
            <PercentTx1>누적 수수료<br></br>
              <PercentTx2>{convertToLocale(roundInfo.totalIncome)}</PercentTx2>
              <PercentTx3> KRW</PercentTx3>
            </PercentTx1>
            <PercentTx1>현재 투표량<br></br>
              <PercentTx2>{convertToLocale(roundInfo.totalVotePower)}</PercentTx2>
              <PercentTx3> vQuicker</PercentTx3>
            </PercentTx1>
          </Sc3>
          <Sc3>
            <Tx1_1>거래수수료 - {roundInfo.currentFee}%</Tx1_1>
            <StrokedGaugeExample></StrokedGaugeExample>
            <PercentTx4_1>인상 <PercentTx4_2>{feeShares.increase}%</PercentTx4_2></PercentTx4_1>
            <PercentTx4_1>동결 <PercentTx4_3>{feeShares.freeze}%</PercentTx4_3></PercentTx4_1>
            <PercentTx4_1>인하 <PercentTx4_4>{feeShares.decrease}%</PercentTx4_4></PercentTx4_1>
          </Sc3>
          <Sc3>
          <Tx1_1>배송원 보증금 - {roundInfo.currentSecuDepo}%</Tx1_1>
          <StrokedGaugeExample></StrokedGaugeExample>
          <PercentTx4_1>인상 <PercentTx4_2>{secuDepoShares.increase}%</PercentTx4_2></PercentTx4_1>
          <PercentTx4_1>동결 <PercentTx4_3>{secuDepoShares.freeze}%</PercentTx4_3></PercentTx4_1>
          <PercentTx4_1>인하 <PercentTx4_4>{secuDepoShares.decrease}%</PercentTx4_4></PercentTx4_1>
          </Sc3>
          <ButtonWrapper>
          <LoadButton onClick={() => setPageState("previousResult")}>지난투표</LoadButton>
          <SaveButton onClick={() => setPageState("vote")}>투표하기</SaveButton>
          </ButtonWrapper>
          <HideDiv></HideDiv>
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
      {/* <div>라운드</div><div>정보</div> */}
      {roundLogArr.length === 0 ? (
                  <LotDiv>
                  <Lottie animationData={mainLoaing} />
                  </LotDiv>
      ) : (
        <div>
          {roundLogArr.map((ele: RoundLogType, index: number) => (
            <RoundDataElement ele={ele} key={index} />
          ))}
          <HideDiv_1></HideDiv_1>
          <BtWp_1>
          <SaveButton_1 onClick={async () => await addRoundLogData()}>더보기</SaveButton_1>
          </BtWp_1>
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
    <><GlobalStyle/>
      <Sc3_1>
            <Tx1_1>투표 - {ele.round}회차</Tx1_1>
            <PercentTx4_1>투표량 <PercentTx4_3>{totalVotePower} vQuicker</PercentTx4_3></PercentTx4_1>
            <PercentTx4_1>수수료 수익 <PercentTx4_4>{convertToLocale(ele.totalIncome)} krw</PercentTx4_4></PercentTx4_1>
            <Hr></Hr>
            <Tx1_2>거래수수료</Tx1_2>
            <PercentTx4_1>인상 <PercentTx4_2>{feeShares.increase}%</PercentTx4_2></PercentTx4_1>
            <PercentTx4_1>동결 <PercentTx4_3>{feeShares.freeze}%</PercentTx4_3></PercentTx4_1>
            <PercentTx4_1>인하 <PercentTx4_4>{feeShares.decrease}%</PercentTx4_4></PercentTx4_1>
            <Hr></Hr>
            <Tx1_2>배송원 보증금</Tx1_2>
            <PercentTx4_1>인상 <PercentTx4_2>{secuDepoShares.increase}%</PercentTx4_2></PercentTx4_1>
            <PercentTx4_1>동결 <PercentTx4_3>{secuDepoShares.freeze}%</PercentTx4_3></PercentTx4_1>
            <PercentTx4_1>인하 <PercentTx4_4>{secuDepoShares.decrease}%</PercentTx4_4></PercentTx4_1>
      </Sc3_1>
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

const StrokedGaugeExample: React.FC = () => {
  const options = {
    chart: {
      type: 'radialBar',
      height: 50, // 그래프의 높이 설정
      width: 50, // 그래프의 너비 설정 (예: '300px')
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 15,
          size: "60%"
        },
        dataLabels: {
          showOn: "always",
          name: {
            offsetY: -10,
            show: true,
            color: "#888",
            fontSize: "12px"
          },
          value: {
            color: "#111",
            fontSize: "20px",
            show: true
          }
        },
      },
    },
    series: [100], // 데이터 값 (0부터 100 사이의 값)
    labels: ['Stroked Gauge'],
  } as ApexOptions;

  return (
      <ReactApexChart options={options} series={options.series} type="radialBar" />
  );
};

export default FeeGovernorPage;
