import BottomConfirmBtn from "../bottomconfirmBtn"
import { ChangeEventHandler, SetStateAction, useEffect, useRef, useState } from "react";
import { useExecutionState } from "../../pages/ExecutionPage";
import styled from "styled-components";
import { isMobile } from "react-device-detect";
import { ExecutionComponentProps } from "../../pages/ExecutionPage";
import { SendDataToAndroid } from "../../utils/SendDataToAndroid";
import { useAccount } from "wagmi";
import { checkIsDelivering } from "../../utils/ExecuteOrderFromBlockchain";

const CameraContainer = styled.div`
  width: 95%;
  height: 400px;
  background-color: #ffffff;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const Div0 = styled.div`
    display: flex;
    justify-content: center;
`;

const Divv = styled.div`
    display: flex;
    height: 3.875rem;
`;

const Div1 = styled.div`
    flex: 1 1 100%;
`;

const Btwal = styled.button`
    width: 100%;
    height: 3.25rem;
    font-size: var(--font-md);
    font-weight: bold;
    border: 0rem;
    outline: #efefef;
    background-color: #ffffff;
    padding-left: 0.625rem;
    text-align: center;
    color: #FF5353;
`;

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  border-radius: 0.313rem;
  margin-top: 0.5rem;
  width: 95%;
  background-color: #ffffff;
  padding: 0.75rem 1.125rem 0.75rem 1.125rem;
  text-align: center;
`;

const ReqFont = styled.span`
  font-size: 16px;
  font-weight: bold;
  margin-left: 0.313rem;
`;

const Ipval = styled.textarea`
    width: 2.75rem;
    height: 1.375rem;
    font-size: var(--font-small);
    border-radius: 0.313rem;
    border: 0rem;
    outline: #efefef;
    background-color: #efefef;
    text-align: center;
    border: 1px solid #efefef; /* 테두리 */
    outline: none; /* 포커스 시 발생하는 외곽선 제거 */

    &:focus {
        border-color: #efefef; /* 포커스 시 테두리 색상 변경 */
        background-color: #ffffff;
    }
`;

const Ipdet = styled(Ipval)`
    margin-top: 0.625rem;
    width: 100%;
    height: 80px;
    padding: 10px;
    
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

export default function FailedDelivery({ orderNum }: ExecutionComponentProps) {
    const textArea = useRef<HTMLTextAreaElement>(null);
    const file = useRef<HTMLInputElement>(null);
    const [fileImage, setFileImage] = useState<File | undefined | null>(undefined);
    const { address } = useAccount()
    const { setTitle } = useExecutionState()

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
  
        await fetch(process.env.REACT_APP_SERVER_URL + "orderFail", {
          method: 'POST', 
          body: formData
        });
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
        <Divv>
          <Div1>
            <Btwal>배송실패</Btwal>
          </Div1>
        </Divv>
        <Div0>
          {/* 컴포넌트 수정 필요 */}
          
          <input ref={file} type="file" name="file" accept="image/*" capture="environment" onChange={onChange} style={{display : "none"}}/>
          {(fileImage === undefined || fileImage === null) ? 
          <div>
            <span onClick={clickPlusIcon}>플러스 아이콘 추가</span>
          </div> :
            <div>
              <img onClick={clickPlusIcon} src={URL.createObjectURL(fileImage)} alt="uploaded photo" />
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
              await postImage();
              // await failedRogic();
            }}
          />
        </>
    )
}