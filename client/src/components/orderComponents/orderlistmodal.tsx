import React, { CSSProperties, useEffect } from "react";
import styled from "styled-components";
import { BsX, BsStickies } from "react-icons/bs";
import { useOrderState } from "./orderlist";

interface OrderlistmodalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const Orderlistmodal: React.FC<OrderlistmodalProps> = ({
  isOpen,
  onRequestClose,
}) => {
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

  const { Order } = useOrderState() as any;

  // 오더 상태 확인 컴포넌트
  const ViewState = () => {
    switch (Order?.state) {
      case "created":
        return <Divst0>대기</Divst0>;
      case "matched":
        return <Divgr>수락</Divgr>;
      case "completed":
        return <Divbl>완료</Divbl>;
      case "failed":
        return <Divred>실패</Divred>;
      case "canceled":
        return <DivOrg>취소</DivOrg>;
      default:
        return <Divst0>대기</Divst0>;
    }
  };

  // 모달 하단 버튼 컴포넌트
  const BottomBtn = () => {
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
    switch (Order?.state) {
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
  useEffect(() => {
    // 모달이 열렸을 때 body의 overflow 스타일 속성을 hidden으로 변경
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div style={modalStyle}>
          <div style={boxStyle}>
            <>
              <button onClick={onRequestClose} style={buttonStyle}>
                <BsX />
              </button>
              <Div0>
                <Sp0>주문 상세</Sp0>
                <ViewState />
              </Div0>
              <Div1>
                <Sp2>수락 시간</Sp2>
                {Order?.matchedTime === null ? (
                  <Sp1>-</Sp1>
                ) : (
                  <Sp1>{formatedDate(Order?.matchedTime)}</Sp1>
                )}
              </Div1>
              <Div1>
                <Sp2>도착 시간</Sp2>
                {Order?.deliveredTime === null ? (
                  <Sp1>-</Sp1>
                ) : (
                  <Sp1>{formatedDate(Order?.deliveredTime)}</Sp1>
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
                <Sp5>{Order?.orderPrice}</Sp5>
              </Div1>
              <Div1>
                <Sp2>결제 일시</Sp2>
                <Sp1>{formatedDate(Order?.createdTime)}</Sp1>
              </Div1>
              <BottomBtn />
            </>
          </div>
        </div>
      )}
    </>
  );
};

export default Orderlistmodal;

const formatedDate = (data: any): string => {
  const year = data.year;
  const month = data.month;
  const day = data.day;
  const hours = data.hours;
  const min = data.minutes;
  return `${year}.${month}.${day} ${hours}:${min}`;
};

const Div0 = styled.div`
  display: flex;
  padding: 1.75rem 0 1.25rem 0;
`;

const Div1 = styled.div`
  display: flex;
  padding: 0.625rem 0px 0.625rem 0px;
`;

const Sp0 = styled.span`
  font-size: var(--font-md);
  font-weight: bold;
`;

const Sp1 = styled.span`
  font-size: var(--font-md1);
  margin-left: auto;
  position: relative;
  font-weight: bold;
`;

const Sp2 = styled.span`
  font-size: var(--font-md1);
  color: #646464;
`;

const Sp3 = styled.span`
  font-size: var(--font-micro);
  position: absolute;
  top: 1rem;
  right: 0;
  font-weight: lighter;
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

const Divst0 = styled.div`
  display: flex;
  margin-left: auto;
  background-color: #9d9d9d;
  border-radius: 1.25rem;
  width: 3.75rem;
  height: 1.438rem;
  align-items: center;
  justify-content: center;
  padding: 0;
  color: var(--white-color);
  font-weight: bold;
`;

// 수락
const Divgr = styled(Divst0)`
  background-color: #28a745;
  position: relative;
`;

// 완료
const Divbl = styled(Divst0)`
  background-color: #0d6efd;
`;

// 실패
const Divred = styled(Divst0)`
  background-color: #dc3545;
`;

// 취소
const DivOrg = styled(Divst0)`
  background-color: #dc9935;
`;
