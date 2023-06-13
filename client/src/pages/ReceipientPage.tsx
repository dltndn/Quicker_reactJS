import { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import DeliveryStatus from "../components/deliveryProgress/DeliveryStatus";
import ReceipientConfirm from "../components/deliveryProgress/ReceipientConfirm";
import { getOrderRawData } from "../utils/ExecuteOrderFromBlockchain";
import {
  getDateFromTimestamp,
  formatedDateHM,
} from "../utils/ConvertTimestampToDate";

export default function ReceipientPage() {
  const { cryptoKey } = useParams();
  const [orderNum, setOrderNum] = useState<string | undefined>(undefined);
  const [deadline, setDeadline] = useState<string>("-:-");
  const [isDelivered, setIsDelivered] = useState<boolean | undefined>(undefined);
  const [isLive, setIsLive] = useState<boolean>(true)

  const getDeadlineText = async (orderNum: string) => {
    try {
      const blockchainOrder: any = await getOrderRawData(orderNum);
      if (blockchainOrder.deliveredTime.toNumber() === 0) {
        const deadlineHM = formatedDateHM(
          getDateFromTimestamp(blockchainOrder.limitedTime.toNumber())
        );
        setDeadline(deadlineHM);
        setIsDelivered(false)
        setIsLive(true)
      } else {
        setIsDelivered(true);
        setIsLive(false)
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log(cryptoKey);
    // cryptoKey로 orderNum 복호화
    // setOrderNum(복호화된 orderNum)
    // getDeadlineText(복호화된 orderNum)
    
    // test code
    setOrderNum(cryptoKey);

    // 지도 작업을 위해 임시로 값 변경
    setIsDelivered(false);
    if (cryptoKey !== undefined) {
      getDeadlineText(cryptoKey);
    }
  }, []);

  return (
    <>
    <button onClick={() => setIsDelivered(true)}>임시 확인페이지 이동버튼</button>
    <Div0>
            <Div1>
            <Btwal onClick={() => setIsLive(true)} autoFocus>물품위치현황</Btwal> 
            </Div1>
            <Div1>
            <Btwal onClick={() => setIsLive(false)}>물품전달</Btwal>
            </Div1>
        </Div0>
      {isDelivered === undefined ? (
        <>로딩 애니메이션</>
      ) : (
        <>
          {isLive ? (
            <DeliveryStatus orderNum={orderNum} deadline={deadline} />
          ) : (
            <ReceipientConfirm orderNum={orderNum}/>
          )}
        </>
      )}
    </>
  );
}

const Div0 = styled.div`
    display: flex;
    height: 3.875rem;
`;

const Div1 = styled.div`
    flex: 1 1 50%;
`;

const Btwal = styled.button`
width: 100%;
height: 2.25rem;
font-size: var(--font-md1);
font-weight: bold;
border: 0rem;
outline: #efefef;
background-color: #ffffff;
padding-left: 0.625rem;
text-align: center;

&:focus {
    border-bottom: 0.125rem solid #0070f3;
  }

`;