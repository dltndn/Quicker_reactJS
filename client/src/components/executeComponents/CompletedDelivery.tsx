import React, { useState, useEffect } from "react";
import { useExecutionState } from "../../pages/ExecutionPage";
import styled, { createGlobalStyle } from "styled-components";
import money1 from "../../image/money1.gif"
import { useNavigate } from "react-router-dom";
import { ExecutionComponentProps } from "../../pages/ExecutionPage";
import SendTxK from "../blockChainTx/SendTxK";
import GetContractParams from "../blockChainTx/GetContractParams";
import { CompletedDeliveryStyle } from "../../StyleCollection";

const {Div0, Div1, Div2, Div3, Div4, Div5, Div5_1, Divback, Divpo, Btwal, Margin_1, MoneyGifImg} = new CompletedDeliveryStyle()

interface CompletedDeliveryProps extends ExecutionComponentProps{
    income: number;
    securityDeposit: number;
    isReceived: boolean
}

export default function CompletedDelivery({ orderNum, income, securityDeposit, isReceived}: CompletedDeliveryProps) {
    const { setTitle } = useExecutionState()
    const [incomeString] = useState(income.toLocaleString())
    const [securityDpositString] = useState(securityDeposit.toLocaleString())
    const [total] = useState((income + securityDeposit).toLocaleString())
    const navigate = useNavigate()

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
            <Divpo>{incomeString}원<br/><Div5_1>{securityDpositString === "0" ? (" - "):(securityDpositString)}원</Div5_1><br/><Div4>{total}원</Div4></Divpo>
        </Div5>
        </Div3>
        {!isReceived && 
        // @ts-ignore
        <Margin_1><SendTxK param={GetContractParams.WithdrawFromOrder(orderNum)} successFunc={() => navigate("/")}/></Margin_1>}
        </>
    )
}

const GlobalStyle = createGlobalStyle`
body {
  background-color: #e6e6e6 !important;
  height: 100%;
}
`;