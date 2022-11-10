import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Header from "src/common/Header";
import Footer from "src/common/Footer";
import {
  searchTerms
} from "src/api/terms/index";

import "src/css/main.css";
import "src/css/style.css";
import "src/css/sub.css";

const UsTerms = () => {
  const [ useTerms, setUseTerms ] = useState('')
  const { pathname } = useLocation()

  useEffect(() => {
    const param = {
      termsType: "T02",
      expDiv: "ALLE"
    }
    searchTerms(param)
    .then(res => {
      setUseTerms(res.data[0]?.contents)
    })

  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  
  return(
    <div id ="contents">
      <Header/>
      <section className="contentSection" id="contentSection">
        <h2>이용약관</h2>
        <div className="termsBox">
          <div className="txtBox">
            <div className="temsTxt" dangerouslySetInnerHTML={{__html: useTerms}}>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  )
}

export default UsTerms;