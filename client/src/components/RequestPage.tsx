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
}

interface props {
  setStates: setStates
}


function RequestPage({setStates} : props) {
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
          <Req setStates={setStates}></Req>
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
