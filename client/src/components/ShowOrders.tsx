import React, { useState, useEffect } from "react";
import { create } from "zustand";
import {
  getOrderList,
  getOrders,
  getOrder,
  getCommissionRate,
  MANY_REQUEST_ERROR
} from "../utils/ExecuteOrderFromBlockchain";
import GetQkrwBalance from "./getQkrwBalance";
import Handler from "../lib/Handler";
import Kakao from "../lib/Kakao";
import { OrderBox, OrderModal } from "./orderComponents/OrderBox";
import Loading from "./animation/ready.gif";
import { UseUserOrderState } from "../App";
import { useConnWalletInfo } from "../App";
import { ShowOrdersStyle } from "../StyleCollection";
import money from "../image/money.png";
import Lottie from "lottie-react";
import mainLoading from "../Lottie/mainLoading.json"
import { useNavigate } from "react-router-dom";

const {Div0, Divimg, Divwallet, Sc0, Sc1, SelectInput, Sp0, Spwallet, LoadingImg, Bticon, Bticonimg,
Div1, Div3, Img} = new ShowOrdersStyle()



interface OrderState {
  order: object | null;
  setOrder: (newOrder: object | null) => void;
  ordersObj: object[] | null;
  setOrdersObj: (newOrderObj: object[] | null) => void;
  isModalOpen: boolean;
  setIsModalOpen: (newData: boolean) => void;
  reloadOrderNum: string | undefined;
  setReloadOrderNum: (newData: string | undefined) => void;
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
  reloadOrderNum: undefined,
  setReloadOrderNum: (reloadOrderNum: string | undefined) => set({ reloadOrderNum }),
  refreshOrder: false,
  setRefreshOrder: (refreshOrder: boolean) => set({ refreshOrder }),
}));

interface ShowOrderProps {
  isClient: boolean;
}

const changeToIntDataInBlockChainId = (dataInBlockChain: any) => {
  let list: any = [];
  dataInBlockChain.forEach((element: any) => {
    list.push(parseInt(element.orderNum));
  });
  return list;
};

const setRealLocation = async (
  orderListInDBElement: any,
  dataInBlockChain: any,
  index: number
) => {
  let realdepartureAdress = await Kakao.reverseGeoCording(
    orderListInDBElement.Departure.Y,
    orderListInDBElement.Departure.X
  );
  let realdestinationAdress = await Kakao.reverseGeoCording(
    orderListInDBElement.Destination.Y,
    orderListInDBElement.Destination.X
  );

  dataInBlockChain[index].realdepartureAdress = realdepartureAdress;
  dataInBlockChain[index].realdestinationAdress = realdestinationAdress;

  dataInBlockChain[index].realdepartureAdress.DETAIL =
    orderListInDBElement.Departure.DETAIL;
  dataInBlockChain[index].realdestinationAdress.DETAIL =
    orderListInDBElement.Destination.DETAIL;
};

const setSender = async (
  orderListInDBElement: any,
  dataInBlockChain: any,
  index: number
) => {
  dataInBlockChain[index].Sender = orderListInDBElement.Sender;
};

const setRecipient = async (
  orderListInDBElement: any,
  dataInBlockChain: any,
  index: number
) => {
  dataInBlockChain[index].Recipient = orderListInDBElement.Recipient;
};

const setDetail = async (
  orderListInDBElement: any,
  dataInBlockChain: any,
  index: number
) => {
  dataInBlockChain[index].DETAIL = orderListInDBElement.DETAIL;
};

const setProduct = async (
  orderListInDBElement: any,
  dataInBlockChain: any,
  index: number
) => {
  dataInBlockChain[index].Product = orderListInDBElement.Product;
};

