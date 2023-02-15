
import TopBarOthers from "../components/topBarOthers"
import BottomBar from "../components/BottomBar";

function ChattingPage() {
    return (
      <div className="App">
        <TopBarOthers title="채팅" redirect="/"></TopBarOthers>
        <div>채팅페이지</div>
        <BottomBar></BottomBar>
      </div>
    );
  }
  
  export default ChattingPage;