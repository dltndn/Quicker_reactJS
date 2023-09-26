import BottomConfirmBtn from "../bottomconfirmBtn"
import { ChangeEventHandler, SetStateAction, useEffect, useRef, useState } from "react";
import { useExecutionState } from "../../pages/ExecutionPage";
import styled from "styled-components";
import { isMobile } from "react-device-detect";
import { ExecutionComponentProps } from "../../pages/ExecutionPage";
import { SendDataToAndroid } from "../../utils/SendDataToAndroid";
import { checkIsDelivering } from "../../utils/ExecuteOrderFromBlockchain";
import { BsPlusCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useConnWalletInfo } from "../../App";
import { FailedDeliveryStyle } from "../../StyleCollection";

const {Div0, Div1, Div2, Div3, Box, Bt0, Container, Span01, ReqFont, Ipdet} = new FailedDeliveryStyle()



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

export default function FailedDelivery({ orderNum }: ExecutionComponentProps) {
    const textArea = useRef<HTMLTextAreaElement>(null);
    const file = useRef<HTMLInputElement>(null);
    const [fileImage, setFileImage] = useState<File | undefined | null>(undefined);
    const { address } = useConnWalletInfo()
    const { setTitle } = useExecutionState()
    const navigate = useNavigate();

    const postImage = async () => {
      if (fileImage !== null && fileImage && orderNum !== undefined ) {
        const formData = new FormData();
        formData.append("image" , fileImage);
        formData.append("orderNum" , orderNum);
        
        if (textArea.current?.value !== undefined) {
          formData.append("reason" , textArea.current?.value)
        } else {
          formData.append("reason" , "")
        }
        
        const response = await fetch(process.env.REACT_APP_SERVER_URL + "order/image/fail", {
          method: 'POST', 
          body: formData
        });
        const message = await response.json()
        if (message.msg === "done") {
          alert("전송완료")
        }
      }
    }
    
    const failedRogic = async () => {
      const sdta = new SendDataToAndroid(address)
      try {
        if (!(await checkIsDelivering(address))) {
          sdta.sendIsDelivering(false)
        }
        // 배송 실패 사진 업로드 로직 작성
        await postImage()
        navigate("/");
      } catch(e) {
        console.log(e)
      }
      // 메인으로 리다이렉트
    }

    const onChange = () =>{
      if (file.current?.files?.[0]) {
        setFileImage(file.current.files[0]);
      }
    }

    const clickPlusIcon = () => {
      file.current?.click();
    }

    useEffect(() => {
        setTitle("배송결과")
    }, [])
    return(
        <>
        <Div3>
          <Div1>
            <Bt0>배송실패</Bt0>
          </Div1>
        </Div3>
        <Div0>
          {/* 컴포넌트 수정 필요 */}
          
          <input ref={file} type="file" name="file" accept="image/*" capture="environment" onChange={onChange} style={{display : "none"}}/>
          {(fileImage === undefined || fileImage === null) ? 
          <div>
            <span onClick={clickPlusIcon}>
            <Div2>
                <Span01>
                <BsPlusCircle/><br/><br/>
                  사진을 업로드해주세요.
                </Span01>
            </Div2>
            </span>
          </div> :
            <div>
              <img onClick={clickPlusIcon} src={URL.createObjectURL(fileImage)} alt="uploaded photo" width="100%"/>
            </div>
          }
          
        </Div0>
        <Container>
          <Box>
            <div>
              <ReqFont>배송 실패 사유</ReqFont>
            </div>
            <div>
              
              <Ipdet ref={textArea}></Ipdet>
            </div>
          </Box>
        </Container>
            <BottomConfirmBtn
            isDisabled={false}
            content="확인"
            confirmLogic={async() => {
              // await postImage();
              await failedRogic();
            }}
          />
        </>
    )
}
