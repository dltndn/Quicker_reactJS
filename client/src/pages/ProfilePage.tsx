import { Web3Button } from "@web3modal/react";
import TopBarOthers from "../components/topBarOthers"
import BottomBar from "../components/BottomBar";

function ProfilePage() {
    return (
      <div className="App">
        <TopBarOthers title="프로필" redirect="/"></TopBarOthers>
        <div>프로필 페이지</div>
        <Web3Button icon="hide" label="지갑연결" balance="hide" />
        <BottomBar></BottomBar>
      </div>
    );
  }
  
  export default ProfilePage;