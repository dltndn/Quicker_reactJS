import { useContractRead } from "wagmi";
import { useState, useEffect } from "react";
import { QKRW_CONTRACT_ABI, QKRW_ADDRESS } from "../contractInformation";
import { getQkrwBalance } from "../utils/ExecuteOrderFromBlockchain";
import { changeBalanceToForm } from "../utils/CalAny";

//Qkrw token contract information - polygon mumbai network
const Qkrw_abi = QKRW_CONTRACT_ABI;
const Qkrw_address = QKRW_ADDRESS;

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
