import React, { createElement, useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import Map from "../lib/Tmap"
import { useOrderStore } from '../pages/commission';
import Handler from '../lib/Handler';

const Tmap = ({states, containerId }: props) => {
    const [tMap, setTmap] = useState<any>()
    const [startMarker, setStartMarker] = useState({})
    const [arriveMarker, setArriveMarker] = useState({})

    const { setRecommendCost } = useOrderStore()

    const setRecommendCostFunc = async (startPosition: position, arrivePosition: position) => {
        try {
            let distance = await tMap.getDistance({X: startPosition.longitude, Y: startPosition.latitude},
                {X: arrivePosition.longitude, Y: arrivePosition.latitude})
            // console.log(distance.distanceInfo.distance) // ex) 13163, type: number
            distance = distance.distanceInfo.distance / 1000
                
            const data = await Handler.get(`${process.env.REACT_APP_SERVER_URL}average/cost/?distance=${distance}`)
            // DB에서 불러온 추천 비용 string 타입으로 세팅
            setRecommendCost(`${data.distance}`)
        } catch (e) {
            console.log(e)
            setRecommendCost("")
        }
        
    }

    useEffect(() => {
        setTmap(new Map("TMapApp", "30em"))
        console.log("tmap 객체 생성")
        return () => {
            setTmap(null)
            console.log("tmap 객체 제거")
        }
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
        if (isPosition(states.startPosition) && isPosition(states.arrivePosition)) {
            // 추천 비용 세팅하기
            setRecommendCostFunc(states.startPosition, states.arrivePosition)
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