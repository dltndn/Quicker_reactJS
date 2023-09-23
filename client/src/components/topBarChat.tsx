import { BsHouseDoor, BsBell,BsChevronLeft, BsExclamationTriangle  } from "react-icons/bs";
import { redirect, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { TopBarChatStyle } from "../StyleCollection";

const {Tbhome, Tbsp, Tbt, Tbtleft, Tdiv, StateDiv} = new TopBarChatStyle()


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