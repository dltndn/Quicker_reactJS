import React, { createElement, useEffect, useState } from 'react';
import ReactDOM from "react-dom";

// @ts-ignore
const { Tmapv3 } = window;

const TmapObject = {

    initTmap: () => {
        return new Tmapv3.Map("TMapApp", {
            center: new Tmapv3.LatLng(37.56520450, 126.98702028),
            width: "300px",	// 지도의 넓이
            height: "300px",	// 지도의 높이
            zoom: 16	// 지도 줌레벨
        });
    },

    setMarker: (map: any, lat: number, lon: number) => {
        new Tmapv3.Marker({
            position: new Tmapv3.LatLng(lat, lon),
            map: map
        });
    },

    setViewMap: (map: any, lat: number, lon: number) => {
        map.setCenter(new Tmapv3.LatLng(lat, lon));
        map.setZoom(16);
    }
}

const Tmap = () => {
    useEffect(() => {
        let map = TmapObject.initTmap();
        TmapObject.setMarker(map, 37.56520450, 126.98702028)
        TmapObject.setViewMap(map, 37.56520450, 126.98607028)
    }, [])

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

export default Tmap;