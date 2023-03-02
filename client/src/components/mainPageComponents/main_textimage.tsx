import styled from "styled-components";
const Sc0 = styled.section`
    display: flex;
    list-style: none;
    justify-content: center;
`;
const Div0 = styled.div`
    flex: 1 1 50%;
    padding: var(--padding);
`;
const Li0 = styled.li`
    font-size: var(--font-md);
`;
const Li1 = styled.li`
    padding-top: var(--padding);
`;
const Bt0 = styled.button`
    border: none;
    background-color: var(--white-color);
`;
const Divimg = styled.div`
    flex: 1 1 50%;
`;
const Img = styled.img`
    border-radius: 10%;
    width: 100%;
`;
const img1 = require('../../image/ex1.jpg')

function Main_textimage() {
    return (
        <>
        <Sc0>
            <Div0>
                <Li0>가나다라마바사</Li0>
                <Li1>가나다라마바사<br />가나다라마바사<br/>가나다라마바사</Li1>
            </Div0>
            <Div0>
                <Bt0>
                    <Divimg><Img src={img1} alt="" /></Divimg>
                </Bt0>
            </Div0>
        </Sc0>
        <Sc0>
            <Div0>
                <Bt0>
                    <Divimg><Img src={img1} alt="" /></Divimg>
                </Bt0>
            </Div0>
            <Div0>
                <Li0>가나다라마바사</Li0>
                <Li1>가나다라마바사<br />가나다라마바사<br/>가나다라마바사</Li1>
            </Div0>
        </Sc0>
        </>
    );
  }
  
  export default Main_textimage;