import { useContractRead } from "wagmi";
import { useState, useEffect } from "react";
import { QKRW_CONTRACT_ABI, QKRW_ADDRESS } from "../contractInformation";

//Qkrw token contract information - polygon mumbai network
const Qkrw_abi = QKRW_CONTRACT_ABI;
const Qkrw_address = QKRW_ADDRESS;

type AddressProps = {
  address: `0x${string}`;
};

export default function GetQkrwBalance({ address }: AddressProps) {
  const [krwBalance, setKrwBalance] = useState("0");
  const [objData, setObjData] = useState<any>();

  const changeBalanceToForm = (balance:BigInt):string => {
    let result = parseInt(balance.toString().slice(0, -18))
    return result.toLocaleString()
  }

  const { data } = useContractRead({
    address: Qkrw_address,
    abi: Qkrw_abi,
    functionName: "balanceOf",
    args: [address],
    onSuccess(data) {
      setObjData(data);
    },
  });

  useEffect(() => {
    objData === undefined
      ? setKrwBalance("0")
      : setKrwBalance(changeBalanceToForm(BigInt(objData?._hex)));
  }, [objData]);

  return (
    <>
      <span>{krwBalance}</span>
    </>
  );
}
