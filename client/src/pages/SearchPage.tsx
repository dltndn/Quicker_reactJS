
import BottomBar from "../components/BottomBar";
import TopBarOthers from "../components/topBarOthers"

function SearchPage() {
    return (
      <div>
        <TopBarOthers title="의뢰목록" redirect="/"></TopBarOthers>
        <div>의뢰 목록 탐색 페이지</div>
        <BottomBar></BottomBar>
      </div>
    );
  }
  
  export default SearchPage;