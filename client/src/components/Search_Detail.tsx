import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import ConfirmBtn from "./confirmBtn";
import { useSearchState } from "../pages/SearchPage";
import { lazy, useEffect, useState } from "react";
import { OrderObj } from "../pages/SearchPage";
import { useOrderStore } from "../pages/commission";
import Handler from "../lib/Handler";
import { SendDataToAndroid } from "../utils/SendDataToAndroid";
import { useOrderState } from "./ShowOrders";
import { UseUserOrderState } from "../App";
import {
  NaverMapDeepLinkButton,
  KakaoMapDeepLinkButton,
} from "./searchComponents/MapAppButton";
import SendTxK from "./blockChainTx/SendTxK";
import GetContractParams from "./blockChainTx/GetContractParams";
import { useConnWalletInfo } from "../App";
import { getAllowance } from "../utils/ExecuteOrderFromBlockchain";
import { Search_DetailStyle } from "../StyleCollection";
import SuspenseComponent from "./SuspenseComponent";

const {Div0, Div0_1, Div1, Div1_1, Div1_2, Div2, Div3, Div3_1, Div3_1_1, Div3_2, Div3_2_1, Div4, 
Div4_1, Div5, Div5_1, Divpo, Se0, SelectInput, Margin_1, Circle } = new Search_DetailStyle()

const money = require("../image/money.png");

function Search_Detail() {
  const navigator = useNavigate();
  const { address } = useConnWalletInfo();
  const { orders, showOrder, setIsDetail } = useSearchState();
  const { setRefreshOrder } = useOrderState();
  const { userOrderNumStateTrigger, setUserOrderNumStateTrigger } =
    UseUserOrderState();
  const [showTxBtn, setShowTxBtn] = useState<boolean>(false);
  const { showAllowance, setShowAllowance } = useOrderStore();
  let order: OrderObj | undefined;
  order = orders && showOrder !== undefined ? orders[showOrder] : undefined;

  const IncreaseAllowance = lazy(() => import("./IncreaseAllowance"))

  const setMatchedOrderNum = async () => {
    const timeoutId = setTimeout(async () => {
      setUserOrderNumStateTrigger(userOrderNumStateTrigger + 1);
      console.log("setUserOrderNumStateTrigger 작동");
    }, 5000);
    return () => clearTimeout(timeoutId);
  };

  // 수락하기 로직
  const acceptOrder = async () => {
    if (showOrder !== undefined) {
      const sdta = new SendDataToAndroid(address);
      try {
        const requestTosServer = await Handler.patch({
          orderId : order!.orderNum,
          userWalletAddress : address
        }, process.env.REACT_APP_SERVER_URL + "order")
        console.log(requestTosServer)
        // Android로 isDelivering 데이터 true값 전송
        sdta.sendIsDelivering(true);
        setRefreshOrder(true);
        await setMatchedOrderNum();
        navigator("/");
      } catch (e) {
        console.log(e);
        alert("여기서 에러나면 많이 심각한 에러임");
      }
    }
  };

  const validateAllowance = async () => {
    const allowanceData: any = await getAllowance(address);
    if (allowanceData === 0) {
      setShowAllowance(true);
      return;
    }
  };

  useEffect(() => {
    // 토큰 사용 권한 체크 로직
    validateAllowance();
    return () => {
      setShowTxBtn(false);
      setIsDetail(false);
    };
  }, []);

  return (
    <>
      {showAllowance ? (
        <SuspenseComponent component={<IncreaseAllowance />}/>
      ) : (
        <>
          {order && (
            <>
              <Se0>
                <Div0>
                  <Div0_1>
                    <Circle />
                    <Circle />
                    <Circle />
                    <Circle />
                    <Circle />
                    <Circle />
                  </Div0_1>
                </Div0>
                <Div1>
                  <Div1_1>
                    {order.departure}
                    <KakaoMapDeepLinkButton
                      address={address}
                      order={order}
                      isUsingCurrent={true}
                    />
                    <NaverMapDeepLinkButton
                      address={address}
                      order={order}
                      isUsingCurrent={true}
                    />
                    <br />
                    <Div1_2>{order.dep_detail}(픽업지)</Div1_2>
                  </Div1_1>
                </Div1>
                <Div2>
                  <Div1_1>
                    {order.destination}
                    <KakaoMapDeepLinkButton
                      address={address}
                      order={order}
                      isUsingCurrent={false}
                    />
                    <NaverMapDeepLinkButton
                      address={address}
                      order={order}
                      isUsingCurrent={false}
                    />
                    <br />
                    <Div1_2>{order.des_detail}(배송지)</Div1_2>
                  </Div1_1>
                </Div2>
                <Div3>
                  <Div3_1>
                    <Div3_2>물품 부피</Div3_2>
                    <Div3_2>물품 중량</Div3_2>
                  </Div3_1>
                  <Div3_1_1>
                    <Div3_2_1>{order.volume}</Div3_2_1>
                    <Div3_2_1>{order.weight}</Div3_2_1>
                  </Div3_1_1>
                </Div3>
                <Div4>
                  <Div3_1>
                    <Div3_2>세부사항</Div3_2>
                  </Div3_1>
                  <Div3_1_1>
                    <Div3_2_1>{order.detail}</Div3_2_1>
                  </Div3_1_1>
                </Div4>
                <Div4>
                  <Div3_1>
                    <Div3_2>배송기한</Div3_2>
                  </Div3_1>
                  <Div3_1_1>
                    <Div3_2_1>{order.deadline}</Div3_2_1>
                  </Div3_1_1>
                </Div4>
                <Div4_1>
                  <Div3_1>
                    <Div3_2>운송수단</Div3_2>
                  </Div3_1>
                  <SelectInput name="ex">
                    {order.transportation.map((value, index) => (
                      <option key={index}>{value}</option>
                    ))}
                  </SelectInput>
                </Div4_1>
                <Div5>
                  <div>
                    수익
                    <br />
                    <Div5_1>보증금</Div5_1>
                  </div>
                  <Divpo>
                    {order.income}
                    <br />
                    <Div5_1>{order.securityDeposit}</Div5_1>
                  </Divpo>
                </Div5>
              </Se0>

              {!showTxBtn ? (
                <ConfirmBtn
                  isDisabled={false} // 여기서 인풋 값 검증
                  content="수락하기"
                  confirmLogic={() => {
                    setShowTxBtn(true);
                  }}
                />
              ) : (
                <Margin_1>
                <SendTxK
                  param={GetContractParams.AcceptOrder(
                    // @ts-ignore
                    orders[showOrder].orderNum.toString()
                  )}
                  successFunc={async () => {
                    await acceptOrder();
                  }}
                />
                </Margin_1>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}

export default Search_Detail;

const scaleBounce = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
`;

