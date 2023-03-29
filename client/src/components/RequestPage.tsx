import Req from "./orderComponents/req";
import ConfirmBtn from "./confirmBtn";
import { useEffect, useState } from "react";
import IncreaseAllowance from "./IncreaseAllowance";
import CreateNewOrder from "./createNewOrder";
import { useOrderStore } from "../pages/commission";
import Handler from "../lib/Handler";

interface setStates {
  setWidth: React.Dispatch<React.SetStateAction<number>>
  setHeight: React.Dispatch<React.SetStateAction<number>>
  setLength: React.Dispatch<React.SetStateAction<number>>
  setWeight: React.Dispatch<React.SetStateAction<number>>
  setDetails: React.Dispatch<React.SetStateAction<string>>
  setCost: React.Dispatch<React.SetStateAction<number>>
  setDate: React.Dispatch<React.SetStateAction<string>>
  setHour: React.Dispatch<React.SetStateAction<number>>
  setMinute: React.Dispatch<React.SetStateAction<number>>
  setAMPM : React.Dispatch<React.SetStateAction<string>>
  setIsChecked : React.Dispatch<React.SetStateAction<{
    walk: boolean;
    bike: boolean;
    kickboard: boolean;
    motorcycle: boolean;
    car: boolean;
    truck: boolean;
  }>>
  setOrderId : React.Dispatch<React.SetStateAction<number>>
}

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
  setStates: setStates
}


function RequestPage({orderId, sendData, states, setStates} : props) {
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
          <Req states={states} setStates={setStates}></Req>
          <CreateNewOrder
          orderId={orderId}
            setOrderId={setStates.setOrderId}
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
