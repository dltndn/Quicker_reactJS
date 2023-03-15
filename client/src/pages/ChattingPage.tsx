
import TopBarOthers from "../components/topBarOthers"
import BottomBar from "../components/BottomBar";
import { useNavigate } from "react-router-dom";
import ChatArea from "../components/chat"

function ChattingPage() {
  const navigate = useNavigate()
    return (
      <div className="App">
        <TopBarOthers title="채팅" redirectLogic={() => {
          navigate("/")
        } }></TopBarOthers>
        <ChatArea></ChatArea>
        <BottomBar></BottomBar>
      </div>
    );
  }
  
  export default ChattingPage;