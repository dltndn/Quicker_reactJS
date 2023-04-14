import ConfirmBtn from "../confirmBtn"
import React, { useState, useEffect } from "react";
import { useExecutionState } from "../../pages/ExecutionPage";
import Dropzone from "react-dropzone";
import { isMobileOnly } from "react-device-detect";
import styled, { createGlobalStyle } from "styled-components";
import money1 from "../../image/money1.gif"

const Div0 = styled.div`
    display: flex;
    height: 3.875rem;
`;

const Div1 = styled.div`
    flex: 1 1 100%;
`;

const Divback = styled(Div0)`
    height: auto;
    justify-content: center;
`;

const Div3 = styled.div`
    display: flex;
    justify-content: center;
`;

const Div2 = styled.div`
    display: flex;
    height: 400px;
    width: 95%;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    border-radius: 10px 10px 0 0;
`

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
    color: #28A745;
`;

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #e6e6e6 !important;
    height: 100%;
  }
`;

const MoneyGifImg = styled.img`
    width: 55%;
`;


const Div5_1 = styled.div`
    font-size: 12px;
    color: #929292;
    font-weight: bold;
    padding-top: 10px;
`;

const Divpo = styled.div`
    position: relative;
`;

const Div4 = styled.div`
    color: #000000;
`

const Div5 = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    color: #0D6EFD;
    font-weight: bold;
    text-align: center;
    background-color: #ffffff;
    width: 95%;
    padding: 10px 20px 20px 20px;
    border-radius: 0 0 10px 10px;
`;

export default function CompletedDelivery() {

    const { setTitle } = useExecutionState()
    const deliveredRogic = () => {

    }

    useEffect(() => {
        setTitle("배송결과")
    }, [])


    return(
        <>
        <GlobalStyle/>
        <Div0>
            <Div1>
            <Btwal>배송완료</Btwal> 
            </Div1>
        </Div0>
        <Divback>
            <Div2>
                <MoneyGifImg src={money1} />
            </Div2>
        </Divback>
        <Div3>
        <Div5>
            <div>수익<br/><Div5_1>보증금</Div5_1><br/><Div4>총액</Div4></div>
            <Divpo>20,000원<br/><Div5_1>5,000원</Div5_1><br/><Div4>25,000원</Div4></Divpo>
        </Div5>
        </Div3>
            <ConfirmBtn
            content="확인"
            confirmLogic={() => {
                deliveredRogic();
            }}
          />
        </>
    )
}