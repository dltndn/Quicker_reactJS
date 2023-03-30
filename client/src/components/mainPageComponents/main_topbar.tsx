import {BsBell} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const Maindiv = styled.div`
    display: flex;
    justify-content: space-between;
    padding: var(--padding);
    background-color: var(--white-color);
    color: var(--black-color);
    height: 3.875rem;
`;
const MainSp = styled.span`
    padding-top: 0.25rem;
    font-size: var(--font-Quicker);
    font-weight: bold;
`;
const Mainbt = styled.button`
    border: none;
    box-shadow: none;
    outline: none;
    background-color: var(--white-color);
    font-size: var(--font-large);
`;
function Main_topbar() {
    const navigate = useNavigate();
    return (
        <section>
            <Maindiv>
                <MainSp>Quicker</MainSp>
                <Mainbt><BsBell onClick={() => navigate('/notification')}></BsBell></Mainbt>
            </Maindiv>
        </section>
    );
  }
  
  export default Main_topbar;
