import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import TopBarOthers from "../components/topBarOthers";
import { create } from "zustand";
import ConfirmBtn from "../components/confirmBtn";
import GetContractParams from "../components/blockChainTx/GetContractParams";
import SendTxK from "../components/blockChainTx/SendTxK";

interface UseFeeGovernorType {
  title: string;
  setTitle: (para: string) => void;
  pageState: string;
  setPageState: (para: string) => void;
}

const useFeeGovernor = create<UseFeeGovernorType>((set) => ({
  title: "거래수수료 투표",
  setTitle: (title: string) => set({ title }),
  pageState: "main", // main | previousResult | vote
  setPageState: (pageState: string) => set({ pageState }),
}));

const FeeGovernorPage = () => {
  const { pageState, setPageState, title, setTitle } = useFeeGovernor();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("fee governor");
    // 사용자 투표권, 현재 라운드 정보 불러오기
    return () => {
      setPageState("main");
      setTitle("거래수수료 투표");
      console.log("fee governor end");
    };
  }, []);

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
          main: <Main />,
          previousResult: <PreviousResult />,
          vote: <Vote />,
        }[pageState]
      }
    </>
  );
};

const Main = () => {
  const { setPageState } = useFeeGovernor();

  useEffect(() => {
    console.log("main");
    return () => {
      console.log("main end");
    };
  }, []);

  return (
    <>
      <>메인</>
      <button onClick={() => setPageState("previousResult")}>지난투표</button>
      <button onClick={() => setPageState("vote")}>투표하기</button>
    </>
  );
};

const PreviousResult = () => {
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

const Vote = () => {
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
