
import Req_topbar from "../components/req_topbar";
import Req_transport from "../components/req_transport";
import Req_volume from "../components/req_volume";
import Req_weight from "../components/req_weight";
import Req_deadline from "../components/req_deadline";
import Req_detail from "../components/req_detail";
import Req_cost from "../components/req_cost";
import Req_check from "../components/req_check";

import Main_Bottombar from "../components/main_bottombar";


function RequestPage() {
    return (
      <div style={{backgroundColor: '#efefef'}}>
        <Req_topbar></Req_topbar>
        <Req_transport></Req_transport>
        <Req_volume></Req_volume>
        <Req_weight></Req_weight>
        <Req_deadline></Req_deadline>
        <Req_detail></Req_detail>
        <Req_cost></Req_cost>
        <Req_check></Req_check>
        <Main_Bottombar></Main_Bottombar>
      </div>
    );
  }
  
  export default RequestPage;