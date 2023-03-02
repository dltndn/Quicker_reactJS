import TopBarOthers from "../components/topBarOthers";
import BottomBar from "../components/BottomBar";
import Fulfillmentlist from "../components/orderComponents/fulfillmentlist";
import { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #e6e6e6 !important;
    height: 100%;
  }
`;


function FulfillmentlistPage() {
  const navigate = useNavigate()
    return (
      <>
      <GlobalStyle/>
      <TopBarOthers title="수행 내역" redirectLogic={function (){navigate("/")} }></TopBarOthers>
      <Fulfillmentlist></Fulfillmentlist>
      <BottomBar></BottomBar>
      </>
    );
  }
  
  export default FulfillmentlistPage;