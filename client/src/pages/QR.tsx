// To use Html5QrcodeScanner (more info below)
import { Html5QrcodeScanner } from "html5-qrcode";

// To use Html5Qrcode (more info below)
import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useState } from "react";

export default function QR() {
    const [scanResult, setScanResult] = useState(null)
    const [html5QrCode, setHtml5QrCode] = useState<Html5Qrcode | null>(null)

    const qrCodeSuccessCallback = (decodedText: any, decodedResult: any) => {
        alert(JSON.stringify(decodedResult))
        console.log(decodedText, decodedResult)
    };
    const qrCodeErrorCallback = (decodedText: any, decodedResult: any) => {
        /* handle success */
    };

    const onclick = () => {
        if (html5QrCode !== null) {
            html5QrCode.stop().then((ignore) => {
                // QR Code scanning is stopped.
                console.log(ignore)
            }).catch((err: any) => {
                // Stop failed, handle it.
                console.log(err)
            })
        }
    }
    const start = () => {
        if (html5QrCode !== null) {
            
            const config = { fps: 10, qrbox: { width: 250, height: 250 } };
    
            // If you want to prefer back camera
            html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback, qrCodeErrorCallback);
        }
    }

    useEffect(() => {
        start()
    }, [html5QrCode])

    useEffect(() => {
        setHtml5QrCode(new Html5Qrcode("reader"))
    }, [])

    return (
        <>
            {scanResult
                ? <div>Success: {scanResult}</div>
                : <div id="reader"></div>
            }
            <button onClick={onclick}>stop</button>
            
            <button onClick={start}>start</button>
        </>
    )
}