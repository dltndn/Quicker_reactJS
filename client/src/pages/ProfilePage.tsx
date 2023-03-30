import TopBarOthers from "../components/topBarOthers"
import BottomBar from "../components/BottomBar";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from 'styled-components';
import Imfo from "../components/orderComponents/imfo";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #efefef !important;
    height: 100%;
  }
`;

function ProfilePage() {
  const navigate = useNavigate()
    return (
      <>
        <GlobalStyle />
        <TopBarOthers title="프로필" redirectLogic={function (){navigate("/")} }></TopBarOthers>
        <Imfo/>
        <BottomBar/>
      </>
    );
  }
  
  export default ProfilePage;