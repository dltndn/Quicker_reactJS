import { BsHouseDoor, BsBell,BsChevronLeft, BsTrash  } from "react-icons/bs";
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
    font-weight: thin;
`;

const Tbhome = styled(Tbt)`
    margin-left: auto;
    margin-right: 0.625rem;
    font-size: var(--font-md1);
`;

const Tbsp = styled.div`
    font-size: 14px;
    font-weight: thin;
    margin-top: 2.5px;
    margin-left: 0.313rem;
`;

interface Props {
    title: string;
    title2: string;
    redirectLogic: ()=> void
  };

function TopBarThin({ title, title2, redirectLogic }: Props) {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1); 
      };

    return (
        <section>
            <Divhid/>
            <Tdiv>
                <Tbtleft onClick={goBack}><BsChevronLeft></BsChevronLeft></Tbtleft>
                <Tbsp>{title}</Tbsp>
                <Tbhome>{title2}</Tbhome>
            </Tdiv>
        </section>
    );
  }
  
  export default TopBarThin;