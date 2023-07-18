import { useEffect } from "react"
import { useLiveState } from "./ReceipientPage";
import { redirect, useNavigate } from "react-router-dom";
import { useConnWalletInfo } from "../App";

const QRcode = require('qrcode')


const generateQRCode = (text : string) => {
    const canvas = document.getElementById('canvas')

    QRcode.toCanvas(canvas, text, function (error: any) {
        if (error) console.error(error)
        console.log('success!');
    })
}

export interface QRCode {
    validationInfos: validationInfos
}

export interface validationInfos {
    orderNum: string | undefined;
    validationInfo : string | null;
}

export default function QRCode(props : QRCode ) {
    const {validationInfos} = props
    const {address} = useConnWalletInfo();
    const navigate = useNavigate();
    useEffect(() => {
        console.log(validationInfos.validationInfo, address)
        if (validationInfos.validationInfo === address) {
            alert("비정상적 접근입니다.")
            navigate('/')
        } else {
            const QRInfo = JSON.stringify(validationInfos)
            generateQRCode(QRInfo)
            console.log(QRInfo)
        }
    }, [])

    return (
        <>
            <canvas id="canvas"></canvas>
        </>
    )
}