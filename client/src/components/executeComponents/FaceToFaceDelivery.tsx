import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import WaitClientConfirm from "./WaitClientConfirm";
import { ExecutionComponentProps } from "../../pages/ExecutionPage";
import { useExecutionState } from "../../pages/ExecutionPage";
import { SendDataToAndroid } from "../../utils/SendDataToAndroid";
import { checkIsDelivering } from "../../utils/ExecuteOrderFromBlockchain";
import QR from "../../pages/QR";
import { useDeliveredComponent } from "./DeliveredItem";
import SendTxK from "../blockChainTx/SendTxK";
import GetContractParams from "../blockChainTx/GetContractParams";
import { useConnWalletInfo } from "../../App";

const CameraContainer = styled.div`
  width: 95%;
  height: 600px;
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


export default function FaceToFaceDelivery({ orderNum }: ExecutionComponentProps) {
  const { setShowComponent } = useExecutionState()
  const { hasScanResult } = useDeliveredComponent()
  const { address } = useConnWalletInfo()
    // const videoRef = useRef<HTMLVideoElement>(null);

  const navigate = useNavigate()

    const deliveredRogic = async () => {
      if (orderNum !== undefined) {
          const sdta = new SendDataToAndroid(address)
          try {
              // 배송원 수행 중인 오더 확인 후 false값 전송
              if (!(await checkIsDelivering(address))) {
                  sdta.sendIsDelivering(false)
              }
              navigate("/")
          } catch(e) {
              console.log(e)
          }
      }
  }

  useEffect(() => {
    
  }, [])
    
  return (
    <>
    <Div0>
        <QR />
    </Div0>
    <Div0><Sp0>수취인의 QR 코드를 확인해주세요.</Sp0></Div0>
        {orderNum && <SendTxK param={GetContractParams.DeliveredOrder(orderNum)} successFunc={async() => await deliveredRogic()}/>}
    </>
  );
};

// const Camera = () => {
//     const videoRef = useRef<HTMLVideoElement>(null);
  
//     const startCamera = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       } catch (err) {
//         console.error("Failed to start camera: ", err);
//       }
//     };
  
//     if (isMobile) {
//       return (
//         <div onClick={startCamera}>
//           <p>Click to start camera</p>
//         </div>
//       );
//     } else {
//       return null;
//     }
//   };
  