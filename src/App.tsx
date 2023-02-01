import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/mainPage";
import SignUpPage from "./pages/SignUpPage";
import CommissionPage from "./pages/commission";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/commission" element={<CommissionPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
