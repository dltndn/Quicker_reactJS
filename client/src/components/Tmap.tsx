import React, { createElement, useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import Map from "../script/Tmap"

const Tmap = ({ containerId, startPosition, arrivePosition }: props) => {

    const [map, setMap] = useState({})
    const [pos, setPos] = useState<position>({})
    const [startMarker, setStartMarker] = useState({})
    const [arriveMarker, setArriveMarker] = useState({})
    const [zoomLevel, setZoomLevel] = useState(13)
    const [markersBound, setMarkersBound] = useState({})
    const [mapDIV, setMapDIV] = useState({})

    useEffect(() => {
        setMap(Map.initTmap())
        
    }, [])

    useEffect(() => {
        if (startPosition.latitude && startPosition.longitude) {
            setStartMarker(Map.Marker(map, startPosition.latitude, startPosition.longitude))
            Map.setViewMap(map, startPosition.latitude, startPosition.longitude);
            if (arrivePosition.latitude && arrivePosition.longitude) {
                Map.setViewMap(map, (startPosition.latitude + arrivePosition.latitude) / 2, (arrivePosition.longitude + startPosition.longitude) / 2);
                setArriveMarker(Map.Marker(map, arrivePosition.latitude, arrivePosition.longitude))
                
                // 중심점 기준 왼쪽 찾음    
                if (startPosition.longitude < arrivePosition.longitude) {
                    
                    setPos({ latitude: startPosition.longitude, longitude: startPosition.latitude })
                    
                    console.log("markers : " ,startPosition.longitude, startPosition.latitude, arrivePosition.longitude, arrivePosition.latitude)
                    Map.test(map, (startPosition.latitude + arrivePosition.latitude) / 2, (arrivePosition.longitude + startPosition.longitude) / 2, 
                    startPosition.latitude, startPosition.longitude, arrivePosition.latitude, arrivePosition.longitude)
                    
                    // setMarkersBound(Map.initBound(startPosition.longitude, startPosition.latitude, arrivePosition.longitude, arrivePosition.latitude))
                }
                else {
                    setPos({ latitude: arrivePosition.longitude, longitude: arrivePosition.latitude })
                    // setMapDIV(Map.getBound(map))
                }
            }
        }
    }, [startPosition, arrivePosition])

    const onClick = () => {
        //ok
        // Map.test(map)
        
        // console.log("markers bound : ", markersBound)
        // console.log("map bound : ",Map.getBound(map))
        // Map.fitmap(map,markersBound,10)

        //no
        // console.log(Map.containMarker(Map.getBound(map), markersBound))
        // setMapDIV(Map.containMarker(Map.getBound(map), markersBound))
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
            <div>{JSON.stringify(mapDIV)}</div>
            <button onClick={onClick}>onClick</button>
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