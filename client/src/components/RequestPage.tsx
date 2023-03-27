import Req from "./orderComponents/req";
import ConfirmBtn from "./confirmBtn";
import { useEffect, useState } from "react";
import { useContractRead, useAccount } from "wagmi";
import IncreaseAllowance from "./IncreaseAllowance";
import {
  QKRW_CONTRACT_ABI,
  QKRW_ADDRESS,
  QUICKER_ADDRESS,
} from "../contractInformation";
import { useOrderStore } from "../pages/commission";
import Handler from "../lib/Handler";

//Qkrw token contract information - polygon mumbai network
const Qkrw_abi = QKRW_CONTRACT_ABI;
const Qkrw_address = QKRW_ADDRESS;
const Quicker_address = QUICKER_ADDRESS;

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
  const { address } = useAccount();
  const [allowIndex, setAllowIndex] = useState<any>();
  const [showAllowance, setShowAllowance] = useState<boolean>(false);
  
  const { cost } = useOrderStore()
  const btnContent = cost.toString() + "원 결제하기";

  const { data } = useContractRead({
    address: Qkrw_address,
    abi: Qkrw_abi,
    functionName: "allowance",
    args: [address, Quicker_address],
    onSuccess(data) {
      setAllowIndex(data);
    },
  });

  const executePayment = () => {
    if (checkAllowance()) {
      //결제 로직 수행
      console.log("결제로직")
      // 데이터 전송
      // Handler.fetch({})
      
    } else {
      setShowAllowance(true)
    }
  };

  const checkAllowance = (): boolean => {
    if (allowIndex._hex === "0x00") {
      return false;
    }
    return true;
  };

  const showAllowanceFalse = () => {
    setShowAllowance(false)
    setAllowIndex({_hex: "0x1234"})
  }

  useEffect(() => {
    
  })

  return (
    <>
      {showAllowance ? (
        <IncreaseAllowance setShowAllowance={() => showAllowanceFalse()}/>
      ) : (
        <div style={{ backgroundColor: "#efefef" }}>
          <Req setStates={setStates}></Req>
          <ConfirmBtn
            content={btnContent}
            confirmLogic={() => executePayment()}
          />
        </div>
      )}
    </>
  );
}

export default RequestPage;
