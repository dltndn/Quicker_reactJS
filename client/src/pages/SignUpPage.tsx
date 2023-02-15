
import Join_ani from "../components/join_ani";
import Join_input from "../components/join_input";
import ConfirmBtn from "../components/confirmBtn";
import TopBarOthers from "../components/topBarOthers";
import BottomBar from "../components/BottomBar";

function SignUpPage() {
    return (
      <div className="App">
        <TopBarOthers title="회원가입" redirect="/"/>
        <Join_ani></Join_ani>
        <Join_input></Join_input>
        <ConfirmBtn content="확인"/>
        <BottomBar></BottomBar>
      </div>
    );
  }
  
  export default SignUpPage;