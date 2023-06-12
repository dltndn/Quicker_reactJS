// To use Html5QrcodeScanner (more info below)
import { Html5QrcodeScanner } from "html5-qrcode";

// To use Html5Qrcode (more info below)
import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useState } from "react";

export default function QR() {

    const [scanResult, setScanResult] = useState(null)
    const [html5QrCode, setHtml5QrCode] = useState<Html5Qrcode | null>(null)

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

    useEffect(() => {
        if (html5QrCode !== null) {
            const qrCodeSuccessCallback = (decodedText: any, decodedResult: any) => {
                alert(JSON.stringify(decodedResult))
            };
            const qrCodeErrorCallback = (decodedText: any, decodedResult: any) => {
                /* handle success */
            };
            const config = { fps: 10, qrbox: { width: 250, height: 250 } };
    
            // If you want to prefer back camera
            html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback, qrCodeErrorCallback);
        }
        
    }, [html5QrCode])

    useEffect(() => {
        Html5Qrcode.getCameras().then(devices => {
            /**
             * devices would be an array of objects of type:
             * { id: "id", label: "label" }
             */
            if (devices && devices.length) {
                var cameraId = devices[0].id;
                // .. use this to start scanning.
                console.log(cameraId)

                setHtml5QrCode(new Html5Qrcode("reader"))

            }
        }).catch(err => {
            // handle err
        });

    }, [])

    return (
        <>
            {scanResult
                ? <div>Success: {scanResult}</div>
                : <div id="reader"></div>
            }
            <button onClick={onclick}>stop</button>
        </>
    )
}