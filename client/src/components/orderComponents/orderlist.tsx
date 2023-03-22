import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Orderlistmodal from "./orderlistmodal";
import { create } from "zustand";
import { useAccount } from "wagmi";
import {
  getClientOrderList,
  getOrder,
} from "../../utils/GetOrderFromBlockchain";

interface OrderState {
  OrderNum: string | null;
  setOrderNum: (newOrder: string) => void;
}

export const useOrderState = create<OrderState>((set) => ({
  OrderNum: null,
  setOrderNum: (OrderNum: string) => set({ OrderNum }),
}));

function Orderlist() {
  const { address } = useAccount();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [orderNumList, setOrderNumList] = useState<undefined | string[]>(
    undefined
  );

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const getOrderNumList = async () => {
    const result = await getClientOrderList(address);
    setOrderNumList(result);
  };

  useEffect(() => {
    getOrderNumList();
  });

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

      {orderNumList === undefined ? (
        <div>오더 내역이 없습니다</div>
      ) : (
        orderNumList.map((value) => <Sc0 onClick={handleOpenModal}>
            <OrderBox orderNum={value}/>
        </Sc0>)
      )}
      <Orderlistmodal isOpen={isModalOpen} onRequestClose={handleCloseModal} />
      <Divhid />
    </>
  );
}

export default Orderlist;

const getOrderContents = async (orderNum: string) => {
    const result = await getOrder(orderNum);
    const resObj = {
        state: result.state,
        orderPrice: result.orderPrice,
        orderY: result.createdTime?.year,
        orderM: result.createdTime?.month,
        orderD: result.createdTime?.day
    }
    return resObj;
  };

interface OrderBoxObj {
    state: string;
    orderPrice: string | null;
    orderY: string | undefined;
    orderM: string | undefined;
    orderD: string | undefined;
}

const OrderBox = ({orderNum}:{orderNum:string}) => {
    const [obj, setObj] = useState<OrderBoxObj | undefined>(undefined)

    const getData = async (orderNum:string) => {
        const result:any = await getOrderContents(orderNum)
        setObj(result)
    }

    useEffect(() => {
        getData(orderNum)
    }, [])
    
    const ViewState = () => {
        switch(obj?.state) {
            case "created":
                return(<Divst0>대기</Divst0>)
            case "matched":
                return(<Divgr>수락</Divgr>)
            case "completed":
                return(<Divbl>완료</Divbl>)
            case "failed":
                return(<Divred>실패</Divred>)
            case "canceled":
                return(<DivOrg>취소</DivOrg>)
            default :
                return(<Divst0>대기</Divst0>)
        }
    }
  return (
    <>
      <Div0>
        <Sp0>접수 중</Sp0>
        <Sp1>{obj?.orderY}.{obj?.orderM}.{obj?.orderD}</Sp1>
        <ViewState />
      </Div0>
      <Div1>
        <Sp2>출발지</Sp2>
        <Sp1>경기도 김포시 김포대로</Sp1>
      </Div1>
      <Div1>
        <Sp2>도착지</Sp2>
        <Sp1>경기도 김포시 김포대로</Sp1>
      </Div1>
      <Div1>
        <Sp2>금액</Sp2>
        <Sp3>{obj?.orderPrice}</Sp3>
      </Div1>
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
