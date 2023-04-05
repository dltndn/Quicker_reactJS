import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import React from "react";

const Div0 = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    
`;

function Profilesetting(){
    const navigate = useNavigate();

    return(
        <>
        <Div0>
        사진
        </Div0>
        <div>
            <div>
            이름
            </div>
            <div>
            배영준
            </div>
        </div>
        <div>
            <div>
            생년월일
            </div>
            <div>
            2001.02.13
            </div>
        </div>
        <div>
            <div>
            이메일
            </div>
            <div>
            dudwns0213@naver.com
            </div>
        </div>
        <div>
            <div>
            연락처
            </div>
            <div>
            010-9086-9502
            </div>
        </div>
        </>
    );
}


export default Profilesetting;