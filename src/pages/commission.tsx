import React, { createElement, useEffect, useState } from 'react';
import ReactDOM from "react-dom";
// import Tmap from "../script/Tmap"

// @ts-ignore
const { Tmapv3 } = window;

const Tmap = {
    initTmap : () => {
        Tmap.removeInnerMapContent()
        // map 생성
        // Tmapv3.Map을 이용하여, 지도가 들어갈 div, 넓이, 높이를 설정합니다.
        return new Tmapv3.Map("TMapApp", {
            center: new Tmapv3.LatLng(37.56520450, 126.98702028),
            width: "300px",	// 지도의 넓이
            height: "300px",	// 지도의 높이
            zoom: 16	// 지도 줌레벨
        });
    },

    setMarker : (map: any, lat: number, lon: number) => {
        new Tmapv3.Marker({
            position: new Tmapv3.LatLng(lat, lon),
            map: map
        });
    },

    setViewMap : (map: any, lat: number, lon: number) => {
        map.setCenter(new Tmapv3.LatLng(lat, lon));
        map.setZoom(16);
    },

    removeInnerMapContent : () => {
        if (document.getElementById("TMapApp")) {
            document.getElementById("TMapApp")!.innerHTML = ""
        }
    }
}

const showMap = () => document.getElementById("TMapApp")!.style.display = "block"

const hideMap = () => document.getElementById("TMapApp")!.style.display = "none"

const isGeolocation = () => navigator.geolocation

const getLatLong = () =>{
    return new Promise(
        (resolve, rejected) => navigator.geolocation.getCurrentPosition(resolve, rejected)
    );
}


export default function CommissionPage() {
    useEffect(() => {
        let map = Tmap.initTmap()
        Tmap.setMarker(map, 37.56520450, 126.98702028)
        Tmap.setViewMap(map, 37.56520450, 126.98607028)
    } ,[])


    return (
        <div>
            <div
                id="TMapApp"
                style={{
                    height: "300px",
                    width: "300px",
                }}
            />
        </div>
    );
}



 