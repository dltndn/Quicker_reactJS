import React, { createElement, useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import Map from "../script/Tmap"



const Tmap = () => {
    useEffect(() => {
        let map = Map.initTmap();
        Map.setMarker(map, 37.56520450, 126.98702028)
        Map.setViewMap(map, 37.56520450, 126.98607028)
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