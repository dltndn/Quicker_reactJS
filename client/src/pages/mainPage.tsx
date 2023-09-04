import Main_topbar from "../components/mainPageComponents/main_topbar";
import Main_phrase from "../components/mainPageComponents/main_phrase";
import BottomBar from "../components/BottomBar";
import { useConnWalletInfo } from "../App";

function MainPage() {
  const { isConnected } = useConnWalletInfo();

  console.log("MainPage: ", isConnected)
    return (
      <div className="App">
        <Main_topbar></Main_topbar>
        <Main_phrase isConnect={isConnected}></Main_phrase>
        <BottomBar></BottomBar>
      </div>
    );
  }
  
  export default MainPage;