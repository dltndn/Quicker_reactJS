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
      console.log(data)
    },
    onError(error) {
      console.log('Error', error)
    },
  });

  return (
    <>
      {isLoading ? <div>loading...</div> : <div></div>}
      {objData === undefined ? (<div>데이터 없음</div>):(<div>Result: <TemplateOrder data={objData} /></div>)}
    </>
  );
}

const TemplateOrder = ({ data }: { data: any }) => {
  return (
    <>
      <div>의뢰인: {JSON.stringify(data[0])}</div>
      <div>배송원: {JSON.stringify(data[1])}</div>
      <div>상태: {ConvertStateData(data[2])}</div>
      <div>결제가격: {ConvertCostData(data[3])}</div>
      <div>보증금: {ConvertCostData(data[4])}</div>
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
  let result = ''
  if (cost == 0) {
    result = '배송원 매칭x'
  } else {
    result = BigInt(cost._hex).toString() + '원';
  }
  return result;
};

const ConvertDateData = (timestamp: any) => {
  if (timestamp == 0) {
    return '배송원 매칭x'
  } else {
    const { year, month, day, hours, minutes } = getDateFromTimestamp(timestamp)
    return (<div>{year}/{month}/{day} {hours}:{minutes}</div>)
  }
}