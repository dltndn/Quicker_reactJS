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
import Tmap from "../lib/Tmap";
import dotenv from "dotenv";
import Kakao from "../lib/Kakao";

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
  const [userLocation, setUserLocation] = useState({})

  const [requestListContent, setRequestListContent] =useState([])
  
  // 이 부분 수정
  const mockData : Array<OrderObj> = [];

  const changeToData = (dataArray : Array<OrderObj>) => {
    requestListContent.forEach(element => {
      
      // 운송수단 배열
      
      let transportation : Array<string> = []
      // @ts-ignore
      for (const key in element.Transportation) {
        // @ts-ignore
        if (element.Transportation[key] === true) {
          transportation.push(key)
        }
      }

      // @ts-ignore
      const { kakao } = window;

      let testchange = async (lat: number, lon: number) => {
        // await console.log(a + " " + destination)

        let geocoder = new kakao.maps.services.Geocoder();

        let coord = new kakao.maps.LatLng(lat, lon);
        let callback =  (result: any, status: string) => {
          if (status === kakao.maps.services.Status.OK) {
            // console.log(result[0].address.address_name)
            return result
          }
        };
        let data = await geocoder.coord2Address(coord.getLng(), coord.getLat(), callback)
        console.log(data)
      }




      // 주소변환
      let test = async () => {

        // @ts-ignore
        await testchange(element.Departure.Y, element.Departure.X)
        // console.log(test)


        // @ts-ignore
        // a = await testchange(element.Departure.Y, element.Departure.X)
        
        // console.log(a)
        // @ts-ignore
        // destination = await testchange(element.Destination.Y, element.Destination.X)
        // @ts-ignore
        // await console.log(testchange(element.Destination.Y, element.Destination.X))
        

        dataArray.push({
          // @ts-ignore
          orderNum: element.id,
          // @ts-ignore
          departure: "test",
          // @ts-ignore
          dep_detail: element.Departure.DETAIL,
          // @ts-ignore
          destination: "test",
          // @ts-ignore
          des_detail: element.Destination.DETAIL,
          // @ts-ignore
          volume: `가로 ${element.Product.WIDTH}cm, 세로 ${element.Product.LENGTH}cm, 높이 ${element.Product.HEIGHT}cm`,
          // @ts-ignore
          weight: `${element.Product.WEIGHT}kg 이상`,
          // @ts-ignore
          detail: element.DETAIL,
          // @ts-ignore
          deadline: "23.03.24 17:50",
          // @ts-ignore
          transportation: transportation,
          // @ts-ignore
          income: element.PAYMENT,
          // @ts-ignore
          securityDeposit: element.PAYMENT * 0.1,
        })
      }
      test();
    });    
  }
  
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
    
    const exec = async () => {
      try {
        let data = await Handler.get("http://localhost:9000/checkJoin")
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
      requestListContent.forEach(element => {
        // @ts-ignore
        Map.Marker(map, element.Departure.Y, element.Departure.X)   
      });
      changeToData(mockData)
      //order 객체 형태로 할당하기 오더내용(array) 형태 -> mockData 참고
      setOrders(mockData);
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
      document.getElementById("TMapApp")!.style.display = "block"
    }
  };

  // 오더 클릭시 세부정보 노출
  const clickOrder = (index: number) => {
    document.getElementById("TMapApp")!.style.display = "none"
    setShowOrder(index)
    setIsDetail(true);
  };

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