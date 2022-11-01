import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "src/utils/ProtectedRoute";
import Customer from "src/components/Customer";
import UseList from "src/components/UseList";
import TransTerms from "src/components/TransTerms";
import UseTerms from "src/components/UseTerms";
import PersonalPolicy from "src/components/PersonalPolicy";
import MemberReg from "src/components/MemberReg";
import History from "src/components/History"

import Main from "src/main";
import "src/App.css";
import NaverLogin from "src/components/social/NaverLogin";
import KaKaoLogin from "src/components/social/KaKaoLogin";

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Customer" element={<Customer />} />
        <Route path="/TransTerms" element={<TransTerms />} />
        <Route path="/UseTerms" element={<UseTerms />} />
        <Route path="/History" element={<History />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/UseList" element={<UseList />} />
        </Route>
        <Route path="/PersonalPolicy" element={<PersonalPolicy />} />
        <Route path="/LogIn/nid" element={<NaverLogin />} />
        <Route path="/LogIn/kid" element={<KaKaoLogin />} />
        <Route path="/MemberReg" element={<MemberReg />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
