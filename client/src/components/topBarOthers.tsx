import { BsHouseDoor, BsBell,BsChevronLeft  } from "react-icons/bs";
import { redirect, useNavigate } from "react-router-dom";
import { TopBarOthersStyle } from "../StyleCollection";

const {Tbhome, Tbsp, Tbt, Tbtleft, Tdiv, Divhid} = new TopBarOthersStyle()


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
                <Tbt onClick={() => navigate('/notification')}>
                <BsBell/>
                </Tbt>
            </Tdiv>
        </section>
    );
  }
  
  export default TopBarOthers;