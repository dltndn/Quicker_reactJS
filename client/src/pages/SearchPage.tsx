import React, { useEffect, useState } from "react";
import BottomBar from "../components/BottomBar";
import TopBarOthers from "../components/topBarOthers"
import { useNavigate } from "react-router-dom";
import Tmap from "../lib/Tmap";
import Geolocation from "../lib/Geolocation";

function SearchPage() {
  const navigate = useNavigate()
  const [map, setMap] = useState({})
  const [userLocation, setUserLocation] = useState({})

  useEffect(() => {
    setMap(Tmap.initTmap());
    Geolocation.getCurrentLocation(setUserLocation)
  }, [])

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