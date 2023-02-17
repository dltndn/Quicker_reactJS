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

// 작동 문제
// const isHavePosition = (startPosition : position) => {
//     return (startPosition.latitude && startPosition.longitude)
// }
const Tmap = ({ containerId, startPosition, arrivePosition }: Position) => {
    
    
    // const onClick2 = (map : any) =>{
    //     console.log(map.realToScreen(Map.LatLng(37.566481622437934,126.98502302169841)).x)
    // }    
    
    // const onClick = () =>{
    //     document.getElementById("TMapApp")!.innerHTML = ""
    //     let map = Map.initTmap();    
    //     Map.Marker(map, 37.566481622437934,126.98502302169841)
    //     map.zoomOut()
    //     map.zoomOut()
    //     setTimeout(() => {
    //         console.log(map.realToScreen(Map.LatLng(37.566481622437934,126.98502302169841)).x )
    //     } , 2000)
        
    //     // while (map.realToScreen(Map.LatLng(37.566481622437934,126.98502302169841)).x > 0) {
    //     //     map.zoomOut();
    //     // }
    // }
    
    // const [map , setMap] = useState()

    // useEffect(() => {
    //     // 삭제
    //     document.getElementById("TMapApp")!.innerHTML = ""
    //     let map = Map.initTmap();
    //     let startMarker, arriveMarker
        
    //     if (startPosition.latitude && startPosition.longitude) {
    //         startMarker = Map.Marker(map, startPosition.latitude, startPosition.longitude)
    //         Map.setViewMap(map, startPosition.latitude, startPosition.longitude);
    //         if (arrivePosition.latitude && arrivePosition.longitude) {
    //             arriveMarker = Map.Marker(map, arrivePosition.latitude, arrivePosition.longitude)
    //             console.log(startPosition, arrivePosition, startPosition.latitude + arrivePosition.latitude / 2, arrivePosition.longitude + startPosition.longitude / 2)
    //             Map.setViewMap(map, (startPosition.latitude + arrivePosition.latitude) / 2, (arrivePosition.longitude + startPosition.longitude) / 2);
    //         }
    //     }
    // }, [startPosition, arrivePosition])

    const [map , setMap] = useState({})
    const [startMarker , setStartMarker] = useState({})
    const [arriveMarker , setArriveMarker] = useState({})

    useEffect(() => {
        setMap(Map.initTmap())
    }, [])

    useEffect(() => {
        if (startPosition.latitude && startPosition.longitude) {
            setStartMarker(Map.Marker(map, startPosition.latitude, startPosition.longitude))
            Map.setViewMap(map, startPosition.latitude, startPosition.longitude);
            if (arrivePosition.latitude && arrivePosition.longitude) {
                setArriveMarker(Map.Marker(map, arrivePosition.latitude, arrivePosition.longitude))
                Map.setViewMap(map, (startPosition.latitude + arrivePosition.latitude) / 2, (arrivePosition.longitude + startPosition.longitude) / 2);
            }
        }
    }, [startPosition, arrivePosition])


    // 동적 마커, 뷰 이동
    // let map
    // useEffect(() => {
    //     map = Map.initTmap();
    //     console.log(map)
    // }, [])

    // // let marker

    // if (startPosition.latitude && startPosition.longitude) {
    //     // marker = Map.Marker(map, startPosition.latitude, startPosition.longitude)    
    //     Map.setViewMap(map, startPosition.latitude, startPosition.longitude);
    // }

    return (
        <div id={containerId}>
            <div
                id="TMapApp"
                style={{
                    height: "300px",
                    width: "300px",
                }}
            />
            {/* <button onClick={onClick}>함수 확인 버튼</button>
            <button onClick={onClick2}>함수 확인 버튼2</button> */}
        </div>
    );
}

export default Tmap;