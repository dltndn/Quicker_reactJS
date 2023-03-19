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
    setUserLocation(() => Geolocation.getCurrentLocation())

  }, [])

  const onclick = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos: any) {
      const crd = pos.coords;
      return { latitude: crd.latitude, longitude: crd.longitude }
    }

    function error(err: any) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }

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
      <div>{JSON.stringify(userLocation)}</div>
      <BottomBar></BottomBar>
    </div>
  );
}

export default SearchPage;