import Lottie from 'lottie-react';
import LotteData1 from '../Lottie/dQ47pAFMck.json';
import LotteData2 from '../Lottie/28181-falling-parcel.json';
import styled from 'styled-components';


export function LoadingExecution() {
    return(<>
        <Con>
            <Lottie animationData={LotteData1}/>
        </Con>
    </>)
}

export function LoadingDeliveryProgress() {
    return(<>
        <Con>
            <Lottie animationData={LotteData2}/>
        </Con>
    </>)
}

const Con = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70vh;
    
`;