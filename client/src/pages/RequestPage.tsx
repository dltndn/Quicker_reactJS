
import Req_transport from "../components/orderComponents/req_transport";
import Req_volume from "../components/orderComponents/req_volume";
import Req_weight from "../components/orderComponents/req_weight";
import Req_deadline from "../components/orderComponents/req_deadline";
import Req_detail from "../components/orderComponents/req_detail";
import Req_cost from "../components/orderComponents/req_cost";
import ConfirmBtn from "../components/confirmBtn";
import BottomBar from "../components/BottomBar";
import TopBarOthers from "../components/topBarOthers"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RequestPage() {
  const [cost, setCost] = useState<Number>(0)
  const navigate = useNavigate();
  let btnContent = cost.toString() + "원 결제하기"
    return (
      <div style={{backgroundColor: '#efefef'}}>
        <TopBarOthers title="배송의뢰" redirect="/"></TopBarOthers>
        <button onClick={()=> navigate(`/commission`) }>임시 지도 페이지 이동 버튼</button>
        <Req_transport></Req_transport>
        <Req_volume></Req_volume>
        <Req_weight></Req_weight>
        <Req_deadline></Req_deadline>
        <Req_detail></Req_detail>
        <Req_cost></Req_cost>
        <ConfirmBtn content={btnContent} />
        <BottomBar></BottomBar>
      </div>
    );
  }
  
  export default RequestPage;