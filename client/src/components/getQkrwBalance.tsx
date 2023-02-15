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


  const { data } = useContractRead({
    address: Qkrw_address,
    abi: Qkrw_abi,
    functionName: "balanceOf",
    args: [address],
    overrides: { from: address },
    onSuccess(data) {
      setObjData(data);
    },
  });

  useEffect(() => {
    objData === undefined
      ? setKrwBalance("0")
      : setKrwBalance(BigInt(objData?._hex).toString().slice(0, -18));
  }, [objData]);

  return (
    <>
      <span>{krwBalance}</span>
    </>
  );
}
