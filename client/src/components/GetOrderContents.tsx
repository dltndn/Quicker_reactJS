import { useEffect, useState } from "react";
// import { QUICKER_ADDRESS, QUICKER_CONTRACT_ABI } from "../contractInformation";
import { getDateFromTimestamp } from "../utils/ConvertTimestampToDate";
import GetQkrwBalance from "./getQkrwBalance";

// const Quicker_abi = QUICKER_CONTRACT_ABI;
// const Quicker_address = QUICKER_ADDRESS;

type OrderProps = {
  orderNum: string;
};

 function GetOrderContents({ orderNum }: OrderProps) {
  const [objData, setObjData] = useState<any>();

  return (
    <>

      {objData === undefined ? (<div>데이터 없음</div>):(<div>Result: <TemplateOrder data={objData} /></div>)}
    </>
  );
}

const TemplateOrder = ({ data }: { data: any }) => {
  let obj = {orderNUm: BigInt(data[0]._hex).toString(),
  client: JSON.stringify(data[1]),
  quicker: JSON.stringify(data[2]),
  state: ConvertStateData(data[3]),
  orderPrice: ConvertCostData(data[4]),
  securityDeposit: ConvertCostData(data[5]),
  limitedTime: ConvertDateData(data[6]),
  createdTime: ConvertDateData(data[7]),
  matchedTime: ConvertDateData(data[8]),
  deliveredTime: ConvertDateData(data[9]),
  completedTime: ConvertDateData(data[10]),}
  return (
    <>
      <div>오더번호: {BigInt(data[0]._hex).toString()}</div><br></br>
      <div>의뢰인: {JSON.stringify(data[1])}</div>
      <div>배송원: {JSON.stringify(data[2])}</div><br></br>
      <div>상태: {ConvertStateData(data[3])}</div><br></br>
      <div>결제가격: {ConvertCostData(data[4])}</div><br></br>
      <div>보증금: {ConvertCostData(data[5])}</div><br></br>
      <div>배송기한: {ConvertDateData(data[6])}</div><br></br>
      <div>의뢰시간: {ConvertDateData(data[7])}</div><br></br>
      <div>수락시간: {ConvertDateData(data[8])}</div><br></br>
      <div>배송완료시간: {ConvertDateData(data[9])}</div><br></br>
      <div>계약완료시간: {ConvertDateData(data[10])}</div><br></br>
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
    result = '-'
  } else {
    result = BigInt(cost._hex).toString() + '원';
  }
  return result;
};

const ConvertDateData = (timestamp: any) => {
  if (timestamp == 0) {
    return '-'
  } else {
    const { year, month, day, hours, minutes } = getDateFromTimestamp(timestamp)
    return (<div>{year}/{month}/{day} {hours}:{minutes}</div>)
  }
}