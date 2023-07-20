import React, { useEffect, useState, useRef } from "react";
import BottomBar from "../components/BottomBar";
import TopBarOthers from "../components/topBarOthers";
import { useNavigate } from "react-router-dom";
import Map from "../lib/Tmap";
import Geolocation from "../lib/Geolocation";
import Handler from "../lib/Handler";
import Search from "../components/Search";
import Search_Detail from "../components/Search_Detail";
import { create } from "zustand";
import Kakao from "../lib/Kakao";
import { getOrder } from "../utils/ExecuteOrderFromBlockchain";
import { formatedDate } from "../utils/ConvertTimestampToDate";
import {
  calQuickerIncome,
  calSecurityDeposit,
  extractNumber,
} from "../utils/CalAny";
import { useOrderStore } from "./commission";
import IncreaseAllowance from "../components/IncreaseAllowance";
import { useConnWalletInfo } from "../App";

export interface OrderObj {
  orderNum: string;
  departure: string;
  departure_region_1depth_name: string;
  departure_region_3depth_name: string;
  dep_detail: string;
  destination: string;
  destination_region_1depth_name: string;
  destination_region_3depth_name: string;
  des_detail: string;
  distance: number;
  volume: string;
  weight: string;
  detail: string;
  deadline: string;
  transportation: string[];
  income: string;
  securityDeposit: string;
  depatureRaw: Coordi;
  destinationRaw: Coordi;
}

interface Coordi {
  X: number;
  Y:number
}

interface SearchProps {
  isDetail: boolean;
  setIsDetail: (detail: boolean) => void;
  topBarTitle: string;
  setTopBarTitle: (title: string) => void;
  orders: OrderObj[];
  setOrders: (orders: OrderObj[]) => void;
  showOrder: number | undefined;
  setShowOrder: (index: number) => void;
}

export const useSearchState = create<SearchProps>((set) => ({
  isDetail: false,
  setIsDetail: (isDetail: boolean) => set({ isDetail }),
  topBarTitle: "의뢰목록",
  setTopBarTitle: (topBarTitle: string) => set({ topBarTitle }),
  orders: [],
  setOrders: (orders: OrderObj[]) => set({ orders }),
  showOrder: undefined,
  setShowOrder: (showOrder: number) => set({ showOrder }),
}));

const appendTransportation = (element: any) => {
  // 운송수단 배열
  let transportations: Array<string> = [];
  // @ts-ignore
  for (let key in element.Transportation) {
    // @ts-ignore
    if (element.Transportation[key] === true) {
      transportations.push(key);
    }
  }

  return transportations;
};

const getOrderFromBlochchain = async (orderNum: string) => {
  const orderObj = await getOrder(orderNum);
  return orderObj;
};

