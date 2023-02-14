import Main_topbar from "../components/main_topbar";
import Main_phrase from "../components/main_phrase";
import Main_textimage from "../components/main_textimage";
import Main_notice from "../components/main_notice";
import Main_Bottombar from "../components/main_bottombar";

function ImformationPage() {
    return (
      <div className="App">
        <Main_topbar></Main_topbar>
        <Main_phrase></Main_phrase>
        <Main_textimage></Main_textimage>
        <Main_notice></Main_notice>
        <Main_Bottombar></Main_Bottombar>
      </div>
    );
  }
  
  export default ImformationPage;