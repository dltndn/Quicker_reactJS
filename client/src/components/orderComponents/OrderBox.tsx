import React, { CSSProperties, useEffect } from "react";
import styled from "styled-components";
import { useOrderState } from "../ShowOrders";
import { formatedDate } from "../../utils/ConvertTimestampToDate";
import { calQuickerIncome, extractNumber } from "../../utils/CalAny";
import {
  formatedDateHM,
  formatedDateYMD,
} from "../../utils/ConvertTimestampToDate";
import { BsFillCircleFill, BsStickies, BsX } from "react-icons/bs";

interface OrderBoxProps {
  orderObj: any;
  isClient: boolean;
}

export function OrderBox({ orderObj, isClient }: OrderBoxProps) {
  let orderPriceNum: number;
  let income = "";
  if (!isClient) {
    if (orderObj.orderPrice === null) {
      orderPriceNum = 0;
    } else {
      orderPriceNum = extractNumber(orderObj.orderPrice);
    }
    income = calQuickerIncome(orderPriceNum);
  }

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
                <Sp0>접수 중</Sp0>
                <Sp1>{formatedDate(orderObj.createdTime)}</Sp1>
                <ViewState orderObj={orderObj} isClient={isClient} />
              </Div0>
              <Div1>
                <Sp2>출발지</Sp2>
                <Sp1>-</Sp1>
              </Div1>
              <Div1>
                <Sp2>도착지</Sp2>
                <Sp1>-</Sp1>
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
                <Sp2>김포시 김포대로 926번길 46 </Sp2>
              </Div1>
              <DivBs>
                <BsFillCircleFill />
                <BsFillCircleFill />
                <BsFillCircleFill />
              </DivBs>
              <Div1>
                <Sp2>김포시 김포대로 926번길 46 </Sp2>
              </Div1>
              <Div1>
                <Spsc0>수익</Spsc0>
                <Spsc1>{income}원</Spsc1>
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
  const { order } = useOrderState() as any;
  const { setOrder, isModalOpen, setIsModalOpen } = useOrderState();
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setOrder(null);
  };

  let orderPriceNum: number;
  let income = "";
  if (order) {
    if (!isClient) {
        if (order.orderPrice === null) {
          orderPriceNum = 0;
        } else {
          orderPriceNum = extractNumber(order.orderPrice);
        }
        income = calQuickerIncome(orderPriceNum);
      }
  }
  
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
                  <Div0>
                    <Sp0>주문 상세</Sp0>
                    <ViewState orderObj={order} isClient={true} />
                  </Div0>
                  <Div1>
                    <Sp2>수락 시간</Sp2>
                    {order?.matchedTime === null ? (
                      <Sp1>-</Sp1>
                    ) : (
                      <Sp1>{formatedDate(order?.matchedTime)}</Sp1>
                    )}
                  </Div1>
                  <Div1>
                    <Sp2>도착 시간</Sp2>
                    {order?.deliveredTime === null ? (
                      <Sp1>-</Sp1>
                    ) : (
                      <Sp1>{formatedDate(order?.deliveredTime)}</Sp1>
                    )}
                  </Div1>
                  <Div1>
                    <Sp2>출발지</Sp2>
                    <Sp1>
                      김포시 김포대로 926번길 46
                      <br />
                      <Sp3>주소 세부사항</Sp3>
                    </Sp1>
                  </Div1>
                  <Div1>
                    <Sp2>발송인</Sp2>
                    <Sp1>발송인</Sp1>
                  </Div1>
                  <Div1>
                    <Sp2>도착지</Sp2>
                    <Sp1>
                      김포시 김포대로 926번길 46
                      <br />
                      <Sp3>주소 세부사항</Sp3>
                    </Sp1>
                  </Div1>
                  <Div1>
                    <Sp2>수령인</Sp2>
                    <Sp1>이름</Sp1>
                  </Div1>
                  <Div1>
                    <Sp2>물품 세부 정보</Sp2>
                    <Sp1>
                      포카칩 5봉지
                      <br />
                      <Sp3>60kg</Sp3>
                    </Sp1>
                  </Div1>
                  <Hr />
                  <Div1>
                    <Sp4>수익</Sp4>
                    <Sp5>{order?.orderPrice}</Sp5>
                  </Div1>
                  <Div1>
                    <Sp2>결제 일시</Sp2>
                    <Sp1>{formatedDate(order?.createdTime)}</Sp1>
                  </Div1>
                  <BottomBtn order={order} />
                </>
              ) : (
                <>
                  <Div0>
                    <Sp0>접수 중</Sp0>
                  </Div0>
                  <Div1>
                    <Sp2>배송 기한</Sp2>
                    <Sp1>{formatedDate(order?.limitedTime)}</Sp1>
                  </Div1>
                  <Hr />
                  <Div1>
                    <Sp2>출발지</Sp2>
                    <Sp1>
                      김포시 김포대로 926번길 46
                      <br />
                      <Sp3>주소 세부사항</Sp3>
                    </Sp1>
                    <Ic>
                      <BsStickies />
                    </Ic>
                  </Div1>
                  <Div1>
                    <Sp2>발송인</Sp2>
                    <Sp1>이름</Sp1>
                  </Div1>
                  <Div1>
                    <Sp2>연락처</Sp2>
                    <Sp1>0505-0987-XXXX</Sp1>
                    <Ic>
                      <BsStickies />
                    </Ic>
                  </Div1>
                  <Hr />
                  <Div1>
                    <Sp2>도착지</Sp2>
                    <Sp1>
                      김포시 김포대로 926번길 46
                      <br />
                      <Sp3>주소 세부사항</Sp3>
                    </Sp1>
                    <Ic>
                      <BsStickies />
                    </Ic>
                  </Div1>
                  <Div1>
                    <Sp2>수령인</Sp2>
                    <Sp1>이름</Sp1>
                  </Div1>
                  <Div1>
                    <Sp2>연락처</Sp2>
                    <Sp1>0505-0987-XXXX</Sp1>
                    <Ic>
                      <BsStickies />
                    </Ic>
                  </Div1>
                  <Hr />
                  <Div1>
                    <Sp2>물품 세부 정보</Sp2>
                    <Sp1>
                      포카칩 5봉지
                      <br />
                      <Sp3>60kg</Sp3>
                    </Sp1>
                  </Div1>
                  <Hr />
                  <Div1>
                    <Sp4>수익</Sp4>
                    <Sp5>{income}</Sp5>
                  </Div1>
                  <Button>배송 현황 확인(Quicker 버전)</Button>
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

// 모달 하단 버튼 컴포넌트
const BottomBtn = ({ order }: any) => {
  const createdLogic = () => {
    console.log("주문 취소 로직 구현");
  };
  const acceptLogic = () => {
    console.log("배송 현황 확인 로직 구현");
  };
  const completeLogic = () => {
    console.log("거래 확정 로직 구현");
  };
  const failLogic = () => {
    console.log("실패 로직 구현");
  };
  const cancelLogic = () => {
    console.log("다시 의뢰하기 로직 구현");
  };
  switch (order?.state) {
    case "created":
      return <Button onClick={() => createdLogic()}>주문 취소</Button>;
    case "matched":
      return <Button onClick={() => acceptLogic()}>배송 현황 확인</Button>;
    case "completed":
      return <Button onClick={() => completeLogic()}>거래 확정</Button>;
    case "failed":
      return <Button onClick={() => failLogic()}>결제금 환급</Button>;
    case "canceled":
      return <Button onClick={() => cancelLogic()}>다시 의뢰하기</Button>;
    default:
      return <Button onClick={() => cancelLogic()}>주문 취소</Button>;
  }
};

const Div0 = styled.div`
  display: flex;
  padding: 1rem 0.75rem 1rem 1.875rem;
`;

const StateDiv = styled(Div0)`
  margin-left: auto;
  background-color: ${(props) => props.color};
  border-radius: 1.25rem;
  width: 3.75rem;
  height: 1.438rem;
  align-items: center;
  justify-content: center;
  padding: 0;
  color: var(--white-color);
  font-weight: bold;
`;

const Div1 = styled.div`
  display: flex;
  padding: 0px 0px 0px 1.875rem;
`;

const Sp0 = styled.span`
  font-size: var(--font-md);
  font-weight: bold;
`;

const Sp1 = styled.span`
  font-size: var(--font-micro);
  padding-left: 1rem;
`;

const Sp2 = styled.span`
  font-size: var(--font-micro);
  color: #646464;
`;

const Sp3 = styled(Sp1)`
  font-weight: bold;
  padding-left: 1.625rem;
  margin-bottom: 1rem;
`;

const Sp4 = styled.span`
  font-size: var(--font-md1);
  color: #0d6efd;
  font-weight: bold;
`;

const Sp5 = styled.span`
  font-size: var(--font-md1);
  color: #0d6efd;
  margin-left: auto;
  font-weight: bold;
`;

const Hr = styled.hr`
  margin: 0.75rem auto 0.75rem auto;
  width: 100%;
  border: 0;
  height: 0;
  border-top: 0.063rem solid #dfdfdf;
  padding: 0 0 0 0;
`;

const Button = styled.button`
  width: 100%;
  height: 4.313rem;
  font-size: var(--font-md);
  border-radius: 0.313rem;
  border-color: var(--black-color);
  border-width: thin;
  background-color: var(--white-color);
  color: var(--black-color);
  font-weight: bold;
  font-size: var(--font-md);
  margin-top: 1rem;
`;

const DivBs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 1.813rem;
  font-size: 0.25rem;
  color: #cecece;
  padding: 0.313rem 0 0.313rem 2.5rem;
`;

const Spprofit0 = styled.span`
  padding: 1rem 1.25rem 0.625rem 0;
  font-size: 16px;
  font-weight: bold;
`;

const Spprofit1 = styled(Spprofit0)`
  margin-left: auto;
`;

const Spprofit2 = styled(Spprofit0)`
  padding-top: 0px;
  font-size: var(--font-small);
  color: #979797;
`;

const Spprofit3 = styled(Spprofit2)`
  margin-left: auto;
  color: #79afff;
`;

const Spsc0 = styled(Spprofit0)`
  color: #0d6efd;
`;

const Spsc1 = styled(Spsc0)`
  margin-left: auto;
`;

const Spsc2 = styled(Spprofit2)`
  margin-left: auto;
`;

const Ic = styled.span`
    font-size: var(--font-micro);
    margin-left: 0.188rem;
`;