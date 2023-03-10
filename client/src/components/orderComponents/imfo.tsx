import { BsPencilSquare, BsEyeSlash, BsFileText, BsCheck2Circle, BsClipboardCheck, BsUiChecksGrid, BsExclamationCircle, BsGear } from "react-icons/bs";
import { AiOutlineLogout, AiOutlineCloseSquare } from "react-icons/ai";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAccount, useDisconnect } from "wagmi";
import GetQkrwBalance from "../getQkrwBalance";

const money = require('../../image/money.png')

const img1 = require('../../image/ex1.jpg')

const Topdiv = styled.div`
    display: flex;
    padding: var(--padding);
    color: var(--black-color);
    height: 9.688rem;
    align-items: center;
`;

const Topbt = styled.button`
    border: none;
    box-shadow: none;
    outline: none;
    font-size: var(--font-md);
    background-color: #e6e6e6;
    margin-left: auto;
    padding-right: 0.25rem;
    padding-top: 0.438rem;
`;

const Topimg = styled.img`
    width: 5rem;
    height: 5rem;
    margin-left: 0.5rem;
    border-radius: 100%;
`;

const Toptx = styled.span`
    font-size: var(--font-md);
    font-weight: bold;
    padding-left: 1.125rem;
`;

const Scwal = styled.section`
    display: flex;
    height: 3rem;
    border: 0rem;
    margin: 0.175rem 0.563rem;
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
    margin-right: 0.625rem;
`;

const Sp1 = styled(Sp0)`
    font-size: var(--font-md);
`;

const Sp2 = styled.div`
    margin-left: 10px;
`;



const Bteye = styled.button`
    border: none;
    box-shadow: none;
    outline: none;
    background-color: var(--white-color);
    font-size: 0.875rem;
    margin-right: 0.75rem;
`;

const Hr = styled.hr`
    margin-left: auto;
    margin-right: auto;
    width: 95%;
    height: 0.063rem;
    border: 0;
    background: #e6e6e6;
`;

const Bticon = styled.button`
    border: none;
    background-color: var(--white-color);
    margin-right: 0.625rem;
`;

const Bticonimg = styled.img`
    width: 1.875rem;
    height: 1.875rem;
`;

function Imfo(){
    const navigate = useNavigate();
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect()

    const ClickOrderlist = () => {
        navigate("/orderlist")
    }
    const ClickFulfillmentlist = () => {
        navigate("/fulfillmentlist")
    }
    return(
        <>
        <section>
            <Topdiv>
                <Topimg src={img1} />
                <Toptx>배영준</Toptx>
                <Topbt>
                    <BsPencilSquare></BsPencilSquare>
                </Topbt>
            </Topdiv>
        </section>
        <Scwal>
            <Web3Button icon="hide" label="지갑연결" balance="hide" />
        </Scwal>
        <Hr></Hr>
        <Sc3>
            <Div0>
                <span>지갑 잔액</span>
                <Sp1>{isConnected && address && <GetQkrwBalance address={address}/>}</Sp1>
                <Bticon>
                    <Bticonimg src={money} alt="" />
                </Bticon>
            </Div0>
        </Sc3>
        <Sc0>
            <Div0 onClick={ClickOrderlist}>
                <BsFileText></BsFileText>
                <Sp2>오더 내역</Sp2>
            </Div0>
        </Sc0>
        <Hr></Hr>
        <Sc1>
            <Div0 onClick={ClickFulfillmentlist}>
                <BsCheck2Circle></BsCheck2Circle>
                <Sp2>수행 내역</Sp2>
            </Div0>
        </Sc1>
        <Sc0>
            <Div0>
                <BsClipboardCheck></BsClipboardCheck>
                <Sp2>공지사항</Sp2>
            </Div0>
        </Sc0>
        <Hr></Hr>
        <Sc2>
            <Div0>
                <BsExclamationCircle></BsExclamationCircle>
                <Sp2>자주 묻는 질문</Sp2>
            </Div0>
        </Sc2>
        <Hr></Hr>
        <Sc2>
            <Div0>
                <BsUiChecksGrid></BsUiChecksGrid>
                <Sp2>이용약관</Sp2>
            </Div0>
        </Sc2>
        <Hr></Hr>
        <Sc1>
            <Div0>
                <BsGear></BsGear>
                <Sp2>설정</Sp2>
            </Div0>
        </Sc1>
        <Sc3>
            <Div0 onClick={() => {disconnect(); navigate('/')}}>
                <AiOutlineLogout></AiOutlineLogout>
                <Sp2>로그아웃</Sp2>
            </Div0>
        </Sc3>
        <Sc3>
            <Div0>
                <AiOutlineCloseSquare></AiOutlineCloseSquare>
                <Sp2>탈퇴하기</Sp2>
            </Div0>
        </Sc3>
        </>
    );
}


export default Imfo;