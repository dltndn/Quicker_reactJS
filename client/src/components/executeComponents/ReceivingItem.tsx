import BottomConfirmBtn from "../bottomconfirmBtn"
import styled from "styled-components";
import ready from "../animation/ready.gif"
import { useExecutionState } from "../../pages/ExecutionPage";
import DeliveredItem from "./DeliveredItem";
import { ExecutionComponentProps } from "../../pages/ExecutionPage";
import { useEffect } from "react";
import Lottie from 'lottie-react';
import LotteData1 from '../../Lottie/8G0Py794pT.json';

const Div0 = styled.div`
    display: flex;
    height: 3.875rem;
`;

const Div1 = styled.div`
    flex: 1 1 100%;
`;

const Div3 = styled.div`
    display: flex;
    justify-content: center;
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
    color: #000000;
`;

const Ready = styled.img`
    width: 40%;
`;

const Con = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40vh;
    
`;
const Ft1 = styled.div`
  display:flex;
  justify-content: center;
  flex-direction:column;
  text-align:center;
  font-size: var(--font-md1);
  color: #000000;
`;

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
