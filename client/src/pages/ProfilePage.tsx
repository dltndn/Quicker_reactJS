
import TopBarOthers from "../components/topBarOthers"
import BottomBar from "../components/BottomBar";

function ProfilePage() {
    return (
      <div className="App">
        <TopBarOthers title="프로필" redirect="/"></TopBarOthers>
        <div>프로필 페이지</div>
        <BottomBar></BottomBar>
      </div>
    );
  }
  
  export default ProfilePage;