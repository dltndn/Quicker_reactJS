import Jointopbar from "../components/join_topbar";
import Main_Bottombar from "../components/main_bottombar";
import Join_ani from "../components/join_ani";
import Join_input from "../components/join_input";
import Check from "../components/check";

function SignUpPage() {
    return (
      <div className="App">
        <Jointopbar></Jointopbar>
        <Join_ani></Join_ani>
        <Join_input></Join_input>
        <Check></Check>
        <Main_Bottombar></Main_Bottombar>
      </div>
    );
  }
  
  export default SignUpPage;