function SearchPage() {
  const { address } = useConnWalletInfo();
  const { isDetail, setIsDetail, topBarTitle, setOrders, setShowOrder } =
    useSearchState();
  const { showAllowance } = useOrderStore();
  const requestListContainer = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [tmap, setTmap] = useState<any>();
  const [userLocation, setUserLocation] = useState({});

  const [requestListContents, setRequestListContents] = useState([]);

  const [mockData, setMockData] = useState<OrderObj[]>([]);

  const changeToData = (dataArray: Array<OrderObj>) => {
    requestListContents.forEach((element) => {
      let transportations = appendTransportation(element);

      (async () => {
        // @ts-ignore
        const orderFromBlockchain = await getOrderFromBlochchain(element.id);
        if (orderFromBlockchain !== null) {
          if (orderFromBlockchain.state === "created") {
            const deadLine = formatedDate(
              orderFromBlockchain.limitedTime
            );
            let orderPrice = orderFromBlockchain.orderPrice;
            let orderPriceNum: number;
            if (orderPrice === null) {
              orderPriceNum = 0;
            } else {
              orderPriceNum = extractNumber(orderPrice);
            }
            const income = calQuickerIncome(orderPriceNum);
            const securityDeposit = calSecurityDeposit(orderPriceNum);
  
            // @ts-ignore
            let departure = await Kakao.reverseGeoCording(element.Departure.Y, element.Departure.X);
            // @ts-ignore
            let destination = await Kakao.reverseGeoCording(element.Destination.Y, element.Destination.X);
            // @ts-ignore
            let distance = await tmap.getDistance(element.Departure, element.Destination);
  
            // @ts-ignore
            let depatureRaw = {X: element.Departure.X, Y: element.Departure.Y}
            // @ts-ignore
            let destinationRaw = {X: element.Destination.X, Y: element.Destination.Y}
  
            let obj: OrderObj = {
              // @ts-ignore
              orderNum: element.id,
              // @ts-ignore
              departure: departure.address_name,
              // @ts-ignore
              departure_region_1depth_name: departure.region_1depth_name,
              // @ts-ignore
              departure_region_3depth_name: departure.region_3depth_name,
              // @ts-ignore
              dep_detail: element.Departure.DETAIL,
              // @ts-ignore
              destination: destination.address_name,
              // @ts-ignore
              destination_region_1depth_name: destination.region_1depth_name,
              // @ts-ignore
              destination_region_3depth_name: destination.region_3depth_name,
              // @ts-ignore
              des_detail: element.Destination.DETAIL,
              // @ts-ignore
              distance: distance.distanceInfo.distance,
              // @ts-ignore
              volume: `가로 ${element.Product.WIDTH}cm, 세로 ${element.Product.LENGTH}cm, 높이 ${element.Product.HEIGHT}cm`,
              // @ts-ignore
              weight: `${element.Product.WEIGHT}kg 이상`,
              // @ts-ignore
              detail: element.DETAIL,
              // @ts-ignore
              deadline: deadLine,
              // @ts-ignore
              transportation: transportations,
              // @ts-ignore
              income: income,
              // @ts-ignore
              securityDeposit: securityDeposit,
              depatureRaw,
              destinationRaw
            };
            setMockData((mockData) => [...mockData, obj]);
          }
        }
        
      })();
    });
  };

  let initalizeUserMarker = () => {
    // @ts-ignore
    let pos = tmap.createLatLng(userLocation.lat, userLocation.lon);
    // @ts-ignore
    tmap.createMarker(userLocation.lat, userLocation.lon, 3);
    tmap.panTo(pos);
  };

  useEffect(() => {
    setTmap(new Map("TMapSearch", "51em"));
    Geolocation.getCurrentLocation(setUserLocation);

    if (address !== undefined) {
      const exec = async () => {
        try {
          let data = await Handler.get(
            process.env.REACT_APP_SERVER_URL + "orders/" + `?userWalletAdress=${address}`
          );
          console.log(data)
          setRequestListContents(data);
        } catch (error) {
          console.error(error);
        }
      };
      exec();
    }
  }, [address]);

  useEffect(() => {
    let requestListContentLength = Object.keys(requestListContents).length;

    if (requestListContentLength !== 0) {
      requestListContents.forEach((element) => {    
        // @ts-ignore
        tmap.createMarker(element.Departure.Y, element.Departure.X, 0);
      });
      changeToData(mockData);
    }
  }, [requestListContents]);

  useEffect(() => {
    //order 객체 형태로 할당하기 오더내용(array) 형태 -> mockData 참고
    setOrders(mockData);
  }, [mockData]);

  useEffect(() => {
    if (Object.keys(userLocation).length !== 0) {
      initalizeUserMarker();
    }
  }, [userLocation]);

  useEffect(() => {
    if (
      Object.keys(requestListContents).length !== 0 &&
      Object.keys(userLocation).length !== 0
    ) {
      // Map.autoZoom(map, Map)
    }
  }, [userLocation, requestListContents]);

  const clickBackBtn = () => {
    if (!isDetail) {
      navigate("/");
    } else {
      setIsDetail(false);
      document.getElementById("TMapSearch")!.style.display = "block";
    }
  };

  // 오더 클릭시 세부정보 노출
  const clickOrder = (index: number) => {
    document.getElementById("TMapSearch")!.style.display = "none";
    setShowOrder(index);
    setIsDetail(true);
  };

  return (
    <div>
      <TopBarOthers
        title={topBarTitle}
        redirectLogic={() => clickBackBtn()}
      ></TopBarOthers>
      <div>
        <div
          id="TMapSearch"
          style={{
            height: "100%",
            width: "100%",
          }}
        />
      </div>
      {showAllowance ? (
        <IncreaseAllowance />
      ) : (
        <>
          {!isDetail ? (
            <Search clickOrder={(index) => clickOrder(index)} />
          ) : (
            <Search_Detail />
          )}
        </>
      )}
      <BottomBar></BottomBar>
    </div>
  );
}

export default SearchPage;
