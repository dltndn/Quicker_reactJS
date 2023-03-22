import React, { useEffect, useState } from "react";
import BottomBar from "../components/BottomBar";
import TopBarOthers from "../components/topBarOthers"
import { useNavigate } from "react-router-dom";
import Map from "../lib/Tmap"
import Geolocation from "../lib/Geolocation";
import Handler from "../lib/Handler";

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
    fetch("http://localhost:9000/checkJoin", {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
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
      <BottomBar></BottomBar>
    </div>
  );
}

export default SearchPage;