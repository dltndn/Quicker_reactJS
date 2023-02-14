import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/mainPage";
import SignUpPage from "./pages/SignUpPage";
import RequestPage from "./pages/RequestPage";
import SearchPage from "./pages/SearchPage";
import ChattingPage from "./pages/ChattingPage";
import ImformationPage from "./pages/ImformationPage";
import React from "react";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/request" element={<RequestPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/chatting" element={<ChattingPage />} />
        <Route path="/imformation" element={<ImformationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
