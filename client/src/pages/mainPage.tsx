import { useAccount } from "wagmi";
import Main_topbar from "../components/mainPageComponents/main_topbar";
import Main_phrase from "../components/mainPageComponents/main_phrase";
import Main_textimage from "../components/mainPageComponents/main_textimage";
import Main_notice from "../components/mainPageComponents/main_notice";
import BottomBar from "../components/BottomBar";
import { useState, useEffect } from "react";


function MainPage() {
  const { isConnected } = useAccount();
    return (
      <div className="App">
        <Main_topbar></Main_topbar>
        <Main_phrase isConnect={isConnected}></Main_phrase>
        {/* <Main_textimage></Main_textimage> */}
        <Main_notice></Main_notice>
        <BottomBar></BottomBar>
      </div>
    );
  }
  
  export default MainPage;