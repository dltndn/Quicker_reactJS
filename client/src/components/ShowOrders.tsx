import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { create } from "zustand";
import { useAccount } from "wagmi";
import { getOrderList, getOrders, getOrder } from "../utils/ExecuteOrderFromBlockchain";
import GetQkrwBalance from "./getQkrwBalance";
import Handler from "../lib/Handler";
import Kakao from "../lib/Kakao";
import { OrderBox, OrderModal } from "./orderComponents/OrderBox";
import Loading from "./animation/ready.gif";

import money from "../image/money.png";


interface OrderState {
  order: object | null;
  setOrder: (newOrder: object | null) => void;
  ordersObj: object[] | null;
  setOrdersObj: (newOrderObj: object[] | null) => void;
  isModalOpen: boolean;
  setIsModalOpen: (newData: boolean) => void;
  reloadOrderNum: string |  null;
  setReloadOrderNum: (newData: string | null) => void;
  refreshOrder: boolean;
  setRefreshOrder: (newData: boolean) => void;
}

export const useOrderState = create<OrderState>((set) => ({
  order: null,
  setOrder: (order: object | null) => set({ order }),
  ordersObj: null,
  setOrdersObj: (ordersObj: object[] | null) => set({ ordersObj }),
  isModalOpen: false,
  setIsModalOpen: (isModalOpen: boolean) => set({ isModalOpen }),
  reloadOrderNum: null,
  setReloadOrderNum: (reloadOrderNum: string | null) => set({reloadOrderNum}),
  refreshOrder: false,
  setRefreshOrder: (refreshOrder: boolean) => set({refreshOrder}),
}));

interface ShowOrderProps {
  isClient: boolean;
}

const changeToIntDataInBlockChainId = (dataInBlockChain: any) => {
  let list: any = []
  dataInBlockChain.forEach((element: any) => {
    list.push(parseInt(element.orderNum))
  });
  return list
}


const setRealLocation = async (orderListInDBElement: any, dataInBlockChain: any, index: number) => {
  let realdepartureAdress = await Kakao.reverseGeoCording(orderListInDBElement.Departure.Y, orderListInDBElement.Departure.X);
  let realdestinationAdress = await Kakao.reverseGeoCording(orderListInDBElement.Destination.Y, orderListInDBElement.Destination.X);
  
  dataInBlockChain[index].realdepartureAdress = realdepartureAdress;
  dataInBlockChain[index].realdestinationAdress = realdestinationAdress;

  dataInBlockChain[index].realdepartureAdress.DETAIL = orderListInDBElement.Departure.DETAIL;
  dataInBlockChain[index].realdestinationAdress.DETAIL = orderListInDBElement.Destination.DETAIL;
}

const setSender = async (orderListInDBElement: any, dataInBlockChain: any, index: number) => {
  dataInBlockChain[index].Sender = orderListInDBElement.Sender;
}

const setRecipient = async (orderListInDBElement: any, dataInBlockChain: any, index: number) => {
  dataInBlockChain[index].Recipient = orderListInDBElement.Recipient;
}

const setDetail = async (orderListInDBElement: any, dataInBlockChain: any, index: number) => {
  dataInBlockChain[index].DETAIL = orderListInDBElement.DETAIL;
}

const setProduct = async (orderListInDBElement: any, dataInBlockChain: any, index: number) => {
  dataInBlockChain[index].Product = orderListInDBElement.Product;
}


// isClient ? (오더 내역):(수행 내역)
export default function ShowOrders({ isClient }: ShowOrderProps) {
  const { address, isConnected } = useAccount();
  const [isEmptyOrder, setIsEmptyOrder] = useState<boolean>(false);
  const [reversedOrders, setReversedOrders] = useState<object[]>([]);
  const [newOrder, setNewOrder] = useState<object | null>(null)

  const { setOrder, ordersObj, setOrdersObj, setIsModalOpen, reloadOrderNum, setReloadOrderNum, refreshOrder, setRefreshOrder } = useOrderState();
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

  const conbineDBBlockChain = async (orderListInDBElement: any, dataInBlockChain: any, index: number) =>{
    await setRealLocation(orderListInDBElement, dataInBlockChain, index)
    setSender(orderListInDBElement, dataInBlockChain, index)
    setRecipient(orderListInDBElement, dataInBlockChain, index)
    setDetail(orderListInDBElement, dataInBlockChain, index)
    setProduct(orderListInDBElement, dataInBlockChain, index)
  }

  // orderNumList -> 오더번호
  const getOrderObj = async (orderNumList: string[]) => {
    const dataInBlockChain = await getOrders(orderNumList);
    const intLisBlockChainId = changeToIntDataInBlockChainId(dataInBlockChain)
    let orderListInDB = await Handler.post(
      { list: intLisBlockChainId },
      process.env.REACT_APP_SERVER_URL + "orderlist"
    );

    // @ts-ignore
    for (const [index, BlockChainElement] of dataInBlockChain.entries()) {
      for (const orderListInDBElement of orderListInDB) {
        if (parseInt(BlockChainElement.orderNum) === orderListInDBElement.id) {
          await conbineDBBlockChain(orderListInDBElement, dataInBlockChain, index);
        }
      }
    }
    setOrdersObj(dataInBlockChain);
  }

  const reloadOrderBoxLogic = async (orderNum: string) => {
    const orderNumList = await getOrderList(address, isClient);
    if (orderNumList) {
      getOrderObj(orderNumList);
    }
    setNewOrder(null)
  }

  const getNewOrderObj = async (orderNum: string) => {
    const originOrder = await getOrder(orderNum)
    const intervalId = setInterval(async () => {
        let newOrder = await getOrder(orderNum);
        // 서명 거부시 인터벌 탈출기능 추가
        if (newOrder.state !== originOrder.state) {
          console.log("새 오더 탐색 완료")
          setNewOrder(newOrder)
          clearInterval(intervalId);
        } else {
          console.log("새 오더 감지x")
        }
      }, 500);
  }

  useEffect(() => {
    if (reloadOrderNum !== null) {
        getNewOrderObj(reloadOrderNum)
    }
  }, [reloadOrderNum])

  useEffect(() => {
    if (newOrder !== null) {
        if (reloadOrderNum !== null) {
            reloadOrderBoxLogic(reloadOrderNum)
            setReloadOrderNum(null)
        }
    }
  }, [newOrder])

  useEffect(() => {
    if (ordersObj !== null) {
      setReversedOrders(ordersObj.slice().reverse());
    }
  }, [ordersObj]);

  useEffect(() => {
    getOrderListFromBlochain();
  }, [isClient]);

  useEffect(() => {
    console.log("refreshOrder: "+refreshOrder)
    if(refreshOrder) {
      getOrderListFromBlochain();
      setRefreshOrder(false)
    }
  }, [refreshOrder])

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
          <Div0><Divimg><LoadingImg src={Loading}/></Divimg></Div0>

        )
      ) : (
        reversedOrders.map((value) => (
          <Sc0 onClick={() => {  
            // @ts-ignore
            (value.Product !== undefined) ? handleOpenModal(value) : alert("db정보 없음")
          }}>
            <OrderBox orderObj={value} isClient={isClient} />
          </Sc0>
        ))
      )}
      {}
      <OrderModal isClient={isClient} />
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

const Divimg = styled.div`
  display: flex;
  justify-content: center;
  width: 100%
`;

const LoadingImg = styled.img`
    width: 300px;

    margin-top: 200px;
`;