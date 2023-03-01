import { BsHouseDoor, BsBell,BsChevronLeft  } from "react-icons/bs";
import { redirect, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Tdiv = styled.div`
    position: fixed;
    top: 0;
    width: 100%;
    display: flex;
    padding: var(--padding);
    background-color: var(--white-color);
    color: var(--black-color);
    height: 3.875rem;
    z-index: 1;
`;

const Divhid = styled.div`
    display: flex;
    padding: 18px 12px 16px 30px;
    height: 3.875rem;
`;

const Tbt = styled.button`
    border: none;
    box-shadow: none;
    outline: none;
    background-color: var(--white-color);
    font-size: var(--font-large);
`;

const Tbtleft = styled(Tbt)`
    justify-content: left;
    width: 1.375rem;
    font-weight: bold;
`;

const Tbhome = styled(Tbt)`
    margin-left: auto;
    margin-right: 0.625rem;
`;

const Tbsp = styled.div`
    font-size: var(--font-md);
    font-weight: bold;
    margin-top: 0.125rem;
    margin-left: 0.313rem;
`;


interface Props {
    title: string
    redirectLogic: ()=> void
  }

function TopBarOthers({ title, redirectLogic }: Props) {
    const navigate = useNavigate();

    return (
        <section>
            <Divhid/>
            <Tdiv>
                <Tbtleft onClick={() => redirectLogic()}><BsChevronLeft></BsChevronLeft></Tbtleft>
                <Tbsp>{title}</Tbsp>
                <Tbhome onClick={() => navigate('/')}><BsHouseDoor></BsHouseDoor></Tbhome>
                <Tbt><BsBell></BsBell></Tbt>
            </Tdiv>
        </section>
    );
  }
  
  export default TopBarOthers;