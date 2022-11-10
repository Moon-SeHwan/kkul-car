import React from "react";
import Header from "./common/Header";
import Footer from "./common/Footer";
import TopBanner from "./common/TopBanner";
import RequestBox from "./components/RequestBox";
import HistoryBox from "./components/HistoryBox";
import ClientBox from "./components/ClientBox";
import Modal from "src/common/Modal";

import "src/css/layout.css";
import "src/css/main.css";
import "src/css/style.css";
import "src/css/popup.css";

const Main = () => {
  return (
    <div id="contents">
      <Header />
      <section className="contentSection" id="contentSection">
        <TopBanner />
        <RequestBox />
        <HistoryBox />
        <ClientBox />
        <Modal />
      </section>
      <Footer />
    </div>
  )
}

export default Main;
