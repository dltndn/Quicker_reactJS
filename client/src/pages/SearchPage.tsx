import React, { useEffect, useState } from "react";
import BottomBar from "../components/BottomBar";
import TopBarOthers from "../components/topBarOthers"
import { useNavigate } from "react-router-dom";
import Map from "../lib/Tmap"
import Geolocation from "../lib/Geolocation";

function SearchPage() {
  
  const navigate = useNavigate()
  const [map, setMap] = useState({})
  const [userLocation, setUserLocation] = useState({})
  
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
  }, [])

  useEffect(() => {
    if (Object.keys(userLocation).length !== 0) {
      initalizeUserMarker()
    }
  }, [userLocation])

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
      <div>{"location : " + JSON.stringify(userLocation)}</div>
      <BottomBar></BottomBar>
    </div>
  );
}

export default SearchPage;