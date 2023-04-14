import React, { createElement, useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import Map from "../lib/Tmap"
import { useOrderDataStore } from '../pages/commission';

const Tmap = ({states, containerId }: props) => {

    const [map, setMap] = useState({})
    const [startMarker, setStartMarker] = useState({})
    const [arriveMarker, setArriveMarker] = useState({})

    useEffect(() => {
        setMap(Map.initTmap())
    }, [])

    useEffect(() => {
        if (isPosition(states.startPosition)) {
            // @ts-ignore
            setStartMarker(Map.Marker(map, states.startPosition.latitude, states.startPosition.longitude))
        }
        if (isPosition(states.arrivePosition)) {
            // @ts-ignore
            setArriveMarker(Map.Marker(map, states.arrivePosition.latitude, states.arrivePosition.longitude))
        }
    }, [states.startPosition, states.arrivePosition])

    useEffect(() => {
        if (isPosition(states.startPosition)) {
            // @ts-ignore
            Map.panTo(map, startMarker.getPosition())
        }
    }, [startMarker])

    useEffect(() => {
        if (isPosition(states.arrivePosition)) {
            // @ts-ignore
            Map.setViewMap(map, arriveMarker.getPosition())
        }
    }, [arriveMarker])

    useEffect(() => {
        if (isPosition(states.startPosition) && isPosition(states.arrivePosition)) {
            // @ts-ignore
            let centerLatLng = Map.LatLng((startPosition.latitude + arrivePosition.latitude) / 2, (arrivePosition.longitude + startPosition.longitude) / 2)
            // @ts-ignore
            Map.autoZoom(map, centerLatLng, startMarker.getPosition(), arriveMarker.getPosition())
            // @ts-ignore
            Map.getRoutePlanJson(map, startMarker.getPosition(), arriveMarker.getPosition())
        }
    }, [startMarker, arriveMarker])
    const isPosition = (position : position) => {
        return ((position.latitude !== undefined&& position.longitude !== undefined))
    }

    return (
        <div id={containerId}>
            <div
                id="TMapApp"
                style={{
                    height: "300px",
                    width: "100%",
                }}
            />
        </div>
    );
}

export default Tmap;

interface position {
    latitude?: number,
    longitude?: number
}

interface states{
    startPosition : any,
    arrivePosition : any
}


interface props {
    states : states
    containerId: string
}