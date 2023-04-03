import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Orderlistmodal from "./orderlistmodal";
import { create } from "zustand";
import { useAccount } from "wagmi";
import {
  getClientOrderList,
  getOrders,
} from "../../utils/ExecuteOrderFromBlockchain";
import { formatedDate } from "../../utils/ConvertTimestampToDate";
import Handler from "../../lib/Handler";
import Kakao from "../../lib/Kakao";

interface OrderState {
  Order: object | null;
  setOrder: (newOrder: object | null) => void;
  orderObj: object[] | null;
  setOrderObj: (newOrderObj: object[] | null) => void;
}

export const useOrderState = create<OrderState>((set) => ({
  Order: null,
  setOrder: (Order: object | null) => set({ Order }),
  orderObj: null,
  setOrderObj: (orderObj: object[] | null) => set({ orderObj }),
}));

function Orderlist() {
  const { address } = useAccount();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEmptyOrder, setIsEmptyOrder] = useState<boolean>(false);
  const [reversedOrders, setReversedOrders] = useState<object[]>([]);

  // const [dataBaseData, setDataBaseData] = useState([])

  const { orderObj, setOrder, setOrderObj } = useOrderState();

  const handleOpenModal = (order: object) => {
    setIsModalOpen(true);
    setOrder(order);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setOrder(null);
  };

  // 현재 연결된 지갑 주소의 오더 내역 번호 array값 불러오기
  const getOrderList = async () => {
    const orderNumList = await getClientOrderList(address);
    //getOrders 호출
    if (orderNumList !== undefined) {
      getOrderObj(orderNumList);
    } else {
      setIsEmptyOrder(true);
      console.log("오더 내역 없음");
    }
  };

  // orderNumList -> 오더번호
  const getOrderObj = async (orderNumList: string[]) => {
    let result = await getOrders(orderNumList);
    let cloneList = result.slice();
    result.forEach(async (element, index) => {
      let data = await Handler.post(
        { id: parseInt(element.orderNum) },
        "http://localhost:9000/orderlist"
      );
      if (data !== null) {
        let realdepartureAdress = await Kakao.reverseGeoCording(
          data.Departure.Y,
          data.Departure.X
        );
        let realdestinationAdress = await Kakao.reverseGeoCording(
          data.Destination.Y,
          data.Destination.X
        );

        cloneList[index].dbData = data;
        cloneList[index].dbData.realdepartureAdress = realdepartureAdress;
        cloneList[index].dbData.realdestinationAdress = realdestinationAdress;
      }
    });

    // orderNumList로 DB정보 가져와서 데이터 셋팅
    setOrderObj(cloneList);
  };

  useEffect(() => {
    setIsEmptyOrder(false);
    getOrderList();
  }, []);

  useEffect(() => {
    if (orderObj !== null) {
      setReversedOrders(orderObj.slice().reverse());
    }
  }, [orderObj]);

  return (
    <>
      <SelectInput name="date">
        <option value="">기간 선택</option>
        <option value="all0">전체</option>
        <option value="week">최근 1주일</option>
        <option value="month">최근 1달</option>
        <option value="year">최근 1년</option>
      </SelectInput>
      <SelectInput>
        <option value="">배송 수단</option>
        <option value="all1">전체</option>
        <option value="walk">도보</option>
        <option value="bike">자전거</option>
        <option value="kickboard">킥보드</option>
        <option value="motercycle">오토바이</option>
        <option value="car">승용차</option>
        <option value="truck">트럭</option>
      </SelectInput>
      <SelectInput>
        <option value="">진행 상태</option>
        <option value="all2">전체</option>
        <option value="Wait">대기</option>
        <option value="accept">수락</option>
        <option value="finish">완료</option>
        <option value="fail">실패</option>
        <option value="cancel">취소</option>
        <option value="Delay">지연</option>
      </SelectInput>

      {orderObj === null ? (
        isEmptyOrder ? (
          <Div0>오더 내역이 없습니다</Div0>
        ) : (
          <Div0>블록체인에서 데이터를 가져오고 있어요</Div0>
        )
      ) : (
        reversedOrders.map((value) => (
          <Sc0 onClick={() => handleOpenModal(value)}>
            <OrderBox orderObj={value} />
          </Sc0>
        ))
      )}
      <Orderlistmodal isOpen={isModalOpen} onRequestClose={handleCloseModal} />
      <Divhid />
    </>
  );
}

export default Orderlist;

const OrderBox = ({ orderObj }: any) => {
  const ViewState = () => {
    switch (orderObj?.state) {
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
  return (
    <>
      {orderObj === undefined ? (
        <>
          <Div0>블록체인에서 데이터를 가져오고 있어요</Div0>
        </>
      ) : (
        <>
          <Div0>
            <Sp0>접수 중</Sp0>
            <Sp1>{formatedDate(orderObj.createdTime)}</Sp1>
            <ViewState />
          </Div0>
          <Div1>
            <Sp2>출발지</Sp2>

            <Sp1></Sp1>
          </Div1>
          <Div1>
            <Sp2>{orderObj.orderNum}</Sp2>
            <Sp1></Sp1>
          </Div1>
          <Div1>
            <Sp2>금액</Sp2>
            <Sp3>{orderObj.orderPrice}</Sp3>
          </Div1>
        </>
      )}
    </>
  );
};

const SelectInput = styled.select`
  width: 6rem;
  height: 1.625rem;
  font-size: 0.75rem;
  border-radius: 0.5rem;
  border: 0;
  outline: #efefef;
  background-color: #d9d9d9;
  text-align: center;
  color: #000000;
  margin: 0.625rem 0.625rem 0 0.625rem;
  font-weight: bold;
  font-size: var(--font-small);
`;

const Sc0 = styled.section`
  display: flex;
  flex-direction: column;
  margin: 0.563rem 0.563rem 0.563rem 0.563rem;
  border-radius: 0.313rem;
  border: 0rem;
  background-color: var(--white-color);
`;
const Div0 = styled.div`
  display: flex;
  padding: 1rem 0.75rem 1rem 1.875rem;
`;

// 대기
const Divst0 = styled(Div0)`
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

const DivDelay = styled(Divst0)`
  background-color: var(--white-color);
  border-width: 0.063rem;
  border-style: dashed;
  border-color: #ff3030;
  color: #ff3030;
  position: absolute;
  bottom: -1.875rem;
`;

const Divhid = styled(Div0)`
  height: 3.875rem;
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
