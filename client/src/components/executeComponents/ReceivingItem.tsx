import ConfirmBtn from "../confirmBtn"
import styled from "styled-components";
import ready from "../animation/ready.gif"

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
export default function ReceivingItem() {
    const receivedRogic = () => {

    }
    return(
        <>
        <Div0>
            <Div1>
            <Btwal>물품 인계</Btwal> 
            </Div1>
        </Div0>
        <Div3>
          <Ready src={ready}></Ready>
        </Div3>
            <ConfirmBtn
            content="확인"
            confirmLogic={() => {
              receivedRogic();
            }}
          />
        </>
    )
}