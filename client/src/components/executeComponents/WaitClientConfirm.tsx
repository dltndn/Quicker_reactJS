import { useExecutionState } from "../../pages/ExecutionPage"
import { useEffect } from "react"
import Lottie from 'lottie-react';
import LotteData1 from '../../Lottie/93061-check-list-manual.json';
import styled from "styled-components";

export default function WaitClientConfirm() {
    const { setTitle } = useExecutionState()

    useEffect(() => {
        setTitle("물품전달")
    }, [])
    return (<>
        <Con>
            <Lottie animationData={LotteData1}/>
        </Con>
    </>)
}

const Con = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70vh;
    
`;