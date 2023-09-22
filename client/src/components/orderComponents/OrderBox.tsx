import React, { CSSProperties, Suspense, lazy, useEffect, useState } from "react";
import styled from "styled-components";
import { useOrderState } from "../ShowOrders";
import { formatedDate } from "../../utils/ConvertTimestampToDate";
import { calQuickerIncome, extractNumber } from "../../utils/CalAny";
import {
  formatedDateHM,
  formatedDateYMD,
} from "../../utils/ConvertTimestampToDate";
import { BsFillCircleFill, BsStickies, BsX } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useConnWalletInfo } from "../../App";
import GetContractParams from "../blockChainTx/GetContractParams";
import { OrderBoxStyle } from "../../StyleCollection";

const {Div0, Div1, DivBs, Order_Div, Order_Div_detail, Order_Hr, Order_Span_mc_ab, Order_Span_mc_detail,
Order_Span_mc_left, Order_Span_md1, Order_Span_md1_blue, Order_Span_md1_blue_left, Order_Span_md1_grey,
Order_Span_md1_left, Order_Span_md_bold, Sp0, Sp1, Sp2, Sp3, Spprofit0, Spprofit2, Spsc0, Spsc1,
Spsc2, StateDiv} = new OrderBoxStyle()

interface OrderBoxProps {
  orderObj: any;
  isClient: boolean;
}

export function OrderBox({ orderObj, isClient }: OrderBoxProps) {
  const [incomeData, setIncomeData] = useState<string | null>(null)
  
  useEffect(() => {
    const getIncome = async() => {
      let orderPriceNum: number;
      if (orderObj) {
        if (!isClient) {
          if (orderObj.orderPrice === null) {
            orderPriceNum = 0;
          } else {
            orderPriceNum = extractNumber(orderObj.orderPrice);
          }
          setIncomeData(await calQuickerIncome(orderPriceNum)) 
        }
      }
    }
    getIncome()
  }, [orderObj])  

  return (
    <>
      {orderObj === null ? (
        <>
          <Div0>블록체인에서 데이터를 가져오고 있어요</Div0>
        </>
      ) : (
        <>
          {isClient ? (
            <>
              <Div0>
                <Sp0>접수중</Sp0>
                <Sp1>{formatedDate(orderObj.createdTime)}</Sp1>
                <ViewState orderObj={orderObj} isClient={isClient} />
              </Div0>
              <Div1>
                <Sp2>출발지</Sp2>
                <Sp1>
                  {orderObj.realdepartureAdress !== undefined
                    ? orderObj.realdepartureAdress.address_name
                    : "없음"}
                </Sp1>
              </Div1>
              <Div1>
                <Sp2>도착지</Sp2>
                <Sp1>
                  {orderObj.realdestinationAdress !== undefined
                    ? orderObj.realdestinationAdress.address_name
                    : "없음"}
                </Sp1>
              </Div1>
              <Div1>
                <Sp2>금액</Sp2>
                <Sp3>{orderObj.orderPrice}</Sp3>
              </Div1>
            </>
          ) : (
            <>
              <Div0>
                <Sp0>도보</Sp0>
                <Sp1>{formatedDateYMD(orderObj?.matchedTime)}</Sp1>
                <ViewState orderObj={orderObj} isClient={isClient} />
              </Div0>
              <Div1>
                <Sp2>
                  {orderObj.realdepartureAdress !== undefined
                    ? orderObj.realdepartureAdress.address_name
                    : "없음"}
                </Sp2>
              </Div1>
              <DivBs>
                <BsFillCircleFill />
                <BsFillCircleFill />
                <BsFillCircleFill />
              </DivBs>
              <Div1>
                <Sp2>
                  {orderObj.realdestinationAdress !== undefined
                    ? orderObj.realdestinationAdress.address_name
                    : "없음"}
                </Sp2>
              </Div1>
              <Div1>
                <Spsc0>수익</Spsc0>
                <Spsc1>{incomeData}원</Spsc1>
              </Div1>
              <Div1>
                <Spprofit2>
                  수락 시간 {formatedDateHM(orderObj.matchedTime)}
                </Spprofit2>
                <Spsc2>
                  완료 시간{" "}
                  {orderObj.deliveredTime &&
                    formatedDateHM(orderObj.deliveredTime)}
                </Spsc2>
              </Div1>
            </>
          )}
        </>
      )}
    </>
  );
}

interface OrderModalProps {
  isClient: boolean;
}

