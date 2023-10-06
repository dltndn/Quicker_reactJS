import Handler from "../../lib/Handler";
import { useState, useEffect } from "react";
import {
  getOrderList,
  getOrders,
} from "../../utils/ExecuteOrderFromBlockchain";
import Kakao from "../../lib/Kakao";
import { formatedDate } from "../../utils/ConvertTimestampToDate";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useVerificationStore } from "../../App";
import Lottie from "lottie-react";
import mainLoaing from "../../Lottie/mainLoading.json";
import mainDelivery from "../../Lottie/mainDelivery.json";
import { useConnWalletInfo } from "../../App";
import { MainOrderInformationStyle } from "../../StyleCollection";

const {DelPo, Div0, Div1, Divmain, Divmain1, Sc0, Sc3, Sc4, Sc5, Sp0, Sp1, LotDiv, Notice_div
, Notice_divfont_1, Notice_divfont_2, Img } = new MainOrderInformationStyle()

const note = require("../../image/note.png");
const transaction = require("../../image/transactionstatus.png");
const pin = require("../../image/redPin.png");

export default function MainOrderInformation() {
  const { address } = useConnWalletInfo();
  const [isDelivering, setIsDelivering] = useState<boolean | null>(null);
  const [showOrderObj, setShowOrderObj] = useState<any | null>(null);

  const navigate = useNavigate();

  const getDestination = async (orderNum: number) => {
    const orderNumbers = [orderNum]
    const orderDataFromDB = await Handler.get(
      process.env.REACT_APP_SERVER_URL + "orders/detail?" + "orderIds=" + orderNumbers
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
                <Sp1>배송 의뢰를 시작해보세요!</Sp1>
              </Div1>
              <Sc3>
                <Divmain>
                  <Divmain1>
                    배송을 시작해보세요!
                  </Divmain1>
                  <DelPo>
                    <Lottie animationData={mainDelivery} />
                  </DelPo>
                </Divmain>
              </Sc3>
              <Sc0>
                <Sc4 onClick={() => navigate("/search")}>
                  <Divmain1 >
                    주변 의뢰<br></br>확인하기
                    <Img src={note} />
                  </Divmain1>
                </Sc4>
                <Sc4 onClick={() => navigate("/explorer")}>
                  <Divmain1 >
                    실시간 거래 현황
                    <Img src={transaction} />
                  </Divmain1>
                </Sc4>
              </Sc0>
              <Sc5>
                <Notice_div>
                  <Notice_divfont_1>공지</Notice_divfont_1>
                  <Notice_divfont_2>가나다라마바사</Notice_divfont_2>
                </Notice_div>
              </Sc5>
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
                  <Div1></Div1>
                  <Sc3>
                    <Divmain>
                      <Divmain1>
                      {formatedDate(showOrderObj.limitedTime)} 까지
                      <br></br>
                        {showOrderObj.destination.address_name}에 배달을
                        완료해주세요.
                      <br></br>
                      {showOrderObj.orderPrice}의 수익이 예상돼요!
                      </Divmain1>
                      <DelPo>
                        <Lottie animationData={mainDelivery} />
                      </DelPo>
                    </Divmain>
                  </Sc3>
                  <Sc0>
                    <Sc4 onClick={() => navigate("/fulfillmentlist")}>
                      <Divmain1 >
                        배송 목록<br></br>확인하기
                        <Img src={note} />
                      </Divmain1>
                    </Sc4>
                    <Sc4 onClick={() => navigate("/explorer")}>
                      <Divmain1 >
                        실시간 거래 현황
                        <Img src={transaction} />
                      </Divmain1>
                    </Sc4>
                  </Sc0>
                  <Sc5>
                    <Notice_div>
                      <Notice_divfont_1>공지</Notice_divfont_1>
                      <Notice_divfont_2>가나다라마바사</Notice_divfont_2>
                    </Notice_div>
                  </Sc5>
                </>
              ) : (
                <>
                  <UserName />
                  <Div1>
                    <Sp1>현재 배송원이 물건을 배송중이에요!</Sp1>
                  </Div1>
                  <Sc3>
                    <Divmain>
                      <Divmain1>
                      조금만 기다려주세요!
                      </Divmain1>
                      <DelPo>
                        <Lottie animationData={mainDelivery} />
                      </DelPo>
                    </Divmain>
                  </Sc3>
                  <Sc0>
                    <Sc4 onClick={() => navigate("/orderlist")}>
                      <Divmain1>
                        의뢰 목록<br></br>확인하기
                        <Img src={pin} />
                      </Divmain1>
                    </Sc4>
                    <Sc4 onClick={() => navigate("/explorer")}>
                      <Divmain1>
                        실시간 거래 현황
                        <Img src={transaction} />
                      </Divmain1>
                    </Sc4>
                  </Sc0>
                  <Sc5>
                    <Notice_div>
                      <Notice_divfont_1>공지</Notice_divfont_1>
                      <Notice_divfont_2>가나다라마바사</Notice_divfont_2>
                    </Notice_div>
                  </Sc5>
                </>
              )}
            </>
          )}
        </>
      ) : (
        <LotDiv>
          <Lottie animationData={mainLoaing} />
        </LotDiv>
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

