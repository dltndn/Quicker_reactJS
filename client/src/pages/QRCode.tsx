import { useEffect } from "react"

const QRcode = require('qrcode')


const generateQRCode = (text : string) => {
    const canvas = document.getElementById('canvas')

    QRcode.toCanvas(canvas, text, function (error: any) {
        if (error) console.error(error)
        console.log('success!');
    })
}

interface QRCode {
    validationInfos: validationInfos
}

interface validationInfos {
    orderNum: string | undefined;
    validationInfo : string | null;
}

export default function QRCode(props : QRCode ) {
    const {validationInfos} = props
    useEffect(() => {
        generateQRCode(JSON.stringify(validationInfos))
        console.log(JSON.stringify(validationInfos))
    }, [])

    return (
        <>
            <canvas id="canvas"></canvas>
        </>
    )
}