export function OrderModal({ isClient }: OrderModalProps) {
  const { address } = useConnWalletInfo();
  const { order } = useOrderState() as any;
  const { setOrder, isModalOpen, setIsModalOpen } = useOrderState();
  const [incomeData, setIncomeData] = useState<string | null>(null)
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setOrder(null);
  };

  const getIncome = async() => {
    let orderPriceNum: number;
    if (order) {
      if (!isClient) {
        if (order.orderPrice === null) {
          orderPriceNum = 0;
        } else {
          orderPriceNum = extractNumber(order.orderPrice);
        }
        setIncomeData(await calQuickerIncome(orderPriceNum)) 
      }
    }
  }

  useEffect(() => {
    getIncome()
  }, [order])  

  const modalStyle: CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const boxStyle: CSSProperties = {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    position: "relative",
    borderRadius: "10px",
  };

  const buttonStyle: CSSProperties = {
    position: "absolute",
    top: 10,
    right: 10,
    border: "none",
    boxShadow: "none",
    outline: "none",
    fontSize: "25px",
    backgroundColor: "#fff",
  };

  useEffect(() => {
    return () => {
      handleCloseModal();
    };
  }, []);

  useEffect(() => {
    // 모달이 열렸을 때 body의 overflow 스타일 속성을 hidden으로 변경
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
  }, [isModalOpen]);

  return (
    <>
      {isModalOpen && (
        <div style={modalStyle}>
          <div style={boxStyle}>
            <>
              <button onClick={() => handleCloseModal()} style={buttonStyle}>
                <BsX />
              </button>
              {isClient ? (
                <>
                  <Order_Div>
                    <Order_Span_md_bold>주문 상세</Order_Span_md_bold>
                    <ViewState orderObj={order} isClient={true} />
                  </Order_Div>
                  <Order_Div_detail>
                    <Order_Span_md1_grey>수락 시간</Order_Span_md1_grey>
                    {order?.matchedTime === null ? (
                      <Order_Span_md1_left>-</Order_Span_md1_left>
                    ) : (
                      <Order_Span_md1_left>
                        {formatedDate(order?.matchedTime)}
                      </Order_Span_md1_left>
                    )}
                  </Order_Div_detail>
                  <Order_Div_detail>
                    <Order_Span_md1_grey>도착 시간</Order_Span_md1_grey>
                    {order?.deliveredTime === null ? (
                      <Order_Span_md1_left>-</Order_Span_md1_left>
                    ) : (
                      <Order_Span_md1_left>
                        {formatedDate(order?.deliveredTime)}
                      </Order_Span_md1_left>
                    )}
                  </Order_Div_detail>
                  <Order_Div_detail>
                    <Order_Span_md1_grey>출발지</Order_Span_md1_grey>
                    <Order_Span_md1_left>
                      {order.realdepartureAdress !== undefined
                        ? order.realdepartureAdress.address_name
                        : "없음"}
                      <br />
                      <Order_Span_mc_ab>
                        {order.realdepartureAdress !== undefined
                          ? order.realdepartureAdress.DETAIL
                          : "없음"}
                      </Order_Span_mc_ab>
                    </Order_Span_md1_left>
                  </Order_Div_detail>
                  <Order_Div_detail>
                    <Order_Span_md1_grey>발송인</Order_Span_md1_grey>
                    <Order_Span_md1_left>
                      {order.Sender.NAME !== undefined
                        ? order.Sender.NAME
                        : "없음"}
                    </Order_Span_md1_left>
                  </Order_Div_detail>
                  <Order_Div_detail>
                    <Order_Span_md1_grey>도착지</Order_Span_md1_grey>
                    <Order_Span_md1_left>
                      {order.realdestinationAdress.address_name !== undefined
                        ? order.realdestinationAdress.address_name
                        : "없음"}
                      <br />
                      <Order_Span_mc_ab>
                        {order.realdestinationAdress !== undefined
                          ? order.realdestinationAdress.DETAIL
                          : "없음"}
                      </Order_Span_mc_ab>
                    </Order_Span_md1_left>
                  </Order_Div_detail>
                  <Order_Div_detail>
                    <Order_Span_md1_grey>수령인</Order_Span_md1_grey>
                    <Order_Span_md1_left>
                      {order.Recipient.NAME !== undefined
                        ? order.Recipient.NAME
                        : "없음"}
                    </Order_Span_md1_left>
                  </Order_Div_detail>
                  <Order_Div_detail>
                    <Order_Span_md1_grey>물품 세부 정보</Order_Span_md1_grey>
                    <Order_Span_md1_left>
                      {order.DETAIL !== undefined ? order.DETAIL : "없음"}
                      <br />
                      <Order_Span_mc_ab>
                        {order.Product !== undefined
                          ? order.Product.WEIGHT
                          : "없음"}
                        kg
                      </Order_Span_mc_ab>
                    </Order_Span_md1_left>
                  </Order_Div_detail>
                  <Order_Hr />
                  <Order_Div_detail>
                    <Order_Span_md1_blue>수익</Order_Span_md1_blue>
                    <Order_Span_md1_blue_left>
                      {order?.orderPrice}
                    </Order_Span_md1_blue_left>
                  </Order_Div_detail>
                  <Order_Div_detail>
                    <Order_Span_md1_grey>결제 일시</Order_Span_md1_grey>
                    <Order_Span_md1_left>
                      {formatedDate(order?.createdTime)}
                    </Order_Span_md1_left>
                  </Order_Div_detail>
                  <BottomBtn order={order} address={address} />
                </>
              ) : (
                <>
                  <Order_Div>
                    <Order_Span_md_bold>세부 정보</Order_Span_md_bold>
                  </Order_Div>
                  <Order_Div_detail>
                    <Order_Span_md1_grey>배송 기한</Order_Span_md1_grey>
                    <Order_Span_md1_left>
                      {formatedDate(order?.limitedTime)}
                    </Order_Span_md1_left>
                  </Order_Div_detail>
                  <Order_Hr />
                  <Order_Div_detail>
                    <Order_Span_md1_grey>출발지</Order_Span_md1_grey>
                    <Order_Span_md1_left>
                      {order.realdepartureAdress !== undefined
                        ? order.realdepartureAdress.address_name
                        : "없음"}
                      <br />
                      <Order_Span_mc_ab>
                        {order.realdepartureAdress !== undefined
                          ? order.realdepartureAdress.DETAIL
                          : "없음"}
                      </Order_Span_mc_ab>
                    </Order_Span_md1_left>
                    <Order_Span_mc_left>
                      <BsStickies />
                    </Order_Span_mc_left>
                  </Order_Div_detail>
                  <Order_Div_detail>
                    <Order_Span_md1_grey>발송인</Order_Span_md1_grey>
                    <Order_Span_md1_left>
                      {order.Sender.NAME !== undefined
                        ? order.Sender.NAME
                        : "없음"}
                    </Order_Span_md1_left>
                  </Order_Div_detail>
                  <Order_Div_detail>
                    <Order_Span_md1_grey>연락처</Order_Span_md1_grey>
                    <Order_Span_md1_left>
                      {order.Sender.PHONE !== undefined
                        ? order.Sender.PHONE
                        : "없음"}
                    </Order_Span_md1_left>
                    <Order_Span_mc_left>
                      <BsStickies />
                    </Order_Span_mc_left>
                  </Order_Div_detail>
                  <Order_Hr />
                  <Order_Div_detail>
                    <Order_Span_md1_grey>도착지</Order_Span_md1_grey>
                    <Order_Span_md1_left>
                      {order.realdestinationAdress !== undefined
                        ? order.realdestinationAdress.address_name
                        : "없음"}
                      <br />
                      <Order_Span_mc_ab>
                        {order.realdestinationAdress !== undefined
                          ? order.realdestinationAdress.DETAIL
                          : "없음"}
                      </Order_Span_mc_ab>
                    </Order_Span_md1_left>
                    <Order_Span_mc_left>
                      <BsStickies />
                    </Order_Span_mc_left>
                  </Order_Div_detail>
                  <Order_Div_detail>
                    <Order_Span_md1_grey>수령인</Order_Span_md1_grey>
                    <Order_Span_md1_left>
                      {order.Recipient.NAME !== undefined
                        ? order.Recipient.NAME
                        : "없음"}
                    </Order_Span_md1_left>
                  </Order_Div_detail>
                  <Order_Div_detail>
                    <Order_Span_md1_grey>연락처</Order_Span_md1_grey>
                    <Order_Span_md1_left>
                      {order.Recipient.PHONE !== undefined
                        ? order.Recipient.PHONE
                        : "없음"}
                    </Order_Span_md1_left>
                    <Order_Span_mc_left>
                      <BsStickies />
                    </Order_Span_mc_left>
                  </Order_Div_detail>
                  <Order_Hr />
                  <Order_Div_detail>
                    <Order_Span_md1_grey>물품 세부 정보</Order_Span_md1_grey>
                    <Order_Span_md1_left>
                      {order.DETAIL !== undefined ? order.DETAIL : "없음"}
                      <br />
                      <Order_Span_mc_detail>
                        {order.Product.WEIGHT}kg 이상
                      </Order_Span_mc_detail>
                    </Order_Span_md1_left>
                  </Order_Div_detail>
                  <Order_Hr />
                  <Order_Div_detail>
                    <Order_Span_md1_blue>수익</Order_Span_md1_blue>
                    <Order_Span_md1_blue_left>
                      {incomeData}
                    </Order_Span_md1_blue_left>
                  </Order_Div_detail>
                  <QuickerBottomBtn order={order} />
                </>
              )}
            </>
          </div>
        </div>
      )}
    </>
  );
}

