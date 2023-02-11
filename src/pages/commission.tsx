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
    const [state, setState] = useState({})

    let a = (document.getElementById("latitude") as HTMLInputElement)

    useEffect(() =>{
        let result = (document.getElementById("latitude") as HTMLInputElement).value
        console.log(result)
    }, [a])

    return (
        <>
            <Tmap></Tmap>
            <Postcode ></Postcode>
        </>
    );
}