// isClient ? (오더 내역):(수행 내역)
export default function ShowOrders({ isClient }: ShowOrderProps) {
  const { address, isConnected } = useConnWalletInfo();
  const [isEmptyOrder, setIsEmptyOrder] = useState<boolean>(false);
  const [reversedOrders, setReversedOrders] = useState<object[]>([]);
  const [newOrder, setNewOrder] = useState<object | null>(null);
  const [commissionRate, setCommissionRate] = useState<string[]>([])

  const {
    setOrder,
    ordersObj,
    setOrdersObj,
    setIsModalOpen,
    reloadOrderNum,
    setReloadOrderNum,
    refreshOrder,
    setRefreshOrder,
  } = useOrderState();
  const { clientOrderNums, quickerOrderNums } = UseUserOrderState();
  const handleOpenModal = (order: object) => {
    setIsModalOpen(true);
    setOrder(order);
  };

  const navigate = useNavigate()

  const init = async () => {
    const commissionResult = await getCommissionRate()
    if (commissionResult === MANY_REQUEST_ERROR) {
      alert('MANY_REQUEST_ERROR')
      navigate('/')
    }
    setCommissionRate(commissionResult)
  }

  // 현재 연결된 지갑 주소의 오더 내역 번호 array값 불러오기
  const getOrderListFromBlochain = async () => {
    let orderNumList: string[];
    if (isClient) {
      orderNumList = clientOrderNums;
    } else {
      orderNumList = quickerOrderNums;
    }
    //getOrders 호출
    if (orderNumList.length !== 0) {
      getOrderObj(orderNumList);
    } else {
      setIsEmptyOrder(true);
      console.log("오더 내역 없음");
    }
  };

  const conbineDBBlockChain = async (
    orderListInDBElement: any,
    dataInBlockChain: any,
    index: number
  ) => {
    await setRealLocation(orderListInDBElement, dataInBlockChain, index);
    setSender(orderListInDBElement, dataInBlockChain, index);
    setRecipient(orderListInDBElement, dataInBlockChain, index);
    setDetail(orderListInDBElement, dataInBlockChain, index);
    setProduct(orderListInDBElement, dataInBlockChain, index);
  };

  // orderNumList -> 오더번호
  const getOrderObj = async (orderNumList: string[]) => {
    const dataInBlockChain = await getOrders(orderNumList);
    const intLisBlockChainId = changeToIntDataInBlockChainId(dataInBlockChain);
    try {
      let orderListInDB: any;
      orderListInDB = await Handler.get(
        process.env.REACT_APP_SERVER_URL + "orders/detail?" + "orderIds=" + intLisBlockChainId.toString()
      );
      // @ts-ignore
      for (const [index, BlockChainElement] of dataInBlockChain.entries()) {
        for (const orderListInDBElement of orderListInDB) {
          if (parseInt(BlockChainElement.orderNum) === orderListInDBElement.id) {
            await conbineDBBlockChain(
              orderListInDBElement,
              dataInBlockChain,
              index
            );
          }
        }
      }
    setOrdersObj(dataInBlockChain);
    } catch (e) {
      console.log(e);
    }
  };

  const reloadOrderBoxLogic = async (orderNum: string) => {
    const orderNumList = await getOrderList(address, isClient);
    if (orderNumList === MANY_REQUEST_ERROR) {
      alert('MANY_REQUEST_ERROR')
      navigate('/')
    } else if (orderNumList) {
      getOrderObj(orderNumList);
    }
    setNewOrder(null);
  };

  const getNewOrderObj = async (orderNum: string) => {
    const originOrder = await getOrder(orderNum);
    if (originOrder === MANY_REQUEST_ERROR) {
      alert('MANY_REQUEST_ERROR')
      navigate('/')
    }
    const intervalId = setInterval(async () => {
      let newOrder = await getOrder(orderNum);
      if (newOrder === MANY_REQUEST_ERROR) {
        alert('MANY_REQUEST_ERROR')
        navigate('/')
      }
      if (newOrder !== null && originOrder !== null) {
        // 서명 거부시 인터벌 탈출기능 추가
        // @ts-ignore
        if (newOrder.state !== originOrder.state) {
          console.log("새 오더 탐색 완료");
          // @ts-ignore
          setNewOrder(newOrder);
          clearInterval(intervalId);
        } else {
          console.log("새 오더 감지x");
        }
      }
    }, 500);
  };

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    if (reloadOrderNum !== undefined) {
      getNewOrderObj(reloadOrderNum);
    }
  }, [reloadOrderNum]);

  useEffect(() => {
    if (newOrder !== null) {
      if (reloadOrderNum !== undefined) {
        reloadOrderBoxLogic(reloadOrderNum);
        setReloadOrderNum(undefined);
      }
    }
  }, [newOrder]);

  useEffect(() => {
    if (ordersObj !== null) {
      setReversedOrders(ordersObj.slice().reverse());
    }
  }, [ordersObj]);

  useEffect(() => {
    if (refreshOrder) {
      getOrderListFromBlochain();
      setRefreshOrder(false);
    }
  }, [refreshOrder]);

  useEffect(() => {
    getOrderListFromBlochain();
  }, [clientOrderNums, quickerOrderNums]);

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
      {commissionRate.length !== 0 ? (<>
        {ordersObj === null ? (
        isEmptyOrder ? (
          <Div3>
          <Div1>
            현재 진행 중인 오더 내역이 없습니다.
          </Div1>
        </Div3>
        ) : (
          <Div0>
            <Divimg>
              <LoadingImg src={Loading} />
            </Divimg>
          </Div0>
        )
      ) : (
        reversedOrders.map((value, index) => (
          <Sc0 key={index}
            onClick={() => {
              // @ts-ignore
              value.Product !== undefined
                ? handleOpenModal(value)
                : alert("db정보 없음");
            }}
          >
            <OrderBox orderObj={value} isClient={isClient} commissionRate={commissionRate}/>
          </Sc0>
        ))
      )}
      <OrderModal isClient={isClient} commissionRate={commissionRate} />
      </>):(<Lottie animationData={mainLoading} />)}
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
