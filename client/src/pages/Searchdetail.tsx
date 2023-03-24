import React, { useRef } from "react";
import BottomBar from "../components/BottomBar";
import TopBarOthers from "../components/topBarOthers"
import { useNavigate } from "react-router-dom";
import Search_Detail from "../components/Search_Detail";

function SearchDetail() {
  const navigate = useNavigate()

    return (
      <div>
        <TopBarOthers title="김포 북변 - 김포 북변 0.2Km(예시)" redirectLogic={function () {
          navigate("/")
        } }></TopBarOthers>
        <Search_Detail/>
        <BottomBar></BottomBar>
      </div>
    );
  }
  
  export default SearchDetail;