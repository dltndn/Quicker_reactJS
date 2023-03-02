import TopBarOthers from "../components/topBarOthers";
import BottomBar from "../components/BottomBar";
import Orderlist from "../components/orderComponents/orderlist";
import { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #e6e6e6 !important;
    height: 100%;
  }
`;


function OrderlistPage() {
  const navigate = useNavigate()
    return (
      <>
      <GlobalStyle/>
      <TopBarOthers title="주문 내역" redirectLogic={function (){navigate("/profile")} }></TopBarOthers>
      <Orderlist></Orderlist>
      <BottomBar></BottomBar>
      </>
    );
  }
  
  export default OrderlistPage;