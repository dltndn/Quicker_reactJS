
import BottomBar from "../components/BottomBar";
import TopBarOthers from "../components/topBarOthers"
import { useNavigate } from "react-router-dom";

function SearchPage() {
  const navigate = useNavigate()
    return (
      <div>
        <TopBarOthers title="의뢰목록" redirectLogic={function () {
          navigate("/")
        } }></TopBarOthers>
        <div>의뢰 목록 탐색 페이지</div>
        <BottomBar></BottomBar>
      </div>
    );
  }
  
  export default SearchPage;