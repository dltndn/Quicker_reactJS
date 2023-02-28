
import Req from "./orderComponents/req";
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
        <Req></Req>
        <ConfirmBtn content={btnContent} confirmLogic={()=> console.log('결제로직')}/>
      </div>
    );
  }
  
  export default RequestPage;