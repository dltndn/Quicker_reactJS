import {BsBell} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Main_topbarStyle } from "../../StyleCollection";

const {MainSp, Mainbt, Maindiv} = new Main_topbarStyle()
function Main_topbar() {
    const navigate = useNavigate();
    return (
        <section>
            <Maindiv>
                <MainSp>Quicker 2.0</MainSp>
                <Mainbt><BsBell onClick={() => navigate('/notification')}></BsBell></Mainbt>
            </Maindiv>
        </section>
    );
  }
  
  export default Main_topbar;
