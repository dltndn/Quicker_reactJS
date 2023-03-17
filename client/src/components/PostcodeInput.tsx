import ConfirmBtn from "./confirmBtn";
import styled from "styled-components";
import Profile_settingPage from "../pages/Profile_settingPage";

interface controls {
    onFocus: React.FocusEventHandler<HTMLInputElement>
    pageNext: ()=> void
}

interface refs {
    inputDiv: React.RefObject<HTMLDivElement>
    inputBox: React.RefObject<HTMLInputElement>
}

interface PostcodeInputsType {
    refs: refs
    controls: controls
}

const Box = styled.div`
  border-radius: 0.313rem;
  margin-top: 0.5rem;
  width: 97%;
  background-color: #ffffff;
  padding: 1.125rem;
  margin: 0.313rem;
`;

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 7.5rem;
`;

const ReqFont = styled.span`
  font-size: var(--font-md);
  font-weight: bold;
`;

const Divfont = styled.div`
  font-size: var(--font-small);
  margin-bottom: 10px;
`;

const Divfont1 = styled(Divfont)`
    flex : 1 1 30%;
      margin-top: 10px;
`;

const Divfont2 = styled(Divfont)`
    flex : 1 1 70%;
      margin-top: 10px;
`;

const Div0 = styled.div`
    display:flex;
`;

const DivName = styled.div`
    flex: 1 1 30%;
    padding-right: 10px;
`;

const Divcall = styled.div`
    flex: 1 1 25%;
    padding-right: 10px;
    justify-content: space-between;
`;

const Divcall1 = styled.div`
    flex: 1 1 22%;
`;

const Ip = styled.input`
    width: 100%;
    height: 2.25rem;
    font-size: var(--font-small);
    border-radius: 0.313rem;
    border: 1px solid #efefef; /* 테두리 */
    outline: none; /* 포커스 시 발생하는 외곽선 제거 */
    background-color: #efefef;
    padding-left: 0.625rem;
    padding-right: 0.625rem;
    margin: 0.313rem 0 0.313rem 0;
    text-align: left;
    color: #a6a6a6;
    
    &:focus {
        border-color: #efefef; /* 포커스 시 테두리 색상 변경 */
        background-color: #ffffff;
    }
`;


const PostcodeInputs = ({ refs, controls }: PostcodeInputsType) => {

    return (
        <>
        <Container>
        <Box ref={refs.inputDiv}>
            <Divfont>
                주소
            </Divfont>
            <div>
            <Ip type="text" onFocus={controls.onFocus} ref={refs.inputBox} placeholder="주소" />
            <Ip type="text" placeholder="세부주소" />
            </div>
            <Div0>
                <Divfont1>
                    이름
                </Divfont1>
                <Divfont2>
                    연락처
                </Divfont2>
            </Div0>
            <Div0>
                <DivName>
                    <Ip type="text" placeholder="이름" />
                </DivName>
                <Divcall>
                    <Ip type="number" placeholder="010" />
                </Divcall>
                <Divcall>
                    <Ip type="number" placeholder="0000" />
                </Divcall>
                <Divcall1>
                    <Ip type="number" placeholder="0000" />
                </Divcall1>
            </Div0>
        </Box>
        </Container>
            <ConfirmBtn content={"다음단계"} confirmLogic={controls.pageNext} />
        </>
    )
}

export default PostcodeInputs