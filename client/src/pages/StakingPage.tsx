import { useState, useEffect } from "react";
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
  const [userQuickerBal, setUserQuickerBal] = useState<string>("0");
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
  };

  useEffect(() => {
    return () => {
      setShowStaking(null);
    };
  }, []);

  useEffect(() => {
    if (address !== undefined) {
      getInfo(address);
    }
  }, [address]);

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
      console.log((await getQtokenAllowance(address)))
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
        <div>
          스테이킹 상세 화면
          <input
            type="text"
            value={inputAmount}
            onChange={handleInputAmount}
            placeholder="정수 단위로만 입력 가능합니다"
          />
          <div>Quicker</div>
          <div>
            보유 {quickerBalance}
            <button>max</button>
            <div>{alertMessage}</div>
          </div>
          <div>스테이킹 기간 선택</div>
          <div onClick={() => setSelectedPeriod(3)}>1배 - 3개월</div>
          <div onClick={() => setSelectedPeriod(6)}>2배 - 6개월</div>
          <div onClick={() => setSelectedPeriod(9)}>4배 - 9개월</div>
          <div>스테이킹 종료 일시</div>
          <div>{endTime}</div>
          <div>추가 투표권</div>
          <div>{voteAmount} vQuicker</div>
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
        </div>
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
