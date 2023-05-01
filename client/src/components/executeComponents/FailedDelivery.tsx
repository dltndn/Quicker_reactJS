import ConfirmBtn from "../confirmBtn"
import { useEffect, useRef } from "react";
import { useExecutionState } from "../../pages/ExecutionPage";
import styled from "styled-components";
import { isMobile } from "react-device-detect";
import { ExecutionComponentProps } from "../../pages/ExecutionPage";

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

    const videoRef = useRef<HTMLVideoElement>(null);

    const { setTitle } = useExecutionState()
    const failedRogic = async () => {
      try {
        // 배송 실패 사진 업로드 로직 작성
      } catch(e) {
        console.log(e)
      }
      // 메인으로 리다이렉트
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
                <CameraContainer>
                    <video autoPlay ref={videoRef} />
                </CameraContainer>
            </Div0>
            <Container>
        <Box>
            <div>
                <ReqFont>배송 실패 사유</ReqFont>
            </div>
            <div>
                <Ipdet></Ipdet>
            </div>
        </Box>
    </Container>
            <ConfirmBtn
            isDisabled={false}
            content="확인"
            confirmLogic={async() => {
                await failedRogic();
            }}
          />
        </>
    )
}