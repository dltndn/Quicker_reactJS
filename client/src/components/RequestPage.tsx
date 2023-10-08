import Req from "./orderComponents/req";
import { useEffect, useState } from "react";
import { useOrderDataStore, useOrderStore } from "../pages/commission";

interface props {
  sendData : object
}

function RequestPage({sendData} : props) {
  const { cost, setBtnContent, deadLine } = useOrderStore()
  useEffect(() => {
    setBtnContent(cost.toLocaleString() + "원 결제하기")
  }, [cost])

  return (
    <>
      <div style={{ backgroundColor: "#efefef" }}>
        <Req data={sendData} />
      </div>
    </>
  );
}

export default RequestPage;
