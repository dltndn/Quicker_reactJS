import Lottie from 'lottie-react';
import LotteData1 from '../Lottie/dQ47pAFMck.json';
import LotteData2 from '../Lottie/28181-falling-parcel.json';
import { LoadingAniStyle } from "../StyleCollection";

const {Con} = new LoadingAniStyle()


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

