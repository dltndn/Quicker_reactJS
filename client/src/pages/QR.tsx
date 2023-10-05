// To use Html5Qrcode (more info below)
import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useDeliveredComponent } from "../components/executeComponents/DeliveredItem";
import { useParams } from "react-router-dom";
import { useConnWalletInfo } from "../App";
import Lottie from "lottie-react";
import CheckAni from "../Lottie/CheckAni.json";

export default function QR() {
    const [html5QrCode, setHtml5QrCode] = useState<Html5Qrcode | null>(null)
    const { isFace, hasScanResult, setHasScanResult } = useDeliveredComponent()
    const { address } = useConnWalletInfo();
    const { orderNumber } = useParams();

    const qrCodeSuccessCallback = (decodedText: any, decodedResult: any) => {
        // scan 통과 여부
        


        if (true && orderNumber !== undefined) {
            // scan 통과
            console.log(decodedText, decodedResult)
            const validationInfos = JSON.parse(decodedText)
            if (validationInfos.validationInfo === address && validationInfos.orderNum === parseInt(orderNumber)) {
                // 성공
                setHasScanResult(true)
            }
            stopScanner()
        } else if (orderNumber !== undefined) {
            alert("잘못된 URL 입니다.")
        } else {
            alert("잘못된 QR코드 입니다.")
        }
        
    };
    const qrCodeErrorCallback = (decodedText: any, decodedResult: any) => {
        /* handle success */
        setHasScanResult(false)
    };

    const stopScanner = () => {
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
            const config = { fps: 10, qrbox: { width: 310, height: 310 } };
            // If you want to prefer back camera
            html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback, qrCodeErrorCallback);
        }
    }

    useEffect(() => {
        setHtml5QrCode(new Html5Qrcode("reader"))
    }, [])

    useEffect(() => {
        if (isFace) {
            start()
        } else {
            stopScanner()
        }
        return () => {
            if (!hasScanResult) {
                stopScanner()
            }
        }
    }, [isFace, html5QrCode])

    return (
        <>
         <CameraContainer>
            {hasScanResult
                ? <Lottie animationData={CheckAni}/>
                :<div id="reader" style={{width: "100%", height: "100%"}} />
            }
            </CameraContainer>
        </>
    )
}

const CameraContainer = styled.div`
  display:flex;
  width: 95%;
  height: 40em;
  background-color: #ffffff;
  border-radius: 10px;
  margin-bottom: 10px;
  justify-content: center;
  flex-direction: center;
`;