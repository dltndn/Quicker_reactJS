import styled from "styled-components";



function Main_notice() {
    return (
        <>
        <Sc0>
            <Notice_div>
                <Notice_divfont_1>공지</Notice_divfont_1>
                <Notice_divfont_2>가나다라마바사</Notice_divfont_2>
            </Notice_div>
        </Sc0>
        </>
    );
  }
  
  export default Main_notice;

const Divmain = styled.div`
`;

const Sc0 = styled.section`
    position: absolute;
    width: 95%;
    top: 80%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    margin: 10px;
    border-radius: 15px;
    border: solid;
    border-width: 1px;
    border-color: #f01a1a;
`;

const Notice_div = styled.div`
    padding: var(--padding);
    display: flex;
    align-items:center;
    font-size: var(--font-small);
`;
const Notice_divfont_1 = styled.div`
    font-weight: bold;
    margin-left: 1.25rem;
`;
const Notice_divfont_2 = styled.div`
    font-weight: lighter;
    margin-left: 0.625rem;
`;