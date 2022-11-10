import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "src/utils/ProtectedRoute";
import TrTerms from "src/components/TrTerms";
import UsTerms from "src/components/UsTerms";
import PrTerms from "src/components/PrTerms";
import History from "src/components/History"
import HistDetail from "src/components/HistDetail"

import Main from "src/main";
import "src/App.css";
import NaverLogin from "src/components/social/NaverLogin";
import KaKaoLogin from "src/components/social/KaKaoLogin";

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/TrTerms" element={<TrTerms />} />
        <Route path="/UsTerms" element={<UsTerms />} />
        <Route path="/PrTerms" element={<PrTerms />} />
        <Route path="/History" element={<History />} />
        <Route path="/HistDetail" element={<HistDetail />} />
        <Route element={<ProtectedRoute />}>
        </Route>
        <Route path="/LogIn/nid" element={<NaverLogin />} />
        <Route path="/LogIn/kid" element={<KaKaoLogin />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
