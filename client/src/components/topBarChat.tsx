import { BsHouseDoor, BsBell,BsChevronLeft, BsExclamationTriangle  } from "react-icons/bs";
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
const Div0_1 = styled.div`
  padding: 1rem 0.75rem 1rem 1rem;
`;

const StateDiv = styled(Div0_1)`
  display: flex;
  border-radius: 1.25rem;
  border-color: #5843f5;
  width: 3.75rem;
  height: 1.438rem;
  justify-content: center;
  padding: 0;
  color: #5843f5;
  font-weight: bold;
`;

interface Props {
    title: string
    role: string
    redirectLogic: ()=> void
  }

function TopBarChat({ title, role, redirectLogic }: Props) {
    const navigate = useNavigate();

    return (
        <section>
            <Tdiv>
                <Tbtleft onClick={() => redirectLogic()}><BsChevronLeft></BsChevronLeft></Tbtleft>
                <Tbsp>{title}</Tbsp>
                <StateDiv>{role}</StateDiv>
                <Tbhome onClick={() => navigate('/')}><BsHouseDoor></BsHouseDoor></Tbhome>
                <Tbt>
                <BsExclamationTriangle/>
                </Tbt>
            </Tdiv>
        </section>
    );
  }
  
  export default TopBarChat;