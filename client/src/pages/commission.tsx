import React, { createElement, useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import Tmap from "../components/Tmap"
import Postcode from "../components/Postcode"

const showMap = () => document.getElementById("TMapApp")!.style.display = "block"

const hideMap = () => document.getElementById("TMapApp")!.style.display = "none"

const isGeolocation = () => navigator.geolocation

const getLatLon = () => {
    return new Promise(
        (resolve, rejected) => navigator.geolocation.getCurrentPosition(resolve, rejected)
    );
}

export default function CommissionPage() {

    const [startPosition, setStartPosition] = useState({})
    const [arrivePosition, setArrivePosition] = useState({})
    // 좌표 확인용 코드
    const onClick = () => {
        console.log(startPosition, arrivePosition)
    }
    return (
        <>
            <Tmap containerId={"mapContainerBox"} startPosition={startPosition} arrivePosition={arrivePosition} />
            <Postcode postcodeBoxId={"startpostcodeBox"} containerId={"startContainerBox"} title={"출발지"} style={{display : "block"}} adressTextBoxId={"startAdress"} onClick={() => { document.getElementById("startContainerBox")!.style.display = "none"; document.getElementById("arriveContainerBox")!.style.display = "block"; }} setPosition={setStartPosition} />
            <Postcode postcodeBoxId={"arrivepostcodeBox"} containerId={"arriveContainerBox"} title={"도착지"} style={{display : "none"}} adressTextBoxId={"arriveAdress"} onClick={() => { document.getElementById("arriveContainerBox")!.style.display = "none"; document.getElementById("mapContainerBox")!.style.display = "none"; }} setPosition={setArrivePosition} />
            <button onClick={onClick} >check</button>
        </>
    );
}