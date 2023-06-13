import { useEffect } from "react"

const QRcode = require('qrcode')


const generateQRCode = () => {
    const canvas = document.getElementById('canvas')

    QRcode.toCanvas(canvas, 'sample text', function (error: any) {
        if (error) console.error(error)
        console.log('success!');
    })
}

export default function QRCode() {
    
    useEffect(() => {
        generateQRCode()
    }, [])

    return (
        <>
            <canvas id="canvas"></canvas>
        </>
    )
}