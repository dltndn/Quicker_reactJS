import styled from "styled-components";
import { useState, useEffect } from "react";
import { create } from "zustand";
import { useAccount } from "wagmi";
import { getOrderList, getOrders } from "../utils/ExecuteOrderFromBlockchain";
import GetQkrwBalance from "./getQkrwBalance";
import Handler from "../lib/Handler";
import Kakao from "../lib/Kakao";
import { OrderBox, OrderModal } from "./orderComponents/OrderBox";

import money from "../image/money.png";

interface OrderState {
  order: object | null;
  setOrder: (newOrder: object | null) => void;
  ordersObj: object[] | null;
  setOrdersObj: (newOrderObj: object[] | null) => void;
  isModalOpen: boolean;
  setIsModalOpen: (newData: boolean) => void;
}

export const useOrderState = create<OrderState>((set) => ({
  order: null,
  setOrder: (order: object | null) => set({ order }),
  ordersObj: null,
  setOrdersObj: (ordersObj: object[] | null) => set({ ordersObj }),
  isModalOpen: false,
  setIsModalOpen: (isModalOpen: boolean) => set({ isModalOpen }),
}));

interface ShowOrderProps {
  isClient: boolean;
}

// isClient ? (오더 내역):(수행 내역)
export default function ShowOrders({ isClient }: ShowOrderProps) {
  const { address, isConnected } = useAccount();
  const [isEmptyOrder, setIsEmptyOrder] = useState<boolean>(false);
  const [reversedOrders, setReversedOrders] = useState<object[]>([]);

  const { setOrder, ordersObj, setOrdersObj, setIsModalOpen } =
    useOrderState();

  const handleOpenModal = (order: object) => {
    setIsModalOpen(true);
    setOrder(order);
  };

  // 현재 연결된 지갑 주소의 오더 내역 번호 array값 불러오기
  const getOrderListFromBlochain = async () => {
    const orderNumList = await getOrderList(address, isClient);
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
    setOrdersObj(cloneList);
  };

  useEffect(() => {
    if (ordersObj !== null) {
      setReversedOrders(ordersObj.slice().reverse());
    }
  }, [ordersObj]);

  useEffect(() => {
    getOrderListFromBlochain();
  }, []);

  return (
    <>
      <SelectionTags />
      {!isClient && (
        <>
          <Sc1>
            <Divwallet>
              <Sp0>지갑 잔액</Sp0>
              <Spwallet>
                {isConnected && address && <GetQkrwBalance address={address} />}
              </Spwallet>
              <Bticon>
                <Bticonimg src={money} alt="" />
              </Bticon>
            </Divwallet>
          </Sc1>
        </>
      )}
      {ordersObj === null ? (
        isEmptyOrder ? (
          <Div0>오더 내역이 없습니다</Div0>
        ) : (
          <Div0>블록체인에서 데이터를 가져오고 있어요</Div0>
        )
      ) : (
        reversedOrders.map((value) => (
          <Sc0 onClick={() => handleOpenModal(value)}>
            <OrderBox orderObj={value} isClient={isClient} />
          </Sc0>
        ))
      )}
      {}
      <OrderModal isClient={isClient} />
      <Divhid />
    </>
  );
}

const SelectionTags = () => {
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

const Div0 = styled.div`
  display: flex;
  padding: 1rem 0.75rem 1rem 1.875rem;
`;

const Sc0 = styled.section`
  display: flex;
  flex-direction: column;
  margin: 0.563rem 0.563rem 0.563rem 0.563rem;
  border-radius: 0.313rem;
  border: 0rem;
  background-color: var(--white-color);
`;

const Divhid = styled(Div0)`
  height: 3.875rem;
`;


const Sc1 = styled(Sc0)`
    margin: 0 0.563rem 0.563rem 0.563rem;
    justify-content: center;
    height: 3rem;
`;

const Divwallet = styled.div`
    display: flex;
    align-items: center;
    font-size: var(--font-small);
    font-weight: bold;
    margin-left: 0.75rem;
`;

const Sp0 = styled.span`
    font-size: var(--font-md);
    font-weight: bold;
`;

const Spwallet = styled.div`
    margin-left: auto;
    margin-right: 0.625rem;
    font-size: var(--font-md);
`;

const Bticon = styled.button`
    border: none;
    background-color: var(--white-color);
    margin-right: 0.625rem;
`;

const Bticonimg = styled.img`
    width: 1.875rem;
`;