import BottomConfirmBtn from "../bottomconfirmBtn"
import { useState, useEffect } from "react";
import { useExecutionState } from "../../pages/ExecutionPage";
import FaceToFaceDelivery from "./FaceToFaceDelivery";
import RemoteDelivery from "./RemoteDelivery";
import styled from "styled-components";
import { ExecutionComponentProps } from "../../pages/ExecutionPage";
import { WriteTransactionToBlockchain } from "../../utils/ExecuteOrderFromBlockchain";
import WaitClientConfirm from "./WaitClientConfirm";
import { SendDataToAndroid } from "../../utils/SendDataToAndroid";
import { useAccount } from "wagmi";
import { checkIsDelivering } from "../../utils/ExecuteOrderFromBlockchain";

const Div0 = styled.div`
    display: flex;
    height: 3.875rem;
`;

const Div1 = styled.div`
    flex: 1 1 50%;
`;

const Btwal = styled.button`
width: 100%;
height: 2.25rem;
font-size: var(--font-md1);
font-weight: bold;
border: 0rem;
outline: #efefef;
background-color: #ffffff;
padding-left: 0.625rem;
text-align: center;

&:focus {
    border-bottom: 0.125rem solid #0070f3;
  }

`;


export default function DeliveredItem({ orderNum }: ExecutionComponentProps) {
    const { setTitle, setShowComponent } = useExecutionState()
    const [isFace, setIsFace] = useState<boolean>(true)
    const [file, setFile] = useState<File | null | undefined>(undefined);
    const { address } = useAccount()

    const postImage = async () => {
        const formData = new FormData();

        if (file !== null && file !== undefined && orderNum !== undefined) {
            formData.append('uploadImage', file);
            formData.append('orderNum', orderNum);
            const response = await fetch(process.env.REACT_APP_SERVER_URL + "order-complete-image", {
                method: 'POST',
                body: formData,
            })
            const message = await response.json()
            if (message.msg === "done") {
                alert("전송완료")
            }
        } else {
            alert("사진이 없습니다.")
        }
    }  

    const deliveredRogic = async () => {
        if (orderNum !== undefined) {
            const wttb = new WriteTransactionToBlockchain(orderNum)
            const sdta = new SendDataToAndroid(address)
            try {
                const result = await wttb.deliveredOrder()
                console.log(result)
                // 배송원 수행 중인 오더 확인 후 false값 전송
                if (!(await checkIsDelivering(address))) {
                    sdta.sendIsDelivering(false)
                }
                // 배송원 사진 업로드 로직 작성
                if (isFace === false) {
                    await postImage()
                }
            } catch(e) {
                console.log(e)
            }
            setShowComponent(<WaitClientConfirm />)
        }
    }
    
    useEffect(() => {
        setTitle("물품전달")
    }, [])

    return(
        <>
        <Div0>
            <Div1>
            <Btwal onClick={() => setIsFace(true)} autoFocus>대면</Btwal> 
            </Div1>
            <Div1>
            <Btwal onClick={() => setIsFace(false)}>비대면</Btwal>
            </Div1>
        </Div0>
            {isFace ? (<FaceToFaceDelivery orderNum={orderNum} />):(<RemoteDelivery state={file} setState={setFile} orderNum={orderNum} />)}
            <BottomConfirmBtn
                content="확인"
                confirmLogic={ () => {
                    // postImage();
                    deliveredRogic();
                }} isDisabled={false}
            />
        </>
    )
}

