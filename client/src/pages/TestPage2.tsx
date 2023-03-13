import GetOrderContents from "../components/GetOrderContents";
import CreateNewOrder from "../components/createNewOrder";
import { useState, useEffect } from "react";

export default function TestPage2() {
  const [orderNum, setOrderNum] = useState<string>("0");
  const [orderPrice, setOrderPrice] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");


  const handleClick = (e: any) => {
    const newOrderNum = e.target.previousSibling.value;
    setOrderNum(newOrderNum);
  };

  return (
    <>
      <div>오더 생성하기(의뢰인)</div>
      <input
        placeholder="오더가격"
        value={orderPrice}
        onChange={(e) => setOrderPrice(e.target.value)}
      />
      <input
        placeholder="마감기한"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <CreateNewOrder _orderPrice={orderPrice} _deadLine={deadline} />
      <div>오더 조회하기</div>
      <input placeholder="오더번호" />
      <button onClick={handleClick}>오더 내용 확인</button><br></br>
      <GetOrderContents orderNum={orderNum}></GetOrderContents>
    </>
  );
}
