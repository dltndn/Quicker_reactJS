import Handler from "../../lib/Handler";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import {
  getOrderList,
  getOrders,
} from "../../utils/ExecuteOrderFromBlockchain";
import Kakao from "../../lib/Kakao";
import { formatedDate } from "../../utils/ConvertTimestampToDate";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useVerificationStore } from "../../App";

export default function MainOrderInformation() {
  const { address } = useAccount();
  const [isDelivering, setIsDelivering] = useState<boolean | null>(null);
  const [showOrderObj, setShowOrderObj] = useState<any | null>(null);

  const navigate = useNavigate();

  const getDestination = async (orderNum: number) => {
    const orderDataFromDB = await Handler.post(
      { list: orderNum },
      process.env.REACT_APP_SERVER_URL + "orderlist"
    );
    return orderDataFromDB[0].Destination;
  };

  const getLatestMatchedOrder = async (isClient: boolean) => {
    const obj = { orderNum: "-1" };
    try {
      const orderList = await getOrderList(address, isClient);
      if (orderList?.length === 0) {
        return obj;
      }
      const result = await getOrders(orderList);
      const reversedResult = result.slice().reverse();
      for (const order of reversedResult) {
        if (order.state === "matched") {
          return order;
        }
      }
      return obj;
    } catch (e) {
      console.log(e);
    }
  };

  const getOrderToShow = async () => {
    const clientResult = await getLatestMatchedOrder(true);
    const quickerResult = await getLatestMatchedOrder(false);
    const clientOrderNum = Number(clientResult.orderNum);
    const quickerOrderNum = Number(quickerResult.orderNum);
    if (clientOrderNum === quickerOrderNum) {
      setShowOrderObj({});
    } else if (quickerOrderNum === -1) {
      setIsDelivering(false);
      setShowOrderObj(clientResult);
      // 배송 현황 리다이렉트 버튼 제공
    } else {
      setIsDelivering(true);
      const destinationInfo = await getDestination(quickerOrderNum);
      let destinationAddress = await Kakao.reverseGeoCording(
        destinationInfo.Y,
        destinationInfo.X
      );
      quickerResult["destination"] = destinationAddress;
      setShowOrderObj(quickerResult);
    }
  };

  useEffect(() => {
    getOrderToShow();
  }, [address]);

  return (
    <>
      {showOrderObj !== null ? (
        <>
          {isDelivering === null ? (
            <>
              <UserName />
              <Div1>
                <Sp1>물건 배송을 의뢰하거나 직접 배달을 해보세요</Sp1>
                <div>앱 사용 설명을 간단하게 해야되나</div>
              </Div1>
            </>
          ) : (
            <>
              {isDelivering ? (
                <>
                  <UserName />
                  <Div1>
                    <Sp1
                      onClick={() =>
                        navigate(`/execution/${showOrderObj.orderNum}`)
                      }
                    >
                      현재 물건을 배송중이세요 {">"}
                    </Sp1>
                  </Div1>
                  <div>{formatedDate(showOrderObj.limitedTime)} 까지</div>
                  <br></br>
                  <div>
                    {showOrderObj.destination.address_name}에 배달을
                    완료해주세요
                  </div>
                  <br></br>
                  <div>{showOrderObj.orderPrice}의 수익이 예상돼요!</div>
                  <br></br>
                  <div>배달 하는 애니메이션</div>
                </>
              ) : (
                <>
                  <UserName />
                  <Div1>
                    <Sp1
                      onClick={() =>
                        navigate(`/client_confirm/${showOrderObj.orderNum}`)
                      }
                    >
                      현재 배송원이 물건을 배송중이에요 {">"}
                    </Sp1>
                  </Div1>
                  <div>배달 오는 애니메이션</div>
                </>
              )}
            </>
          )}
        </>
      ) : (
        <>메인 로딩 애니메이션</>
      )}
    </>
  );
}

const UserName = () => {
  const { userName } = useVerificationStore();
  return (
    <>
      <section>
        <Div0>
          <Sp0>
            {userName}님!
            <br />
          </Sp0>
        </Div0>
      </section>
    </>
  );
};

const Div0 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Div1 = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Sp0 = styled.div`
  padding: var(--padding) var(--padding) 0 var(--padding);
  font-size: var(--font-md);
  font-weight: bold;
`;

const Sp1 = styled.span`
  padding-top: var(--padding);
  padding-left: var(--padding);
  padding-bottom: var(--padding);
  font-size: var(--font-md);
  font-weight: bold;
`;
