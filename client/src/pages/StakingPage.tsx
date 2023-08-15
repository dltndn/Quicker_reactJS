import { useState, useEffect } from "react";
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
import IncreaseQAllowance from "../components/IncreaseQAllowance";
import ConfirmBtn from "../components/confirmBtn";
import { getQtokenAllowance } from "../utils/ExecuteOrderFromBlockchain";
import styled, { keyframes } from "styled-components";
import BottomBar from "../components/BottomBar";
import Stacking from "../Lottie/Stacking.json";
import StackingGo from "../Lottie/Stackinggo.json";
import receiveQuicker from "../Lottie/receiveQuicker.json";
import Lottie from "lottie-react";

const Sc3 = styled.section`
  margin: 8px 16px 16px 16px;
  padding: 20px;
  border-radius: 5px;
  border: solid;
  border-width: 1px;
  border-color: #d9d9d9;
  background-color: #ffffff;
  box-shadow: 0px 3px 0px #bebebe;
`;
const ReciDiv1 = styled.div`
  text-align: center;
`;

const Sc01 = styled.section`
  height: 170px;
  margin: 8px 16px 0px 16px;
  padding: 20px;
  border-radius: 5px 5px 0 0;
  border: solid;
  border-width: 1px;
  border-bottom: none;
  border-color: #d9d9d9;
  background-color: #ffffff;
  box-shadow: none;
  position: static;
`;

const Sc02 = styled(Sc3)`
  height: 170px;
  margin-top: 0px;
  margin-bottom: 8px;
  border-radius: 0px 0px 5px 5px;
  border-top: none;
  box-shadow: 0px 3px 0px #bebebe;
  background: linear-gradient(to right, #ffffff, #dff9ff, #d9f8ff, #a3eeff);
`;

const Sc4 = styled.section`
  flex: 1 1 50%;
  height: 160px;
  margin: 8px 8px 0 8px;
  padding: 16px;
  border-radius: 5px;
  border: solid;
  border-width: 1px;
  border-color: #d9d9d9;
  background-color: #ffffff;
  box-shadow: 0px 3px 0px #bebebe;
`;

const Sc0 = styled.section`
  display: flex;
  padding: 0 8px 16px 8px;
  position: static;
`;

const Div1 = styled.div`
  display: flex;
`;
const QuickerTx = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const HeadQuickerTx = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Quickertxsm = styled.div`
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  margin: 12px 0 12px 0;
  color: #6c6c6c;
`;

const Receivetx = styled(Quickertxsm)`
  font-size: 16px;
`;

const PercentDiv = styled.div`
  margin: 8px;
`;

const PercentTx1 = styled.div`
  margin-bottom: 6px;
  font-size: 13px;
  font-weight: bold;
  color: #6c6c6c;
`;
const PercentTx2 = styled.span`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 0px;
  color: #ff0a0a;
`;
const PercentTx3 = styled.span`
  font-size: 10px;
  font-weight: bold;
  color: #000000;
`;

const QuicPcTx = styled.div`
  text-align: right;
  font-size: 12px;
  font-weight: bold;
  color: #6c6c6c;
`

const StakingTx = styled.div`
  font-size: 22px;
  color: #00a3ff;
  font-weight: bold;
  margin: 16px 16px 16px 0px;
`;
const StakingTx1 = styled(StakingTx)`
  margin-top: 40px;
`;
const Bt1 = styled.span`
  position: absolute;
  margin-right: 40px;
  right: 0;
  top: 515px;
`;

const StakingTxQuicker = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: #8ed6ff;
  padding-left: 8px;
`;
const StakingTxSm1 = styled.div`
  font-size: 10px;
  font-weight: bold;
  color: #c6c6c6;
`;
const StakingTxSm2 = styled.span`
  font-size: 10px;
  font-weight: bold;
  color: #757575;
  padding-left: 8px;
`;
const Lot = styled.div`
  position: absolute;
  margin-right: 20px;
  right: 0;
  top: 290px;
  width: 130px;
`;
const CenteredDiv = styled.div`
  position: relative;
  width: 100px;
  top: 0;
  left: 14px;
`;

const StakingTx2 = styled.div`
  line-height: 120px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
`;
const StakingTx3 = styled(StakingTx2)`
  line-height: normal;
  color: #44d9fb;
`;
const HideDiv = styled.div`
  height: 3.2rem;
`;
const Margin = styled.div`
  margin: 0px 10px 0px 10px;
