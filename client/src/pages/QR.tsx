// To use Html5QrcodeScanner (more info below)
import { Html5QrcodeScanner } from "html5-qrcode";

// To use Html5Qrcode (more info below)
// import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useState } from "react";

export default function QR() {

    const [scanResult, setScanResult] = useState(null)

    useEffect(() => {
        const scanner = new Html5QrcodeScanner("reader", {
            qrbox: {
                width: 250,
                height: 250,
            }, 
            fps: 5
        }, undefined)
    
        scanner.render(success, error);
    
        function success (result : any) {
            scanner.clear();
            setScanResult(result)
            console.log(result)
        }
    
        function error (error : any) {
            console.log(error)
        }
    
    }, [])
    
    return (
        
        <>
            <h1>QR Code Scanning in React</h1>
            { scanResult
            ? <div>Success: <a href={'http://'}></a></div>
            : <div id="reader"></div>
            }
        </>
    )
}