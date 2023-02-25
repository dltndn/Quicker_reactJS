import TopBarOthers from "../components/topBarOthers";
import BottomBar from "../components/BottomBar";
import { useState } from "react";
import CommissionPage from "../components/commission";
import RequestPage from "../components/RequestPage";

export default function OrderPage() {
  const [title, setTitle] = useState<string>("출발지입력");
  const [redirection, setRedirection] = useState<string>("/");
  const [showCommissionPage, setShowCommissionPage] = useState<boolean>(true);

  const handleCommissionPage = () => {
    setShowCommissionPage(false);
  };

  return (
    <>
      <TopBarOthers title={title} redirect={redirection} />
      {showCommissionPage ? (
        <CommissionPage hideCommissionPage={handleCommissionPage} />
      ) : (
        <RequestPage />
      )}
      <BottomBar />
    </>
  );
}
