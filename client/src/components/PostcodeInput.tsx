import ConfirmBtn from "./confirmBtn"

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

const PostcodeInputs = ({ refs, controls }: PostcodeInputsType) => {

    return (
        <div ref={refs.inputDiv}>
            <input type="text" onFocus={controls.onFocus} ref={refs.inputBox} placeholder="주소" /><br />
            <input type="text" placeholder="세부주소" /><br />
            <input type="text" placeholder="이름" /><br />
            <input type="text" placeholder="010" /><br />
            <input type="text" placeholder="1234" /><br />
            <input type="text" placeholder="5678" /><br />
            <button onClick={controls.pageNext}>다음단계</button><br />
            <ConfirmBtn content={"다음단계"} confirmLogic={controls.pageNext} />
        </div>
    )
}

export default PostcodeInputs