import React, { useEffect, useState } from "react";
import BottomBar from "../components/BottomBar";
import TopBarOthers from "../components/topBarOthers"
import { useNavigate } from "react-router-dom";
import Tmap from "../lib/Tmap";

function SearchPage() {
  const navigate = useNavigate()
  const [map, setMap] = useState({})
  const [userLocation, setUserLocation] = useState({})

  const getCurrentLocation = (setState : Function) => {
    if (navigator.geolocation) {
    
      navigator.geolocation.getCurrentPosition(function(position) {
              setState({lat : position.coords.latitude, lon : position.coords.longitude})
      });
    } else { 
        alert("위치를 사용할 수 없음")
    }
  }

  useEffect(() => {
    setMap(Tmap.initTmap());
    getCurrentLocation(setUserLocation)
  }, [])

  useEffect(() => {
    
    
  }, [map])

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