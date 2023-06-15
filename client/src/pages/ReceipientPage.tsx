import { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useParams } from "react-router-dom";
import DeliveryStatus from "../components/deliveryProgress/DeliveryStatus";
import ReceipientConfirm from "../components/deliveryProgress/ReceipientConfirm";
import { getOrderRawData } from "../utils/ExecuteOrderFromBlockchain";
import {
  getDateFromTimestamp,
  formatedDateHM,
} from "../utils/ConvertTimestampToDate";
import { decrypt } from "../lib/cryto";
import { queryStringParser } from "../lib/parseQueryString";
import { create } from "zustand";

export interface isLive {
  isLive : boolean,
  setIsLive : Function
}

export const useLiveState = create<isLive>((set) => ({
  isLive : true,
  setIsLive : (isLive: boolean) => set({isLive}),
}));

export default function ReceipientPage() {
  const queryString = useLocation();
  const [orderNum, setOrderNum] = useState<string | undefined>(undefined);
  const [deadline, setDeadline] = useState<string>("-:-");
  const [isDelivered, setIsDelivered] = useState<boolean | undefined>(undefined);
  const [isLive, setIsLive] = useState<boolean>(true);
  const [deiverWalletAddress, setDeiverWalletAddress] = useState(null)

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
    if( orderNum !== undefined ) {
      console.log(orderNum)
    }
  
  }, [orderNum]);

  useEffect(() => {
    const qeuryObject = queryStringParser(window.location.search)
    // @ts-ignore
    const queryData = decrypt(qeuryObject.key)
    console.log(queryData)
    // setOrderNum(복호화된 orderNum)
    setOrderNum(queryData.orderId)
    // getDeadlineText(복호화된 orderNum)
    getDeadlineText(queryData.orderId)
    
    setDeiverWalletAddress(queryData.userWalletAddress)
  }, []);

  return (
    <>
    <Div0>
            <Div1>
            <Btwal onClick={() => setIsLive(true)} autoFocus>물품위치</Btwal> 
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
            <ReceipientConfirm orderNum={orderNum} validationInfo={deiverWalletAddress}/>
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