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
        console.log("tmap 객체 생성")
    }, [])

    useEffect(() => {
        if(states.startPosition) {
            if (isPosition(states.startPosition)) {
                setStartMarker(tMap.createMarker(states.startPosition.latitude, states.startPosition.longitude, 1))
            }
        }
        if (states.arrivePosition) {
            if (isPosition(states.arrivePosition)) {
                setArriveMarker(tMap.createMarker(states.arrivePosition.latitude, states.arrivePosition.longitude, 2))
            }
        }
    }, [states.startPosition, states.arrivePosition])

    useEffect(() => {
        if (isPosition(states.startPosition)) {
            const pos = tMap.createLatLng(states.startPosition.latitude, states.startPosition.longitude)
            tMap.panTo(pos)
        }
    }, [startMarker])

    useEffect(() => {
        if (isPosition(states.arrivePosition)) {
            const pos = tMap.createLatLng(states.arrivePosition.latitude, states.arrivePosition.longitude)
            tMap.panTo(pos)
        }
    }, [arriveMarker])

    useEffect(() => {
        if (isPosition(states.startPosition) && isPosition(states.arrivePosition)) {
            const centerLatLng = tMap.createLatLng((states.startPosition.latitude + states.arrivePosition.latitude) / 2, (states.arrivePosition.longitude + states.startPosition.longitude) / 2)
            const startLatLng = tMap.createLatLng(states.startPosition.latitude, states.startPosition.longitude)
            const arriveLatLng = tMap.createLatLng(states.arrivePosition.latitude, states.arrivePosition.longitude)
            tMap.autoZoom(centerLatLng, startLatLng, arriveLatLng)
            tMap.getRoutePlanJson(startLatLng, arriveLatLng)
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