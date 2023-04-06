import Req from "./orderComponents/req";
import ConfirmBtn from "./confirmBtn";
import { useEffect, useState } from "react";
import IncreaseAllowance from "./IncreaseAllowance";
import CreateNewOrder from "./createNewOrder";
import { useOrderDataStore, useOrderStore } from "../pages/commission";
import Handler from "../lib/Handler";

interface states {
  isChecked: {
    walk: boolean;
    bike: boolean;
    kickboard: boolean;
    motorcycle: boolean;
    car: boolean;
    truck: boolean;
  }
}

interface props {
  orderId : number
  sendData : object
  states: states
}


function RequestPage({ orderId, sendData, states} : props) {
  const { cost, setBtnContent, deadLine, showAllowance } = useOrderStore()
  const {setOrderId} = useOrderDataStore();
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
            _deadLine={deadLine}
            />
        </div>
      )}
    </>
  );
}

export default RequestPage;
