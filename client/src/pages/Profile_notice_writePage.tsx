import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from 'styled-components';
import Notice_write from "../components/Notice_write";
import TopBarThin from "../components/topBarthin";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #efefef !important;
    height: 100%;
  }
`;

function Profile_notice_writePage() {
    const navigate = useNavigate()
    return (
      <>
        <GlobalStyle />
        <TopBarThin title="공지사항 작성" title2="" redirectLogic={function (){navigate("/profile")} }/>
        <Notice_write/>

      </>
    );
  }
  
  export default Profile_notice_writePage;