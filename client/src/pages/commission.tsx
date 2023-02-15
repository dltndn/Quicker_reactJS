import React, { createElement, useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import Tmap from "../components/Tmap"
import Postcode from "../components/Postcode"

const showMap = () => document.getElementById("TMapApp")!.style.display = "block"

const hideMap = () => document.getElementById("TMapApp")!.style.display = "none"

const isGeolocation = () => navigator.geolocation

const getLatLong = () => {
    return new Promise(
        (resolve, rejected) => navigator.geolocation.getCurrentPosition(resolve, rejected)
    );
}


export default function CommissionPage() {

    const [startPosition, setStartPosition] = useState({})
    const [arrivePosition, setArrivePosition] = useState({})

    return (
        <>
            <Tmap containerId={"mapContainerBox"} startPosition={startPosition} arrivePosition={arrivePosition}></Tmap>
            <Postcode containerId={"startContainerBox"} adressTextBoxId={"startAdress"} onClick={() => { document.getElementById("startContainerBox")!.style.display = "none" }} setPosition={setStartPosition} ></Postcode>
            <Postcode containerId={"arriveContainerBox"} adressTextBoxId={"arriveAdress"} onClick={() => { document.getElementById("arriveContainerBox")!.style.display = "none";document.getElementById("mapContainerBox")!.style.display = "none"; }} setPosition={setArrivePosition} ></Postcode>
            {/* <button onClick={onClick} >check</button> */}
        </>
    );
}