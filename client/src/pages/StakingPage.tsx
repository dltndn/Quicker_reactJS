import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopBarOthers from "../components/topBarOthers";

const StakingPage = () => {
  const [showStaking, setShowStaking] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {

    return () => {
        setShowStaking(null)
    }
  }, [])

  return (
    <>
      {showStaking === null ? (
        <>
          <TopBarOthers
            title="토큰스테이킹"
            redirectLogic={() => navigate("/profile")}
          />
          <div>스테이킹 정보</div>
          <button onClick={() => setShowStaking(true)}>스테이킹</button>
          <button onClick={() => setShowStaking(false)}>언스테이킹</button>
        </>
      ) : (
        <>{showStaking ? <StakingToken /> : <UnstakingToken />}</>
      )}
    </>
  );
};

const StakingToken = () => {
  return <>스테이킹 상세 화면</>;
};

const UnstakingToken = () => {
  return <>언스테이킹 상세 화면</>;
};

export default StakingPage;
