import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import ProtectedRoute from "src/utils/ProtectedRoute";
import Main from "src/main";
import CannotLogIn from "src/components/CannotLogIn";
import TrTerms from "src/components/client/TrTerms";
import UsTerms from "src/components/client/UsTerms";
import PrTerms from "src/components/client/PrTerms";
import History from "src/components/history/History"
import HistoryDetail from "src/components/history/HistoryDetail"

import "src/App.css";
import NaverLogin from "src/components/social/NaverLogin";
import KaKaoLogin from "src/components/social/KaKaoLogin";

import Header from "src/common/Header";
import Footer from "src/common/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/undefined" element={<CannotLogIn />}/>
        <Route path="/TrTerms" element={<TrTerms />} />
        <Route path="/UsTerms" element={<UsTerms />} />
        <Route path="/PrTerms" element={<PrTerms />} />
        <Route path="/History" element={<History />} />
        <Route path="/HistoryDetail" element={<HistoryDetail />} />
        <Route path="/LogIn/nid" element={<NaverLogin />} />
        <Route path="/LogIn/kid" element={<KaKaoLogin />} />
        {/* <Route element={<ProtectedRoute />}>
        </Route> */}
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}
export default App;
