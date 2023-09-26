import styled from "styled-components";
import { Main_noticeStyle } from "../../StyleCollection";

const {Sc0, Notice_div, Notice_divfont_1, Notice_divfont_2} = new Main_noticeStyle()


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

