import styled from "styled-components";
const Sc0 = styled.section`
    position: fixed;
    bottom: 3.875rem;
    width: 100%;
`;
const Div0 = styled.div`
    padding: var(--padding);
    display: flex;
    align-items:center;
    font-size: var(--font-small);
    background-color: #e6e6e6;
    height: 5rem;
`;
const Sp0 = styled.div`
    font-weight: bold;
    margin-left: 1.25rem;
`;
const Sp1 = styled.div`
    font-weight: lighter;
    margin-left: 0.625rem;
`;
function Main_notice() {
    return (
        <Sc0>
            <Div0>
                <Sp0>공지</Sp0>
                <Sp1>가나다라마바사</Sp1>
            </Div0>
        </Sc0>
    );
  }
  
  export default Main_notice;