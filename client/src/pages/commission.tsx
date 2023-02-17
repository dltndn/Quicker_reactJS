import React, {createElement, useEffect, useState } from 'react';
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
    const onClick = () =>{
        console.log(startPosition)
    }
    return (
        <>
            <Tmap></Tmap>
            <Postcode setStartPosition={setStartPosition} ></Postcode>
            <button onClick={onClick} >check</button>
        </>
    );
}