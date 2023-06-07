import { useState, useEffect } from "react";
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
  const [isDelivered, setIsDelivered] = useState<boolean | undefined>(
    undefined
  );

  const getDeadlineText = async (orderNum: string) => {
    try {
      const blockchainOrder: any = await getOrderRawData(orderNum);
      if (blockchainOrder.deliveredTime.toNumber() === 0) {
        const deadlineHM = formatedDateHM(
          getDateFromTimestamp(blockchainOrder.limitedTime.toNumber())
        );
        setDeadline(deadlineHM);
        setIsDelivered(false)
      } else {
        setIsDelivered(true);
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
    // if (cryptoKey !== undefined) {
    //   getDeadlineText(cryptoKey);
    // }
  }, []);

  return (
    <>
    <button onClick={() => setIsDelivered(true)}>임시 확인페이지 이동버튼</button>
      {isDelivered === undefined ? (
        <>로딩 애니메이션</>
      ) : (
        <>
          {!isDelivered ? (
            <DeliveryStatus orderNum={orderNum} deadline={deadline} />
          ) : (
            <ReceipientConfirm orderNum={orderNum}/>
          )}
        </>
      )}
    </>
  );
}
