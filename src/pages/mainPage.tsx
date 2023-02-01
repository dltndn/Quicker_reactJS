import ExampleComponent from "../components/example1";
import Main_topbar from "../components/main_topbar";
import Main_phrase from "../components/main_phrase";

function MainPage() {
    return (
      <div className="App">
        <Main_topbar></Main_topbar>
        <Main_phrase></Main_phrase>
        <ExampleComponent></ExampleComponent>
      </div>
    );
  }
  
  export default MainPage;