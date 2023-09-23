import ConfirmBtn from "./confirmBtn";
import styled from "styled-components";
import Profile_settingPage from "../pages/Profile_settingPage";
import { useEffect, useRef, useState } from "react";
import { PostcodeinputStyle } from "../StyleCollection";

const {Div0, DivName, Divcall, Divcall1, Divfont, Divfont1, Divfont2, Ip, ReqFont, Container, Box} = new PostcodeinputStyle()


interface controls {
    onFocus: React.FocusEventHandler<HTMLInputElement>
    pageNext: ()=> void
}

interface refs {
    inputDiv: React.MutableRefObject<HTMLDivElement | null>
    inputBox: React.MutableRefObject<HTMLInputElement | null>
}

interface setStates {
    setAddress : (value: string) => void;
    setTarget : (value: string) => void;
    setPhoneNumber : (value: string) => void;  
}

interface PostcodeInputsType {
    refs: refs
    controls: controls
    setStates : setStates
    title: String
}

const PostcodeInputs = ({ refs, controls, setStates, title }: PostcodeInputsType) => {

    const addressDetailRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const prePhoneNumberRef = useRef<HTMLInputElement>(null);
    const middlePhoneNumberRef = useRef<HTMLInputElement>(null);
    const lastPhoneNumberRef = useRef<HTMLInputElement>(null);

    const [prePhoneNumber, setPrePhoneNumber] = useState("");
    const [middlePhoneNumber, setMiddlePhoneNumber] = useState("");
    const [lastPhoneNumber, setLastPhoneNumber] = useState("");

    useEffect(()=>{
        setStates.setPhoneNumber(prePhoneNumber + middlePhoneNumber + lastPhoneNumber)
    }, [prePhoneNumber, middlePhoneNumber, lastPhoneNumber])
    return (
        <>
        <Container>
        <Box ref={refs.inputDiv}>
            <div>
                <ReqFont>
                    {title}
                </ReqFont>
            </div>
            <Divfont>
                주소
            </Divfont>
            <div>
            <Ip type="text" onFocus={controls.onFocus} ref={refs.inputBox} placeholder="주소" />
            <Ip type="text" ref={addressDetailRef} onChange={() => setStates.setAddress(addressDetailRef.current!.value)} placeholder="세부주소" />
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
                    <Ip type="text" ref={nameRef} onChange={() => setStates.setTarget(nameRef.current!.value)} placeholder="이름" />
                </DivName>
                <Divcall>
                    <Ip type="text" inputMode="numeric" ref={prePhoneNumberRef} onChange={() => setPrePhoneNumber(prePhoneNumberRef.current!.value)} placeholder="010" maxLength={3}/>
                </Divcall>
                <Divcall>
                    <Ip type="text" inputMode="numeric" ref={middlePhoneNumberRef} onChange={() => setMiddlePhoneNumber(middlePhoneNumberRef.current!.value)} placeholder="0000" maxLength={4}/>
                </Divcall>
                <Divcall1>
                    <Ip type="text" inputMode="numeric" ref={lastPhoneNumberRef} onChange={() => setLastPhoneNumber(lastPhoneNumberRef.current!.value)} placeholder="0000" maxLength={4}/>
                </Divcall1>
            </Div0>
        </Box>
        </Container>
            <ConfirmBtn isDisabled={false} content={"다음단계"} confirmLogic={controls.pageNext} />
        </>
    )
}

export default PostcodeInputs