import { BsHouseDoor, BsBell,BsChevronLeft, BsTrash  } from "react-icons/bs";
import { redirect, useNavigate } from "react-router-dom";
import { TopBarthinStyle } from "../StyleCollection";

const {Tbhome, Tbsp, Tbtleft, Tdiv, Divhid} = new TopBarthinStyle()

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