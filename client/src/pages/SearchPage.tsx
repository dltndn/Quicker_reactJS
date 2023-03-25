import React, { useEffect, useState, useRef } from "react";
import BottomBar from "../components/BottomBar";
import TopBarOthers from "../components/topBarOthers";
import { useNavigate } from "react-router-dom";
import Map from "../lib/Tmap"
import Geolocation from "../lib/Geolocation";
import Handler from "../lib/Handler";
import Search from "../components/Search";
import Search_Detail from "../components/Search_Detail";
import { create } from "zustand";

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
  
  const { isDetail, setIsDetail, topBarTitle, setOrders, setShowOrder } = useSearchState();
  const requestListContainer = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const [map, setMap] = useState({})
  // const [requestData, setRequestData] = useState({})
  const [userLocation, setUserLocation] = useState({})

  const [requestListContent, setRequestListContent] =useState({})
  
  let initalizeUserMarker = () => { 
    // @ts-ignore
    let pos = Map.LatLng(userLocation.lat,userLocation.lon)
    // @ts-ignore
    Map.Marker(map, userLocation.lat,userLocation.lon)
    Map.panTo(map, pos)
  }

  useEffect(() => {
    setMap(Map.initTmap());
    Geolocation.getCurrentLocation(setUserLocation)    
    
    const getData = async () => {
      const response = fetch("http://localhost:9000/checkJoin", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
      })
      return response.then (res => res.json())
    }

    const exec = async () => {
      try {
        let data = await getData()
        setRequestListContent(data)
      }catch (error) {
        console.error(error)
      }
    }
    exec();
  }, [])

  useEffect(() => {
    let requestListContents = Object.keys(requestListContent).length

    if (requestListContents !== 0) {
      console.log(requestListContent)
      for (let index = 0 ; index < requestListContents; index++)
      
      // @ts-ignore
      Map.Marker(map, requestListContent[index].Departure.Y, requestListContent[index].Departure.X) 
    }
  }, [requestListContent])

  useEffect(() => {
    if (Object.keys(userLocation).length !== 0) {
      initalizeUserMarker()
    }
  }, [userLocation])

  useEffect(() =>{
    if (Object.keys(requestListContent).length !== 0 && Object.keys(userLocation).length !== 0) {
      // Map.autoZoom(map, Map)
    }
  }, [userLocation, requestListContent])


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

      <div >
        <div
          id="TMapApp"
          style={{
            height: "300px",
            width: "100%",
          }}
        />
      </div>
      <div ref={requestListContainer}>
          {JSON.stringify(requestListContent)}
      </div>
      {!isDetail ? (
         <Search clickOrder={(index) => clickOrder(index)} />
       ) : (
         <Search_Detail />
       )}
       <BottomBar></BottomBar>
    </div>


       
       
     

  )
  
}



export default SearchPage;
