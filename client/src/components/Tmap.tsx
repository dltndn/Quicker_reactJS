import React, { createElement, useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import Map from "../script/Tmap"


// @ts-ignore
const { Tmapv3 } = window;

interface basicPos {
    latitude?: number,
    longitude?: number
}

interface Position {
    containerId: string
    startPosition: basicPos
    arrivePosition: basicPos
}
    
interface position {
    latitude?: number,
    longitude?: number
}

interface props {
    containerId: string
    startPosition: position
    arrivePosition: position
}

const Tmap = ({ containerId, startPosition, arrivePosition }: props) => {
    
    const [map , setMap] = useState({})
    const [startMarker , setStartMarker] = useState({})
    const [arriveMarker , setArriveMarker] = useState({})

    useEffect(() => {
        setMap(Map.initTmap())
    }, [])

    useEffect(() => {
        console.log(startPosition, arrivePosition)
        if (startPosition.latitude && startPosition.longitude) {
            setStartMarker(Map.Marker(map, startPosition.latitude, startPosition.longitude))
            Map.setViewMap(map, startPosition.latitude, startPosition.longitude);
            if (arrivePosition.latitude && arrivePosition.longitude) {
                setArriveMarker(Map.Marker(map, arrivePosition.latitude, arrivePosition.longitude))
                Map.setViewMap(map, (startPosition.latitude + arrivePosition.latitude) / 2, (arrivePosition.longitude + startPosition.longitude) / 2);
            }
        }
    }, [startPosition, arrivePosition])


    return (
        <div id={containerId}>
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