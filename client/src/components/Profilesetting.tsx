import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import React from "react";

const Topdiv = styled.div`
    display: flex;
    padding: var(--padding);
    color: var(--black-color);
    justify-content: center;
`;

const Topimg = styled.div`
    margin: 10px;
    width: 8rem;
    height: 8rem;
    border-radius: 100%;
    background-color: #ffffff;
`;


const Sc0 = styled.section`
    display: flex;
    margin: 0 0.563rem;
    flex-direction: column;
    justify-content: center;
    height: 3rem;
    border-radius: 0.313rem 0.313rem 0 0;
    border: 0rem;
    background-color: var(--white-color);
`;

const Sc1 = styled(Sc0)`
    border-radius: 0px 0px 0.313rem 0.313rem;
    margin-bottom: 0.375rem;
`;

const Sc2 = styled.section`
    display: flex;
    margin: 0 0.563rem;
    flex-direction: column;
    justify-content: center;
    height: 3rem;
    border: 0;
    background-color: var(--white-color);
`;

const Sc3 = styled.section`
    display: flex;
    margin: 0 0.563rem;
    flex-direction: column;
    justify-content: center;
    height: 3rem;
    border-radius: 0.313rem;
    border: 0;
    background-color: var(--white-color);
    margin-bottom: 0.375rem;
`;

const Div0 = styled.div`
    display: flex;
    align-items: center;
    font-size: var(--font-md1);
    font-weight: bold;
    margin-left: 0.75rem;
`;

const Sp0 = styled.div`
    margin-left: auto;
    margin-right: 0.75rem;
`;

const Sp2 = styled.div`
    margin-left: 10px;
`;

const Hr = styled.hr`
    margin-left: auto;
    margin-right: auto;
    width: 95%;
    height: 0.063rem;
    border: 0;
    background: #e6e6e6;
`;


function Profilesetting(){
    const navigate = useNavigate();

    return(
        <>
        <Topdiv>
            <Topimg></Topimg>
        </Topdiv>

        <Sc0>
            <Div0>
                <Sp2>이름</Sp2>
                <Sp0>000</Sp0>
            </Div0>
        </Sc0>
        <Hr></Hr>
        <Sc2>
            <Div0>
                <Sp2>생년월일</Sp2>
                <Sp0>000</Sp0>
            </Div0>
        </Sc2>
        <Hr></Hr>
        <Sc2>
            <Div0>
                <Sp2>이메일</Sp2>
                <Sp0>000</Sp0>
            </Div0>
        </Sc2>
        <Hr></Hr>
        <Sc2>
            <Div0>
                <Sp2>연락처</Sp2>
                <Sp0>000</Sp0>
            </Div0>
        </Sc2>
        <Hr></Hr>
        <Sc1>
            <Div0>
                <Sp2>탈퇴하기</Sp2>
                <Sp0>000</Sp0>
            </Div0>
        </Sc1>
        <Sc3>
            <Div0>
                <Sp2>예시1</Sp2>
            </Div0>
            <Div0></Div0>
        </Sc3>
        </>
    );
}


export default Profilesetting;