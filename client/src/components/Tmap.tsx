import React, { createElement, useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import Map from "../script/Tmap"

const Tmap = ({ containerId, startPosition, arrivePosition }: props) => {

    const [map, setMap] = useState({})
    const [startMarker, setStartMarker] = useState({})
    const [arriveMarker, setArriveMarker] = useState({})
    const [mapDIV, setMapDIV] = useState({})

    useEffect(() => {
        setMap(Map.initTmap())
    }, [])

    useEffect(() => {
        if (startPosition.latitude && startPosition.longitude) {
            setStartMarker(Map.Marker(map, startPosition.latitude, startPosition.longitude))
        }
        if (arrivePosition.latitude && arrivePosition.longitude) {
            setArriveMarker(Map.Marker(map, arrivePosition.latitude, arrivePosition.longitude))
        }
    }, [startPosition, arrivePosition])

    useEffect(() => {
        if ((startPosition.latitude && startPosition.longitude) && (arrivePosition.latitude && arrivePosition.longitude)) {
            let centerLatLng = Map.LatLng((startPosition.latitude + arrivePosition.latitude) / 2, (arrivePosition.longitude + startPosition.longitude) / 2)
            // @ts-ignore
            Map.autoZoom(map, centerLatLng, startMarker.getPosition(), arriveMarker.getPosition())
        }
    }, [startMarker, arriveMarker])

    const onClick = () => {
        Map.testingobject(map)
    }

    return (
        <div id={containerId}>
            <div
                id="TMapApp"
                style={{
                    height: "300px",
                    width: "300px",
                }}
            />
            {/* <div>{JSON.stringify(mapDIV)}</div> */}
            <button onClick={onClick}>check</button>
        </div>
    );
}

export default Tmap;



interface position {
    latitude?: number,
    longitude?: number
}

interface props {
    containerId: string
    startPosition: position
    arrivePosition: position
}