import BottomConfirmBtn from "../bottomconfirmBtn"
import styled from "styled-components";
import ready from "../animation/ready.gif"
import { useExecutionState } from "../../pages/ExecutionPage";
import DeliveredItem from "./DeliveredItem";
import { ExecutionComponentProps } from "../../pages/ExecutionPage";
import { useEffect } from "react";
import Lottie from 'lottie-react';
import LotteData1 from '../../Lottie/8G0Py794pT.json';
import { ReceivingitemStyle } from "../../StyleCollection";

const {Div0, Div1, Btwal, Ft1, Con} = new ReceivingitemStyle()



export default function ReceivingItem({ orderNum }: ExecutionComponentProps) {
    const { setTitle, setShowComponent } = useExecutionState()
    const receivedRogic = async () => {
        try {
            // 물품인계 완료 로직 작성
            setShowComponent(<DeliveredItem orderNum={orderNum}/>)
        } catch(e) {
            console.log(e)
        }
    }

    useEffect(() => {
        setTitle("물품인계")
    }, [])
    return(
        <>
        <Div0>
            <Div1>
            <Btwal>물품 인계</Btwal> 
            </Div1>
        </Div0>
        <Con>
            <Lottie animationData={LotteData1}/>
        </Con>
        <Ft1>
            물품을 인계받으면 확인 버튼을 눌러주세요.
        </Ft1>
            <BottomConfirmBtn
            isDisabled={false}
            content="확인"
            confirmLogic={async() => {
              await receivedRogic();
            }}
          />
        </>
    )
}
