
import Join_ani from "../components/join_ani";
import Join_input from "../components/join_input";
import ConfirmBtn from "../components/confirmBtn";
import TopBarOthers from "../components/topBarOthers";
import BottomBar from "../components/BottomBar";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const navigate = useNavigate()
    return (
      <div className="App">
        <TopBarOthers title="회원가입" redirectLogic={function (){
          navigate("/")
        } }/>
        <Join_ani></Join_ani>
        <Join_input></Join_input>
        <ConfirmBtn content="확인"/>
        <BottomBar></BottomBar>
      </div>
    );
  }
  
  export default SignUpPage;