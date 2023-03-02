import { timeStamp } from "console";
import { type } from "os";
import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { QUICKER_ADDRESS, QUICKER_CONTRACT_ABI } from "../contractInformation";
import { getDateFromTimestamp } from "../utils/ConvertTimestampToDate";

const contract_abi = QUICKER_CONTRACT_ABI;
const contract_address = QUICKER_ADDRESS;

type OrderProps = {
  orderNum: string;
};

export default function GetOrderContents({ orderNum }: OrderProps) {
  const [objData, setObjData] = useState<any>();

  const { data, isError, isLoading } = useContractRead({
    address: contract_address,
    abi: contract_abi,
    functionName: "getOrder",
    args: [orderNum],
    onSuccess(data) {
      setObjData(data);
    },
  });

  useEffect(() => {
    console.log(objData);
  }, [objData]);

  return (
    <>
      {isLoading ? <div>loading...</div> : <div></div>}
      {isError ? (
        <div>wrong number</div>
      ) : (
        <div>
          Result: <TemplateOrder data={objData} />
        </div>
      )}
    </>
  );
}

const TemplateOrder = ({ data }: { data: any }) => {
  return (
    <>
      <div>의뢰인: {JSON.stringify(data[0])}</div>
      <div>배송원: {JSON.stringify(data[1])}</div>
      <div>상태: {ConvertStateData(data[2])}</div>
      <div>결제가격: {ConvertCostData(data[3])}원</div>
      <div>보증금: {ConvertCostData(data[4])}원</div>
      <div>배송기한: {ConvertDateData(data[5])}</div>
      <div>의뢰시간: {ConvertDateData(data[6])}</div>
      <div>수락시간: {ConvertDateData(data[7])}</div>
      <div>계약완료시간: {ConvertDateData(data[8])}</div>
    </>
  );
};

const ConvertStateData = (state: number): string => {
  const stateArr = ["created", "matched", "completed", "failed", "canceled"];

  const result = stateArr[state];
  return result;
};

const ConvertCostData = (cost: any): string => {
  const result = BigInt(cost._hex).toString();
  return result;
};

const ConvertDateData = (timestamp: any) => {
    const { year, month, day, hours, minutes } = getDateFromTimestamp(timestamp)
    return (<div>{year}/{month}/{day} {hours}:{minutes}</div>)
}