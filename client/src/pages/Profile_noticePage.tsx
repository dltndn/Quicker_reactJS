import TopBarOthers from "../components/topBarOthers"
import BottomBar from "../components/BottomBar";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from 'styled-components';
import Notice from "../components/Notice";
import TopBarThin from "../components/topBarthin";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #efefef !important;
    height: 100%;
  }
`;

function Profile_noticePage() {
    const navigate = useNavigate()
    return (
      <>
        <GlobalStyle />
        <TopBarThin title="공지사항" title2="" redirectLogic={function (){navigate("/profile")} }/>
        <Notice/>

      </>
    );
  }
  
  export default Profile_noticePage;