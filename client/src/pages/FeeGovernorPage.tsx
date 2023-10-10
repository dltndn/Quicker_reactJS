import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import TopBarOthers from "../components/topBarOthers";
import { create } from "zustand";
import ConfirmBtn from "../components/confirmBtn";
import BottomConfirmBtn from "../components/bottomconfirmBtn";
import GetContractParams from "../components/blockChainTx/GetContractParams";
import SendTxK from "../components/blockChainTx/SendTxK";
import { useConnWalletInfo } from "../App";
import {
  getFeeGovernorInfo,
  getRoundLogs,
} from "../utils/ExecuteOrderFromBlockchain";
import styled, { createGlobalStyle } from "styled-components";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import Lottie from "lottie-react";
import mainLoaing from "../Lottie/mainLoading.json";
import Profit from "../Lottie/profitFeeGovernor.json";
import choice from "../Lottie/Choice.json";
import { FeeGovenorPageStyle } from "../StyleCollection";
import { BsCaretRightFill } from "react-icons/bs";
import { PieChart } from "react-minimal-pie-chart";

const {
  Receivetx,
  ReciDiv1,
  ReciDiv1_1,
  Div0,
  Sc0,
  Sc1,
  Sc3,
  Sc1_1,
  Div1,
  Div1_1,
  Flex1,
  Flex2,
  Tx1,
  Tx1_1,
  Tx1_2,
  Tx2,
  Tx3,
  Tx3color,
  Tx1color,
  PercDiv1,
  PercSp1,
  PercSp2,
  PercDiv2,
  PercentTx4_2,
  PercentTx4_3,
  PercentTx4_4,
  VtTx,
  ButtonWrapper,
  BtWp_1,
  SaveButton,
  SaveButton_1,
  LoadButton,
  HideDiv,
  HideDiv_1,
  LotDiv,
  Hr,
  QuickerTx_1,
  Input,
  Lb1,
  Margin_1,
  Div1_2,
  Bt1,
  ChartDiv,
} = new FeeGovenorPageStyle();

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
        setTitle("투표기록");
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
        console.log(roundData);
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
          loading: (
            <LotDiv>
              <Lottie animationData={mainLoaing} />
            </LotDiv>
          ),
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
      <GlobalStyle />
      {roundInfo && (
        <div>
          {roundInfo.userRewards !== "0" && (
            <Div1_2>
              <Tx1color>
                {convertToLocale(roundInfo.userRewards)}KRW를 정산 받으세요!
              </Tx1color>
              <Bt1 onClick={() => setPageState("claimRewards")}>
                <BsCaretRightFill></BsCaretRightFill>
              </Bt1>
            </Div1_2>
          )}
          <></>
          <Flex1>
            <Sc1>
              <Tx1>보유 투표권</Tx1>
              <Tx2>
                {convertToLocale(roundInfo.userVotePower)} <Tx3>vQuicker</Tx3>
              </Tx2>
            </Sc1>
            <Sc1_1>
              <Tx1color>가용 투표권</Tx1color>
              <Tx2>
                {convertToLocale(roundInfo.userVoteEnable)}{" "}
                <Tx3color>vQuicker</Tx3color>
              </Tx2>
            </Sc1_1>
          </Flex1>
          <Div1>
            <Tx1_1>금주 투표 현황</Tx1_1>
            <PercDiv1>
              누적 수수료<br></br>
              <PercSp1>{convertToLocale(roundInfo.totalIncome)}</PercSp1>
              <PercSp2> KRW</PercSp2>
            </PercDiv1>
            <PercDiv1>
              현재 투표량<br></br>
              <PercSp1>{convertToLocale(roundInfo.totalVotePower)}</PercSp1>
              <PercSp2> vQuicker</PercSp2>
            </PercDiv1>
          </Div1>
          <Div1>
            <Tx1_1>거래수수료 - {roundInfo.currentFee}%</Tx1_1>
            <PieChart
              data={[
                { title: "인상", value: feeShares.increase, color: "#F00" },
                { title: "동결", value: feeShares.freeze, color: "#747474" },
                { title: "인하", value: feeShares.decrease, color: "#0047FF" },
              ]}
              lineWidth={20}
              label={({ dataEntry }) =>
                dataEntry.percentage !== 0 && `${dataEntry.title}`
              }
              labelPosition={70}
              labelStyle={{
                fontSize: "0.3em",
                fontFamily: "sans-serif",
              }}
              startAngle={180}
             lengthAngle={180}
             viewBoxSize={[100, 50]}
            />
            <PercDiv2>
              인상 <PercentTx4_2>{feeShares.increase}%</PercentTx4_2>
            </PercDiv2>
            <PercDiv2>
              동결 <PercentTx4_3>{feeShares.freeze}%</PercentTx4_3>
            </PercDiv2>
            <PercDiv2>
              인하 <PercentTx4_4>{feeShares.decrease}%</PercentTx4_4>
            </PercDiv2>
          </Div1>
          <Div1>
            <Tx1_1>배송원 보증금 - {roundInfo.currentSecuDepo}%</Tx1_1>
            <PieChart
              data={[
                { title: "인상", value: feeShares.increase, color: "#F00" },
                { title: "동결", value: feeShares.freeze, color: "#747474" },
                { title: "인하", value: feeShares.decrease, color: "#0047FF" },
              ]}
              lineWidth={20}
              label={({ dataEntry }) =>
                dataEntry.percentage !== 0 && `${dataEntry.title}`
              }
              labelPosition={70}
              labelStyle={{
                fontSize: "0.3em",
                fontFamily: "sans-serif",
              }}
              startAngle={180}
             lengthAngle={180}
             viewBoxSize={[100, 50]}
            />
            <PercDiv2>
              인상 <PercentTx4_2>{secuDepoShares.increase}%</PercentTx4_2>
            </PercDiv2>
            <PercDiv2>
              동결 <PercentTx4_3>{secuDepoShares.freeze}%</PercentTx4_3>
            </PercDiv2>
            <PercDiv2>
              인하 <PercentTx4_4>{secuDepoShares.decrease}%</PercentTx4_4>
            </PercDiv2>
          </Div1>
          <ButtonWrapper>
            <LoadButton onClick={() => setPageState("previousResult")}>
              투표기록
            </LoadButton>
            <SaveButton onClick={() => setPageState("vote")}>
              투표하기
            </SaveButton>
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

// 투표 결과 목록 화면
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
            <SaveButton_1 onClick={async () => await addRoundLogData()}>
              더보기
            </SaveButton_1>
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
  const feeShares = calculateShares(ele.treasuryFee[0], ele.treasuryFee[1], ele.treasuryFee[2]
  );
  // @ts-ignore
  const secuDepoShares = calculateShares(ele.securityDepositFee[0], ele.securityDepositFee[1], ele.securityDepositFee[2]
  );

  return (
    <>
      <GlobalStyle />
      <Div1_1>
        <Tx1_1>투표 - {ele.round}회차</Tx1_1>
        <PercDiv2>
          투표량 <PercentTx4_3>{totalVotePower} vQuicker</PercentTx4_3>
        </PercDiv2>
        <PercDiv2>
          수수료 수익{" "}
          <PercentTx4_4>{convertToLocale(ele.totalIncome)} krw</PercentTx4_4>
        </PercDiv2>
        <Hr></Hr>
        <Tx1_2>거래수수료</Tx1_2>
        <PercDiv2>
          인상 <PercentTx4_2>{feeShares.increase}%</PercentTx4_2>
        </PercDiv2>
        <PercDiv2>
          동결 <PercentTx4_3>{feeShares.freeze}%</PercentTx4_3>
        </PercDiv2>
        <PercDiv2>
          인하 <PercentTx4_4>{feeShares.decrease}%</PercentTx4_4>
        </PercDiv2>
        <Hr></Hr>
        <Tx1_2>배송원 보증금</Tx1_2>
        <PercDiv2>
          인상 <PercentTx4_2>{secuDepoShares.increase}%</PercentTx4_2>
        </PercDiv2>
        <PercDiv2>
          동결 <PercentTx4_3>{secuDepoShares.freeze}%</PercentTx4_3>
        </PercDiv2>
        <PercDiv2>
          인하 <PercentTx4_4>{secuDepoShares.decrease}%</PercentTx4_4>
        </PercDiv2>
      </Div1_1>
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
      alert(
        "가용 투표권이 없습니다.\n 분배받을 수수료 수익이 있다면 정산받으세요."
      );
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
        <>
          <Sc0>
            <div>
              <Lottie animationData={choice} />
            </div>
            <Receivetx>
              가용 투표권은 {convertToLocale(userVoteEnable)} vQuicker 입니다.
            </Receivetx>
          </Sc0>
          <ReciDiv1></ReciDiv1>
          <BottomConfirmBtn
            content={"다음"}
            confirmLogic={onClick}
            isDisabled={false}
          />
        </>
      ) : (
        <>
          <div>
            <Div0>
              <div>
                <QuickerTx_1>거래 수수료</QuickerTx_1>
                <Flex2>
                  <Lb1>
                    <Input
                      type="radio"
                      name="feeType"
                      value={"0"}
                      onChange={setFeeIndexState}
                    />
                    <VtTx>인상</VtTx>
                  </Lb1>
                  <Lb1>
                    <Input
                      type="radio"
                      name="feeType"
                      value={"1"}
                      onChange={setFeeIndexState}
                      defaultChecked
                    />
                    <VtTx>동결</VtTx>
                  </Lb1>
                  <Lb1>
                    <Input
                      type="radio"
                      name="feeType"
                      value={"2"}
                      onChange={setFeeIndexState}
                    />
                    <VtTx>인하</VtTx>
                  </Lb1>
                </Flex2>
              </div>
            </Div0>
          </div>
          <div>
            <Div0>
              <VtTx>배송원 보증금</VtTx>
              <Flex2>
                <Lb1>
                  <Input
                    type="radio"
                    name="secuType"
                    value={"0"}
                    onChange={setSecuIndexState}
                  />
                  <VtTx>인상</VtTx>
                </Lb1>
                <Lb1>
                  <Input
                    type="radio"
                    name="secuType"
                    value={"1"}
                    onChange={setSecuIndexState}
                    defaultChecked
                  />
                  <VtTx>동결</VtTx>
                </Lb1>
                <Lb1>
                  <Input
                    type="radio"
                    name="secuType"
                    value={"2"}
                    onChange={setSecuIndexState}
                  />
                  <VtTx>인하</VtTx>
                </Lb1>
              </Flex2>
            </Div0>
          </div>
          <Margin_1>
            <SendTxK
              param={GetContractParams.castVote(
                feeIndex,
                secuIndex,
                userVoteEnable
              )}
              successFunc={successFunc}
            />
          </Margin_1>
        </>
      )}
    </>
  );
};

// 수수료 수익 정산 화면
const ClaimRewards = () => {
  const { setPageState, roundInfo, setRoundInfo } = useFeeGovernor();
  const navigate = useNavigate();

  const successFunc = () => {
    let roundData = roundInfo;
    roundData.userRewards = "0";
    roundData.userVoteEnable = roundData.userVotePower;
    setRoundInfo(roundData);
    setPageState("main");
  };

  return (
    <>
      <Sc3>
        <div>
          <Lottie animationData={Profit} />
        </div>
        <Receivetx>
          지난 투표 주차의 <br />
          <br />
          수수료 수익을 분배받아요
        </Receivetx>
      </Sc3>
      <ReciDiv1_1>
        <SendTxK
          param={GetContractParams.claimRewards()}
          successFunc={successFunc}
        />
      </ReciDiv1_1>
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
