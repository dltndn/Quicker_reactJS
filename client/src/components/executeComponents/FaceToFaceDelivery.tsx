import BottomConfirmBtn from "../bottomconfirmBtn"
import React, { useRef } from "react";
import styled from "styled-components";
import { isMobile } from "react-device-detect";
import { WriteTransactionToBlockchain } from "../../utils/ExecuteOrderFromBlockchain";
import WaitClientConfirm from "./WaitClientConfirm";
import { ExecutionComponentProps } from "../../pages/ExecutionPage";
import { useExecutionState } from "../../pages/ExecutionPage";

const CameraContainer = styled.div`
  width: 95%;
  height: 500px;
  background-color: #ffffff;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const Div0 = styled.div`
    display: flex;
    justify-content: center;
`;

const Sp0 = styled.span`
margin: 10px 0 10px 0%;
font-size: var(--font-md1);
font-weight: bold;
`;

const Camera = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
  
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Failed to start camera: ", err);
      }
    };
  
    if (isMobile) {
      return (
        <div onClick={startCamera}>
          <p>Click to start camera</p>
        </div>
      );
    } else {
      return null;
    }
  };
  

export default function FaceToFaceDelivery({ orderNum }: ExecutionComponentProps) {
  const { setShowComponent } = useExecutionState()
    const videoRef = useRef<HTMLVideoElement>(null);
    
  return (
    <>
    <Div0>
        <CameraContainer>
            <video autoPlay ref={videoRef} />
        </CameraContainer>
    </Div0>
    <Div0><Sp0>수취인의 QR 코드를 확인해주세요.</Sp0></Div0>
        <Camera />
<<<<<<< HEAD
        
=======
>>>>>>> b8d111fd24e63b1e5d196e67fdb989ba6b530f4b
    </>
  );
};

