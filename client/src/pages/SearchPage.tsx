
import React, { useEffect, useState, useRef } from "react";
import BottomBar from "../components/BottomBar";
import TopBarOthers from "../components/topBarOthers"
import { useNavigate } from "react-router-dom";
import Map from "../lib/Tmap"
import Geolocation from "../lib/Geolocation";
import Handler from "../lib/Handler";
import Search from "../components/Search";

function SearchPage() {
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

  return (
    <div>
      <TopBarOthers title="의뢰목록" redirectLogic={function () {
        navigate("/")
      }}></TopBarOthers>
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
      <Search/>
      <BottomBar></BottomBar>
    </div>
  );
}

export default SearchPage;