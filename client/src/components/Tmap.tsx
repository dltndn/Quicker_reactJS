import React, { createElement, useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import Map from "../lib/Tmap"
import { useOrderDataStore } from '../pages/commission';

const Tmap = ({states, containerId }: props) => {
    const [tMap, setTmap] = useState<any>()
    const [startMarker, setStartMarker] = useState({})
    const [arriveMarker, setArriveMarker] = useState({})

    useEffect(() => {
        setTmap(new Map("TMapApp", "30em"))
    }, [])

    useEffect(() => {
        if (isPosition(states.startPosition)) {
            // @ts-ignore
            setStartMarker(tMap.createMarker(states.startPosition.latitude, states.startPosition.longitude))
        }
        if (isPosition(states.arrivePosition)) {
            // @ts-ignore
            setArriveMarker(tMap.createMarker(states.arrivePosition.latitude, states.arrivePosition.longitude))
        }
    }, [states.startPosition, states.arrivePosition])

    useEffect(() => {
        if (isPosition(states.startPosition)) {
            // @ts-ignore
            tMap.panTo(startMarker.getPosition())
        }
    }, [startMarker])

    useEffect(() => {
        if (isPosition(states.arrivePosition)) {
            // @ts-ignore
            tMap.setViewMap(arriveMarker.getPosition())
        }
    }, [arriveMarker])

    useEffect(() => {
        if (isPosition(states.startPosition) && isPosition(states.arrivePosition)) {
            // @ts-ignore
            let centerLatLng = tMap.createLatLng((states.startPosition.latitude + states.arrivePosition.latitude) / 2, (states.arrivePosition.longitude + states.startPosition.longitude) / 2)
            // @ts-ignore
            tMap.autoZoom(centerLatLng, startMarker.getPosition(), arriveMarker.getPosition())
            // @ts-ignore
            tMap.getRoutePlanJson(startMarker.getPosition(), arriveMarker.getPosition())
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