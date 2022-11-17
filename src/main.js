import React from "react";
import { useSelector } from "react-redux";

import TopBanner from "./common/TopBanner";
import RequestBox from "./components/RequestBox";
import HistoryBox from "./components/HistoryBox";
import ClientBox from "./components/ClientBox";
import Modal from "src/common/Modal";

import "src/css/layout.css";
import "src/css/main.css";
import "src/css/style.css";

const Main = () => {
  const modal = useSelector((state) => state.modal)

  return (
    <section className="contentSection" id="contentSection">
      <TopBanner />
      <RequestBox />
      <HistoryBox />
      <ClientBox />
      {
        modal.isOpen ?
        <Modal />
        :
        null
      }
    </section>
  )
}

export default Main;
