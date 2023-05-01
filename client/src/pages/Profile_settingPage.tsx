import TopBarOthers from "../components/topBarOthers"
import BottomBar from "../components/BottomBar";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from 'styled-components';
import Profilesetting from "../components/Profilesetting";
import TopBarThin from "../components/topBarthin";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #e6e6e6 !important;
    height: 100%;
  }
`;

function Profile_settingPage() {
    const navigate = useNavigate()
    return (
      <>
        <GlobalStyle />
        <TopBarThin title="내 정보" title2="수정" redirectLogic={function (){navigate("/profile")} }/>
        <Profilesetting/>

      </>
    );
  }
  
  export default Profile_settingPage;