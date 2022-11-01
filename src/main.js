import React from "react";
import Header from "./common/Header";
import Footer from "./common/Footer";
import TopBanner from "./common/TopBanner";
import RequestBox from "./components/RequestBox";
import HistoryBox from "./components/HistoryBox";
import ClientBox from "./components/ClientBox";

import "src/css/layout.css";
import "src/css/main.css";
import "src/css/style.css";
import "src/css/popup.css";
import "src/css/sub.css";

const Main = () => {
  return (
    <div id="contents">
      <Header />
      <section className="contentSection" id="contentSection">
        <TopBanner />
        <RequestBox />
        <HistoryBox />
        <ClientBox />
      </section>
      <Footer />
    </div>
  )
}

export default Main;