`;

const Ip = styled.input`
  width: 100%;
  height: 40px;
  font-size: 16px;
  border-radius: 0.313rem;
  border: 1px solid #efefef;
  outline: none;
  background-color: #ffffff;
  padding-left: 0.625rem;
  padding-right: 0.625rem;
  margin: 0px;
  text-align: left;
  color: #000000;
  &:focus {
    border-color: #efefef;
    background-color: #ffffff;
  }
`;
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
      userVQuickerBal
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
    setUserVQuickerBal(userVQuickerBal)
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
    console.log("staking")
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
      const rewardPerBlock = Number(userVQuickerBal) * 0.00000000347
      const result = Number(rewardsAmount) + rewardPerBlock
      setRewardsAmount(floorDecimals(result.toString(), 7))
    }
  }, [rewardsBlink])

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
                      <PercentTx3>
                      {" "}%
                      </PercentTx3>
                    </PercentTx2>
                  </QuicPcTx>
                </HeadQuickerTx>

                {/* <Quickertxsm>
                  스테이킹에 참여하여 Quicker의 생태계에 기여해주세요.
                </Quickertxsm> */}
                <Div1>
                  {/* <PercentDiv>
                    <PercentTx1>총 유통량</PercentTx1>
                    <PercentTx2>
                      {quickerTotalSuupply}
                      <PercentTx3>
                        {" "}
                        Quicker
                      </PercentTx3>
                    </PercentTx2>
                  </PercentDiv>
                  <PercentDiv>
                    <PercentTx1>총 스테이킹량</PercentTx1>
                    <PercentTx2>
                      {quickerTotalStaking}
                      <PercentTx3>
                        {" "}
                        Quicker
                      </PercentTx3>
                    </PercentTx2>
                  </PercentDiv>
                  <PercentDiv>
                    <PercentTx1>총 스테이킹률</PercentTx1>
                    <PercentTx2>
                      {stakingRate}
                      <PercentTx3>
                      {" "}%
                      </PercentTx3>
                    </PercentTx2>
                  </PercentDiv> */}
                  <PercentDiv>
                    <PercentTx1>총 유통량</PercentTx1>
                      <PercentTx2>
                        {quickerTotalSuupply}
                        <PercentTx3>
                          {" "}
                          Quicker
                        </PercentTx3>
                      </PercentTx2>
                  </PercentDiv>
                </Div1>
                <Div1>
                <PercentDiv>
                    <PercentTx1>총 스테이킹량</PercentTx1>
                    <PercentTx2>
                      {quickerTotalStaking}
                      <PercentTx3>
                        {" "}
                        Quicker
                      </PercentTx3>
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
                <QuickerTx>보상 수량</QuickerTx>
                <StakingTx1>
                  {rewardsBlink ? (<BlinkDiv>
                    {rewardsAmount}
                  </BlinkDiv>):(<div>{rewardsAmount}</div>)}
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
                    if (rewardsAmount !== "0") {
                      setShowClaim(true);
                    }
                  }}
                >
                  <StakingTx3>스테이킹</StakingTx3>
                  {/* <CenteredDiv>
                    <Lottie animationData={StackingGo} />
                  </CenteredDiv> */}
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
  const navigate = useNavigate();

  const { showAllowance, setShowAllowance } = useOrderStore();

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
      setAlertMessage("수량을 입력해주세요");
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
        <IncreaseQAllowance />
      ) : (
        <Margin>
          <Ip
            type="text"
            value={inputAmount}
            onChange={handleInputAmount}
            placeholder="정수 단위로만 입력 가능합니다"
          />
          <div>
            보유 {quickerBalance}
            <button>max</button>
            <div>{alertMessage}</div>
          </div>

          <div>스테이킹 기간 선택</div>
          <div>
            <div onClick={() => setSelectedPeriod(3)}>1배 - 3개월</div>
            <div onClick={() => setSelectedPeriod(6)}>2배 - 6개월</div>
            <div onClick={() => setSelectedPeriod(9)}>4배 - 9개월</div>
          </div>
          <StakingTxSm1>
            스테이킹 종료 일시<StakingTxSm2>{endTime}</StakingTxSm2>
          </StakingTxSm1>
          <StakingTxSm1>
            추가 투표권<StakingTxSm2>{voteAmount} Quicker</StakingTxSm2>
          </StakingTxSm1>

          {showConfirm && (
            <>
              {!showSendTx ? (
                <>
                  <ConfirmBtn
                    content="다음"
                    confirmLogic={checkInfo}
                    isDisabled={false}
                  />
                </>
              ) : (
                <>
                  <SendTxK
                    param={GetContractParams.stakeQuicker(
                      inputAmount,
                      String(seletedPeriod)
                    )}
                    successFunc={() => navigate("/profile")}
                  />
                </>
              )}
            </>
          )}
        </Margin>
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
`