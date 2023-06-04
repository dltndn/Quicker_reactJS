
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from 'styled-components';
import Profilesetting from "../components/Profilesetting";
import TopBarThin from "../components/topBarthin";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #efefef !important;
    height: 100%;
  }
`;

function Profile_settingPage() {
    const navigate = useNavigate()
    return (
      <>
        <GlobalStyle />
        <TopBarThin title=" 내정보" title2="수정" redirectLogic={function (){navigate("/profile")} }/>
        <Profilesetting/>

      </>
    );
  }
  
  export default Profile_settingPage;