import TopBarOthers from "../components/topBarOthers";
import BottomBar from "../components/BottomBar";
import { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";
import ShowOrders from "../components/ShowOrders";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #efefef !important;
    height: 100%;
  }
`;

interface OrderLogProps {
    isClient: boolean
}

function OrderLogPage( { isClient }: OrderLogProps ) {
  const navigate = useNavigate()
    return (
      <>
      <GlobalStyle/>
      <TopBarOthers title="주문 내역" redirectLogic={function (){navigate("/profile")} }></TopBarOthers>
      <ShowOrders isClient={isClient} />
      <BottomBar></BottomBar>
      </>
    );
  }
  
  export default OrderLogPage;