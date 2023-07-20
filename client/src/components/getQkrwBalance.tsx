import { useContractRead } from "wagmi";
import { useState, useEffect } from "react";
import { QKRW_CONTRACT_ABI, QKRW_ADDRESS } from "../contractInformation";
import { getQkrwBalance } from "../utils/ExecuteOrderFromBlockchain";
import { changeBalanceToForm } from "../utils/CalAny";


type AddressProps = {
  address: string;
};

export default function GetQkrwBalance({ address }: AddressProps) {
  const [krwBalance, setKrwBalance] = useState("0");

 const getQkrwBal = async () => {
  const result = await getQkrwBalance(address)
  const bal = changeBalanceToForm(BigInt(result))
  setKrwBalance(bal)
 }
  useEffect(() => {
    getQkrwBal()
  }, []);

  return (
    <>
      <span>{krwBalance}</span>
    </>
  );
}
