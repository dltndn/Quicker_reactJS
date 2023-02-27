
import TopBarOthers from "../components/topBarOthers"
import BottomBar from "../components/BottomBar";
import { useNavigate } from "react-router-dom";

function ChattingPage() {
  const navigate = useNavigate()
    return (
      <div className="App">
        <TopBarOthers title="채팅" redirectLogic={() => {
          navigate("/")
        } }></TopBarOthers>
        <div>채팅페이지</div>
        <BottomBar></BottomBar>
      </div>
    );
  }
  
  export default ChattingPage;