import React, { useRef } from "react";
import BottomBar from "../components/BottomBar";
import TopBarOthers from "../components/topBarOthers";
import { useNavigate } from "react-router-dom";
import Search from "../components/Search";
import Search_Detail from "../components/Search_Detail";
import { create } from "zustand";
import { useState, useEffect } from "react";

const mockData = [
  {
    orderNum: "3",
    departure: "김포시 김포대로 926번길 46",
    dep_detail: "삼성아파트 309동 704호",
    destination: "부천시 길주로 210",
    des_detail: "부천시청 민원여권과",
    volume: "가로 10cm, 세로 10cm, 높이 10cm",
    weight: "40kg 이상",
    detail: "경비실에 맡겨주세요.",
    deadline: "23.03.24 17:50",
    transportation: ["bike", "walk"],
    income: "21,000",
    securityDeposit: "2,100",
  },
];

export interface OrderObj {
  orderNum: string;
    departure: string;
    dep_detail: string;
    destination: string;
    des_detail: string;
    volume: string;
    weight: string;
    detail: string;
    deadline: string;
    transportation: string[];
    income: string;
    securityDeposit: string;
}

interface SearchProps {
  isDetail: boolean;
  setIsDetail: (detail: boolean) => void;
  topBarTitle: string;
  setTopBarTitle: (title: string) => void;
  orders: OrderObj[]
  setOrders: (orders: OrderObj[]) => void;
  showOrder: number | undefined
  setShowOrder: (index:number) => void;
}

export const useSearchState = create<SearchProps>((set) => ({
  isDetail: false,
  setIsDetail: (isDetail: boolean) => set({ isDetail }),
  topBarTitle: "의뢰목록",
  setTopBarTitle: (topBarTitle: string) => set({ topBarTitle }),
  orders: [],
  setOrders: (orders: OrderObj[]) => set({ orders }),
  showOrder: undefined,
  setShowOrder: (showOrder: number) => set({ showOrder })
}));

function SearchPage() {
  const navigate = useNavigate();
  const { isDetail, setIsDetail, topBarTitle, setOrders, setShowOrder } = useSearchState();

  const clickBackBtn = () => {
    if (!isDetail) {
      navigate("/");
    } else {
      setIsDetail(false);
    }
  };

  // 오더 클릭시 세부정보 노출
  const clickOrder = (index: number) => {
    setShowOrder(index)
    setIsDetail(true);
  };

  useEffect(() => {
    //order 객체 형태로 할당하기 오더내용(array) 형태 -> mockData 참고
    setOrders(mockData);
  }, []);

  return (
    <div>
      <TopBarOthers
        title={topBarTitle}
        redirectLogic={() => clickBackBtn()}
      ></TopBarOthers>
      {!isDetail ? (
        <Search clickOrder={(index) => clickOrder(index)} />
      ) : (
        <Search_Detail />
      )}
      <BottomBar></BottomBar>
    </div>
  );
}

export default SearchPage;
