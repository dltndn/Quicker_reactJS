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
        if (isPosition(startPosition)) {
            // @ts-ignore
            setStartMarker(Map.Marker(map, startPosition.latitude, startPosition.longitude))
        }
        if (isPosition(arrivePosition)) {
            // @ts-ignore
            setArriveMarker(Map.Marker(map, arrivePosition.latitude, arrivePosition.longitude))
        }
    }, [startPosition, arrivePosition])

    useEffect(() => {
        if (isPosition(startPosition)) {
            // @ts-ignore
            Map.panTo(map, startMarker.getPosition())
        }
    }, [startMarker])

    useEffect(() => {
        if (isPosition(arrivePosition)) {
            // @ts-ignore
            Map.setViewMap(map, arriveMarker.getPosition())
        }
    }, [arriveMarker])

    useEffect(() => {
        if (isPosition(startPosition) && isPosition(arrivePosition)) {
            // @ts-ignore
            let centerLatLng = Map.LatLng((startPosition.latitude + arrivePosition.latitude) / 2, (arrivePosition.longitude + startPosition.longitude) / 2)
            // @ts-ignore
            Map.autoZoom(map, centerLatLng, startMarker.getPosition(), arriveMarker.getPosition())
            // @ts-ignore
            Map.getRoutePlanJson(map, startMarker.getPosition(), arriveMarker.getPosition())
        }
    }, [startMarker, arriveMarker])
    const isPosition = (position : position) => {
        return (position.latitude && position.longitude)
    }
    const onClick = () => {
        
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
            {/* <button onClick={onClick}>check</button> */}
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