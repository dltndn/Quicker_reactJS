import styled from "styled-components";
import { BsPencilSquare } from "react-icons/bs";

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


function Imfo_profile(){
    return(
        <section>
            <Topdiv>
                <Topimg src={img1} />
                <Toptx>배영준</Toptx>
                <Topbt><BsPencilSquare></BsPencilSquare></Topbt>
            </Topdiv>
        </section>
    );
}

export default Imfo_profile;