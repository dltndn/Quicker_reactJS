import { useState, useEffect } from "react";
import { useExecutionState } from "../../pages/ExecutionPage";
import FaceToFaceDelivery from "./FaceToFaceDelivery";
import RemoteDelivery from "./RemoteDelivery";
import styled from "styled-components";
import { ExecutionComponentProps } from "../../pages/ExecutionPage";
import { create } from "zustand";
import { DelivereditemStyle } from "../../StyleCollection";

const {Div0, Div1, Btwal} = new DelivereditemStyle()



interface DeliveredComponent {
    isFace: boolean;
    setIsFace: (newData: boolean) => void;
    hasScanResult: boolean;
    setHasScanResult: (newData: boolean) => void;
}

export const useDeliveredComponent = create<DeliveredComponent>((set) => ({
    isFace: false,
    setIsFace: (isFace: boolean) => set({ isFace }),
    hasScanResult: false,
    setHasScanResult: (hasScanResult: boolean) => set({ hasScanResult })
}))


export default function DeliveredItem({ orderNum }: ExecutionComponentProps) {
    const { setTitle } = useExecutionState()
    const { isFace, setIsFace } = useDeliveredComponent()
    
    useEffect(() => {
        setTitle("물품전달")
    }, [])

    return(
        <>
        <Div0>
            <Div1>
            <Btwal onClick={() => setIsFace(true)}>대면</Btwal> 
            </Div1>
            <Div1>
            <Btwal onClick={() => setIsFace(false)} autoFocus>비대면</Btwal>
            </Div1>
        </Div0>
            {isFace ? (<FaceToFaceDelivery orderNum={orderNum} />):(<RemoteDelivery orderNum={orderNum} />)}
        </>
    )
}