const ViewState = ({ orderObj, isClient }: OrderBoxProps) => {
  switch (orderObj?.state) {
    case "created":
      return <StateDiv color="#9d9d9d">대기</StateDiv>;
    case "matched":
      if (isClient) {
        return <StateDiv color="#28a745">수락</StateDiv>;
      } else {
        return <StateDiv color="#28a745">수행중</StateDiv>;
      }
    case "completed":
      return <StateDiv color="#0d6efd">완료</StateDiv>;
    case "failed":
      return <StateDiv color="#dc3545">실패</StateDiv>;
    case "canceled":
      return <StateDiv color="#dc9935">취소</StateDiv>;
    default:
      return <StateDiv color="#9d9d9d">대기</StateDiv>;
  }
};

const  Button = styled.button`
width: 100%;
height: 4.313rem;
font-size: 30px;
border-radius: 0.313rem;
border-color: var(--black-color);
border-width: thin;
background-color: var(--white-color);
color: var(--black-color);
font-weight: bold;
font-size: var(--font-md);
margin-top: 1rem;
`;

interface BottomBtnProps {
  order: any;
  address: string | undefined;
}
// 모달 하단 버튼 컴포넌트
const BottomBtn = ({ order, address }: BottomBtnProps) => {
  const { setOrder, setIsModalOpen, setReloadOrderNum } = useOrderState();
  const [showTxBtn, setShowTxBtn] = useState<boolean>(false);
  const navigate = useNavigate();

  const SendTxK = lazy(() => import("../blockChainTx/SendTxK"))

  useEffect(() => {
    return () => {
      setShowTxBtn(false);
    };
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
    setOrder(null);
  };

  // 거래 확인 로직
  const completeLogic = () => {
    closeModal();
  };

  const redirectExecutionPage = () => {
    navigate(`/client_confirm/${order.orderNum}`);
  };
  // 다시 의뢰하기 로직
  const cancelLogic = () => {
    console.log("다시 의뢰하기 로직 구현");
    // 의뢰하기 페이지 리다이렉트
    navigate("/commission");
  };
  switch (order?.state) {
    case "created":
      return (
        <>
          {!showTxBtn ? (
            <Button onClick={() => setShowTxBtn(true)}>주문취소</Button>
          ) : (
            <Suspense fallback={<div>Loading...</div>}>
              <SendTxK
              param={GetContractParams.CancelOrder(order.orderNum)}
              successFunc={() => {
                setReloadOrderNum(order.orderNum);
                closeModal();
              }}
            />
            </Suspense>
          )}
        </>
      );
    case "matched":
      return (
        <Button onClick={() => redirectExecutionPage()}>배송현황확인</Button>
      );
    case "completed":
      return <Button onClick={() => completeLogic()}>거래완료</Button>;
    case "failed":
      return (
        <Button onClick={() => redirectExecutionPage()}>실패사유확인</Button>
      );
    case "canceled":
      return <Button onClick={() => cancelLogic()}>다시의뢰하기</Button>;
    default:
      return <Button onClick={() => cancelLogic()}>다시의뢰하기</Button>;
  }
};

const QuickerBottomBtn = ({ order }: any) => {
  const navigate = useNavigate();
  const { setOrder, setIsModalOpen } = useOrderState();

  const closeModal = () => {
    setIsModalOpen(false);
    setOrder(null);
  };

  const acceptLogic = () => {
    closeModal();
    navigate(`/execution/${order.orderNum}`);
  };

  switch (order?.state) {
    case "completed":
      return <Button onClick={() => acceptLogic()}>확인</Button>;
    case "failed":
      return <Button onClick={() => closeModal()}>확인</Button>;
    default:
      return <Button onClick={() => acceptLogic()}>수행 현황</Button>;
  }
};

