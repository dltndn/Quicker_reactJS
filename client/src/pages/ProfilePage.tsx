import { Web3Button } from "@web3modal/react";
import { useAccount } from "wagmi";
import TopBarOthers from "../components/topBarOthers"
import BottomBar from "../components/BottomBar";
import GetQkrwBalance from "../components/getQkrwBalance";

function ProfilePage() {
  const { address, isConnected } = useAccount();
    return (
      <div className="App">
        <TopBarOthers title="프로필" redirect="/"></TopBarOthers>
        <div>프로필 페이지</div>
        <Web3Button icon="hide" label="지갑연결" balance="hide" />
        <div>지갑주소: {address}</div>
        <div>지갑잔액: {isConnected && address && <GetQkrwBalance address={address}/>}원</div>
        <BottomBar></BottomBar>
      </div>
    );
  }
  
  export default ProfilePage;