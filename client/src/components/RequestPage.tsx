import Req from "./orderComponents/req";
import ConfirmBtn from "./confirmBtn";
import { useEffect, useState } from "react";
import { useContractRead, useAccount } from "wagmi";
import IncreaseAllowance from "./IncreaseAllowance";
import CreateNewOrder from "./createNewOrder";
import { useOrderStore } from "../pages/commission";

function RequestPage() {  
  const { cost, setBtnContent, deadLine, showAllowance, setShowAllowance } = useOrderStore()

  const showAllowanceFalse = () => {
    setShowAllowance(false)
  }

  useEffect(() => {
    setBtnContent(cost.toString() + "원 결제하기")
  }, [cost])

  return (
    <>
      {showAllowance ? (
        <IncreaseAllowance setShowAllowance={() => showAllowanceFalse()}/>
      ) : (
        <div style={{ backgroundColor: "#efefef" }}>
          <Req></Req>
          <CreateNewOrder
            _orderPrice={cost.toString()}
            _deadLine={deadLine}
            />
        </div>
      )}
    </>
  );
}

export default RequestPage;
