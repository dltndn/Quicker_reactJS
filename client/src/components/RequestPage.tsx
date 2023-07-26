import Req from "./orderComponents/req";
import { useEffect, useState } from "react";
import IncreaseAllowance from "./IncreaseAllowance";
import CreateNewOrder from "./createNewOrder";
import { useOrderDataStore, useOrderStore } from "../pages/commission";

interface props {
  sendData : object
}

function RequestPage({sendData} : props) {
  const { cost, setBtnContent, deadLine, showAllowance } = useOrderStore()
  useEffect(() => {
    setBtnContent(cost.toString() + "원 결제하기")
  }, [cost])

  return (
    <>
      {showAllowance ? (
        <IncreaseAllowance/>
      ) : (
        <div style={{ backgroundColor: "#efefef" }}>
          <Req></Req>
          <CreateNewOrder
            data={sendData}
            _orderPrice={cost.toString()}
            _deadline={deadLine}
            />
        </div>
      )}
    </>
  );
}

export default RequestPage;
