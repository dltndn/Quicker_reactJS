import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopBarOthers from "../components/topBarOthers";
import { useConnWalletInfo } from "../App";
import { getStakingInfo } from "../utils/ExecuteOrderFromBlockchain";
import { getDateFromTimestamp, formatedDate } from "../utils/ConvertTimestampToDate";

type StakingComponentType = { onClickBackBtn: () => void }

const StakingPage = () => {
  const [showStaking, setShowStaking] = useState<boolean | null>(null);
  const [stakingRate, setStakingRate] = useState<string>("-")
  const [quickerTotalSuupply, setQuickerTotalSuupply] = useState<string>("-")
  const [quickerTotalStaking, setQuickerTotalStaking] = useState<string>("-")
  const [userStakedAmount, setUserStakedAmount] = useState<string>("0")
  const [rewardRate, setRewardRate] = useState<string>("0")
  const [endDate, setEndDate] = useState<string>("-")
  const [rewardsAmount, setRewardsAmount] = useState<string>("0")
  const navigate = useNavigate();

  const { address } = useConnWalletInfo()

  const getInfo = async(address: string) => {
    const {
      quickerTotalSuupply,
      quickerTotalStakingAmount,
      rewardRate,
      endTimeStamp,
      pendingRewards,
      userStakedQuickerBal
    } = await getStakingInfo(address)
    setStakingRate((Math.round((Number(quickerTotalStakingAmount)/Number(quickerTotalSuupply)*100) * 10) / 10).toString())
    setQuickerTotalSuupply(quickerTotalSuupply)
    setQuickerTotalStaking(quickerTotalStakingAmount)
    setUserStakedAmount(userStakedQuickerBal)
    setRewardRate(rewardRate)
    setEndDate(formatedDate(getDateFromTimestamp(endTimeStamp)))
    setRewardsAmount(floorDecimals(pendingRewards))
  }

  useEffect(() => {
    return () => {
      setShowStaking(null);
    };
  }, []);

  useEffect(() => {
    if (address !== undefined) {
      getInfo(address)
    }
  }, [address])

  return (
    <>
      {showStaking === null ? (
        <>
          <TopBarOthers
            title="토큰스테이킹"
            redirectLogic={() => navigate("/profile")}
          />
          <div>스테이킹 정보</div>
          <div>총 스테이킹률</div>
          <div>원형 그래프</div>
          <div>{stakingRate}%</div>
          <div>총 유통량</div>
          <div>{quickerTotalSuupply} Quicker</div>
          <div>총 스테이킹량</div>
          <div>{quickerTotalStaking} Quicker</div>

          <div>사용자 스테이킹 수량</div>
          <div>{userStakedAmount} Quicker</div>
          <div>예상 수익률 {rewardRate}%</div>
          <div>종료 일시 날짜</div>
          <div>{endDate}</div>
          <div>보상 수량</div>
          <div>{rewardsAmount} Quicker</div>
          <button onClick={() => setShowStaking(false)}>언스테이킹</button>
          <button onClick={() => setShowStaking(true)}>스테이킹</button>
        </>
      ) : (
        <>
          {showStaking ? (
            <StakingToken onClickBackBtn={() => setShowStaking(null)} />
          ) : (
            <UnstakingToken onClickBackBtn={() => setShowStaking(null)} />
          )}
        </>
      )}
    </>
  );
};

const StakingToken = ({ onClickBackBtn }: StakingComponentType) => {
  console.log("StakingToken")
  return (
    <>
      <TopBarOthers title="스테이킹" redirectLogic={onClickBackBtn} />
      스테이킹 상세 화면
    </>
  );
};

const UnstakingToken = ({ onClickBackBtn }: StakingComponentType) => {
  console.log("UnstakingToken")
  return (
    <>
      <TopBarOthers title="언스테이킹" redirectLogic={onClickBackBtn} />
      언스테이킹 상세 화면
    </>
  );
};

export default StakingPage;

const floorDecimals = (para: string) => {
  const index = para.indexOf(".");
  const result = index !== -1 ? para.substring(0, index + 7) : para;
  return result;
}