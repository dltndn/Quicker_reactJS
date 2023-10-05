import { useState, useEffect, lazy } from "react";
import { BsCaretRightFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import TopBarOthers from "../components/topBarOthers";
import { useConnWalletInfo } from "../App";
import { getStakingInfo } from "../utils/ExecuteOrderFromBlockchain";
import {
  getDateFromTimestamp,
  formatedDate,
} from "../utils/ConvertTimestampToDate";
import GetContractParams from "../components/blockChainTx/GetContractParams";
import SendTxK from "../components/blockChainTx/SendTxK";
import { useOrderStore } from "./commission";
import ConfirmBtn from "../components/confirmBtn";
import { getQtokenAllowance } from "../utils/ExecuteOrderFromBlockchain";
import styled, { keyframes } from "styled-components";
import BottomBar from "../components/BottomBar";
import Stacking from "../Lottie/Stacking.json";
import StackingGo from "../Lottie/Stackinggo.json";
import receiveQuicker from "../Lottie/receiveQuicker.json";
import Lottie from "lottie-react";
import DeskAni from "../Lottie/DeskAni.json";
import Decimal from "decimal.js";
import SuspenseComponent from "../components/SuspenseComponent";
import BottomConfirmBtn from "../components/bottomconfirmBtn";
import { StakingPageStyle } from "../StyleCollection";


const {Sc0, Sc01, Sc02, Sc3, Sc4, ReciDiv1, Div0, Div1,  Div1_3, HideDiv
, PercentDiv,ContainerDiv, Sp0, QuicPcTx, QuickerTx, QuickerTx_1,
HeadQuickerTx, StakingTxQuicker, PercentTx1, PercentTx2, PercentTx3, StakingBt, StakingTx,
StakingTx1, StakingTx2, StakingTx3, StakingTxSm1, StakingTxSm1_1, StakingTxSm2, StakingTxSm2_1,
Bt1, Margin, Margin_1, Ip, Receivetx} = new StakingPageStyle()

type StakingComponentType = {
  onClickBackBtn: () => void;
  address: string | undefined;
  quickerBalance: string;
};

const StakingPage = () => {
  const [showStaking, setShowStaking] = useState<boolean | null>(null);
  const [stakingRate, setStakingRate] = useState<string>("-");
  const [quickerTotalSuupply, setQuickerTotalSuupply] = useState<string>("-");
  const [quickerTotalStaking, setQuickerTotalStaking] = useState<string>("-");
  const [userStakedAmount, setUserStakedAmount] = useState<string>("0");
  const [rewardRate, setRewardRate] = useState<string>("0");
  const [endDate, setEndDate] = useState<string>("-");
  const [rewardsAmount, setRewardsAmount] = useState<string>("0");
  const [rewardsBlink, setRewardsBlink] = useState(true);
  const [userQuickerBal, setUserQuickerBal] = useState<string>("0");
  const [userVQuickerBal, setUserVQuickerBal] = useState<string>("0");
  const [showClaim, setShowClaim] = useState<boolean>(false);
  const navigate = useNavigate();

  const { address } = useConnWalletInfo();

  const getInfo = async (address: string) => {
    const {
      quickerTotalSuupply,
      quickerTotalStakingAmount,
      rewardRate,
      endTimeStamp,
      pendingRewards,
      userStakedQuickerBal,
      userQuickerBal,
      userVQuickerBal,
    } = await getStakingInfo(address);
    setStakingRate(
      (
        Math.round(
          (Number(quickerTotalStakingAmount) / Number(quickerTotalSuupply)) *
            100 *
            10
        ) / 10
      ).toString()
    );
    setQuickerTotalSuupply(quickerTotalSuupply);
    setQuickerTotalStaking(quickerTotalStakingAmount);
    setUserStakedAmount(userStakedQuickerBal);
    if (endTimeStamp === 0) {
      setEndDate("-");
    } else {
      setEndDate(formatedDate(getDateFromTimestamp(endTimeStamp)));
    }
    if (rewardRate === "") {
      setRewardRate("-");
    } else {
      setRewardRate(rewardRate);
    }
    setRewardsAmount(floorDecimals(pendingRewards, 7));
    setUserQuickerBal(floorDecimals(userQuickerBal, 0));
    setUserVQuickerBal(userVQuickerBal);
  };

  const moveToClaimPage = () => {
    if (rewardsAmount === "0") {
      alert("받으실 보상이 없습니다");
    } else {
      setShowClaim(true);
    }
  };

  const blinkRewardsAmount = () => {
    setRewardsBlink((prevState) => !prevState);
  };

  useEffect(() => {
    const interval = setInterval(blinkRewardsAmount, 500);
    console.log("staking");
    return () => {
      setShowStaking(null);
      setShowClaim(false);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (address !== undefined) {
      getInfo(address);
    }
  }, [address]);

  useEffect(() => {
    if (rewardsBlink === false && rewardsAmount !== "0") {
      // 홀더 예상 블록 당 보상 수량 계산 후 더하기
      // vQuicker balance * 0.00000000347

      const rewardsAmountDecimal = new Decimal(rewardsAmount);
      const userVQuickerBalDecimal = new Decimal(userVQuickerBal);
      const rewardPerBlock = userVQuickerBalDecimal.times("0.00000000347");
      const result = rewardsAmountDecimal.plus(rewardPerBlock);
      setRewardsAmount(result.toString());
    }
  }, [rewardsBlink]);

  return (
    <>
      {showStaking === null ? (
        <>
          <TopBarOthers
            title="토큰스테이킹"
            redirectLogic={() => navigate("/profile")}
          />
          {showClaim ? (
            <>
              <Sc3>
                <div>
                  <Lottie animationData={receiveQuicker} />
                </div>
                <Receivetx>{rewardsAmount} Quicker를 수령해요</Receivetx>
              </Sc3>
              <ReciDiv1>
                <SendTxK
                  param={GetContractParams.claimPendingRewards()}
                  successFunc={() => {
                    setShowClaim(false);
                    setRewardsAmount("0");
                  }}
                />
              </ReciDiv1>
            </>
          ) : (
            <div>
              <Sc3>
                <HeadQuickerTx>
                  Quicker
                  <QuicPcTx>
                    총 스테이킹률
                    <PercentTx2>
                      {" "}
                      {stakingRate}
                      <PercentTx3> %</PercentTx3>
                    </PercentTx2>
                  </QuicPcTx>
                </HeadQuickerTx>
                <Div1>
                  <PercentDiv>
                    <PercentTx1>총 유통량</PercentTx1>
                    <PercentTx2>
                      {quickerTotalSuupply}
                      <PercentTx3> Quicker</PercentTx3>
                    </PercentTx2>
                  </PercentDiv>
                </Div1>
                <Div1>
                  <PercentDiv>
                    <PercentTx1>총 스테이킹량</PercentTx1>
                    <PercentTx2>
                      {quickerTotalStaking}
                      <PercentTx3> Quicker</PercentTx3>
                    </PercentTx2>
                  </PercentDiv>
                </Div1>
              </Sc3>

              <Sc01>
                <QuickerTx>스테이킹 수량</QuickerTx>
                <StakingTx>
                  {userStakedAmount}
                  <StakingTxQuicker>Quicker</StakingTxQuicker>
                </StakingTx>
                <StakingTxSm1>
                  예상 수익률<StakingTxSm2>{rewardRate}%</StakingTxSm2>
                </StakingTxSm1>
                <StakingTxSm1>
                  종료 일자<StakingTxSm2>{endDate}</StakingTxSm2>
                </StakingTxSm1>
                {/* <Lot>
                  <Lottie animationData={Stacking} />
                </Lot> */}
              </Sc01>
              <Sc02>
                <QuickerTx>보상 수령</QuickerTx>
                <StakingTx1>
                  {rewardsBlink ? (
                    <BlinkDiv>{rewardsAmount}</BlinkDiv>
                  ) : (
                    <div>{rewardsAmount}</div>
                  )}
                  <StakingTxQuicker>Quicker</StakingTxQuicker>
                  <Bt1 onClick={() => moveToClaimPage()}>
                    <BsCaretRightFill></BsCaretRightFill>{" "}
                  </Bt1>
                </StakingTx1>
              </Sc02>
              <Sc0>
                <Sc4 onClick={() => setShowStaking(false)}>
                  <StakingTx2>언스테이킹</StakingTx2>
                </Sc4>
                <Sc4
                  onClick={() => {
                    setShowStaking(true);
                  }}
                >
                  <StakingTx3>스테이킹
                    {/* <CenteredDiv>
                      <Lottie animationData={StackingGo} />
                    </CenteredDiv> */}
                  </StakingTx3>
                  
                </Sc4>
              </Sc0>
              <HideDiv></HideDiv>
              <BottomBar></BottomBar>
            </div>
          )}
        </>
      ) : (
        <>
          {showStaking ? (
            <StakingToken
              onClickBackBtn={() => setShowStaking(null)}
              address={address}
              quickerBalance={userQuickerBal}
            />
          ) : (
            <UnstakingToken
              onClickBackBtn={() => setShowStaking(null)}
              address={address}
              quickerBalance={userQuickerBal}
            />
          )}
        </>
      )}
    </>
  );
};

const StakingToken = ({
  onClickBackBtn,
  address,
  quickerBalance,
}: StakingComponentType) => {
  const [inputAmount, setInputAmount] = useState<string>("");
  const [seletedPeriod, setSelectedPeriod] = useState<number | null>(null);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [showSendTx, setShowSendTx] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("-");
  const [voteAmount, setVoteAmount] = useState<string>("0");
  const [isClicked1, setIsClicked1] = useState(false);
  const [isClicked2, setIsClicked2] = useState(false);
  const [isClicked3, setIsClicked3] = useState(false);

  const onClick1 = () => {
    setIsClicked1(!isClicked1);
    setIsClicked2(false);
    setIsClicked3(false);
    console.log(seletedPeriod)
  };

  const onClick2 = () => {
    setIsClicked2(!isClicked2);
    setIsClicked1(false);
    setIsClicked3(false);
    console.log(seletedPeriod)
  };

  const onClick3 = () => {
    setIsClicked3(!isClicked3);
    setIsClicked1(false);
    setIsClicked2(false);
    console.log(seletedPeriod)
  };

  const navigate = useNavigate();

  const { showAllowance, setShowAllowance } = useOrderStore();

  const IncreaseQAllowance = lazy(() => import("../components/IncreaseQAllowance"))

  const handleInputAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 입력값이 숫자인지 확인하는 정규식
    const numberRegex = /^[0-9]+$/;
    if (numberRegex.test(event.target.value)) {
      setInputAmount(event.target.value);
    } else {
      setInputAmount("");
    }
  };

  const setInfo = (periodIndex: number) => {
    const currentTimeStamp = new Date().getTime() / 1000;
    const endTimeStamp = currentTimeStamp + 2592000 * periodIndex;
    setEndTime(formatedDate(getDateFromTimestamp(endTimeStamp)));
    setVoteAmount((Number(inputAmount) * periodIndex).toString());
  };

  const checkInfo = async () => {
    // allowance 확인
    if (address !== undefined) {
      if ((await getQtokenAllowance(address)) === "0") {
        setShowAllowance(true);
      }
      console.log(await getQtokenAllowance(address));
      setShowSendTx(true);
    }
  };

  useEffect(() => {
    return () => {
      setInputAmount("");
      setSelectedPeriod(null);
      setShowSendTx(false);
      setAlertMessage("");
      setShowAllowance(false);
    };
  }, []);

  useEffect(() => {
    if (inputAmount === "") {
      setAlertMessage("");
    } else if (Number(inputAmount) > Number(quickerBalance)) {
      setAlertMessage("보유한 수량이 부족합니다");
    } else {
      if (seletedPeriod !== null) {
        switch (seletedPeriod) {
          case 3:
            setInfo(1);
            break;
          case 6:
            setInfo(2);
            break;
          case 9:
            setInfo(4);
            break;
        }
        setShowConfirm(true);
      }
    }
  }, [inputAmount, seletedPeriod]);

  return (
    <>
      <TopBarOthers title="스테이킹" redirectLogic={onClickBackBtn} />
      {showAllowance ? (
        <SuspenseComponent component={<IncreaseQAllowance />} />
      ) : (
        <>
          <Margin>
            <Ip
              type="text"
              value={inputAmount}
              onChange={handleInputAmount}
              placeholder="정수 단위로만 입력 가능합니다"
            />
          </Margin>
          <ContainerDiv>
            <StakingTxSm1_1>
              보유<StakingTxSm2>{quickerBalance}</StakingTxSm2>
              <StakingBt>max</StakingBt>
            </StakingTxSm1_1>
            <StakingTxSm2_1>{alertMessage}</StakingTxSm2_1>
          </ContainerDiv>
          <br></br>
          <br></br>
          <QuickerTx_1>스테이킹 기간 선택</QuickerTx_1>
          {/* <Div1_1>
            <Div1_2>픽업지까지</Div1_2>
            <Div1_2>픽업지</Div1_2>
            <Div1_2>배송지</Div1_2>
          </Div1_1> */}
          <Div0>
            <Div1_3                   
            onClick={() => {setSelectedPeriod(3); onClick1()}}
                  className={isClicked1 ? "clicked" : ""}>
                  <Sp0>1배</Sp0>
                  3개월
            </Div1_3>
            <Div1_3                   
            onClick={() => {setSelectedPeriod(6); onClick2()}}
                  className={isClicked2 ? "clicked" : ""}>
                  <Sp0>2배</Sp0>
                  6개월
            </Div1_3>
            <Div1_3                   
            onClick={() => {setSelectedPeriod(9); onClick3()}}
                  className={isClicked3 ? "clicked" : ""}>
                  <Sp0>4배</Sp0>
                  9개월
            </Div1_3>
          </Div0>
          <Margin>
            <StakingTxSm1>
              스테이킹 종료 일시<StakingTxSm2>{endTime}</StakingTxSm2>
            </StakingTxSm1>
            <StakingTxSm1>
              추가 투표권<StakingTxSm2>{voteAmount} Quicker</StakingTxSm2>
            </StakingTxSm1>
            <Lottie animationData={DeskAni}/>
          </Margin>

          {showConfirm && (
            <>
              {!showSendTx ? (
                <>
                  <BottomConfirmBtn
                    content="다음"
                    confirmLogic={checkInfo}
                    isDisabled={false}
                  />
                </>
              ) : (
                <><Margin_1>
                  <SendTxK
                    param={GetContractParams.stakeQuicker(
                      inputAmount,
                      String(seletedPeriod)
                    )}
                    successFunc={() => navigate("/profile")}
                  />
                  </Margin_1>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

const UnstakingToken = ({
  onClickBackBtn,
  address,
  quickerBalance,
}: StakingComponentType) => {
  console.log("UnstakingToken");
  return (
    <>
      <TopBarOthers title="언스테이킹" redirectLogic={onClickBackBtn} />
      언스테이킹 상세 화면
    </>
  );
};

export default StakingPage;

const floorDecimals = (para: string, indexNum: number) => {
  const index = para.indexOf(".");
  const result = index !== -1 ? para.substring(0, index + indexNum) : para;
  return result;
};

const blinkAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const BlinkDiv = styled.div`
  animation: ${blinkAnimation} 1s;
`;
