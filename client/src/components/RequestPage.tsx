
import Req_transport from "./orderComponents/req_transport";
import Req_volume from "./orderComponents/req_volume";
import Req_weight from "./orderComponents/req_weight";
import Req_deadline from "./orderComponents/req_deadline";
import Req_detail from "./orderComponents/req_detail";
import Req_cost from "./orderComponents/req_cost";
import ConfirmBtn from "./confirmBtn";
// import BottomBar from "./BottomBar";
// import TopBarOthers from "./topBarOthers"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RequestPage() {
  const [cost, setCost] = useState<Number>(0)
  const navigate = useNavigate();
  let btnContent = cost.toString() + "원 결제하기"
    return (
      <div style={{backgroundColor: '#efefef'}}>
        <Req_transport></Req_transport>
        <Req_volume></Req_volume>
        <Req_weight></Req_weight>
        <Req_deadline></Req_deadline>
        <Req_detail></Req_detail>
        <Req_cost></Req_cost>
        <ConfirmBtn content={btnContent} />
      </div>
    );
  }
  
  export default RequestPage;