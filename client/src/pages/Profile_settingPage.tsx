import TopBarOthers from "../components/topBarOthers"
import BottomBar from "../components/BottomBar";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from 'styled-components';
import Profilesetting from "../components/Profilesetting";

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
        <TopBarOthers title="내 정보" redirectLogic={function (){navigate("/profile")} }></TopBarOthers>
        <Profilesetting/>
        <BottomBar/>
      </>
    );
  }
  
  export default Profile_settingPage;