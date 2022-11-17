import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import {
  searchTerms
} from "src/api/terms/index";

import "src/css/main.css";
import "src/css/style.css";
import "src/css/sub.css";

const PrTerms = () => {
  const [ personalPolicy, setPersonalPolicy ] = useState('')
  const { pathname } = useLocation()

  useEffect(() => {
    const param = {
      termsType: "T03",
      expDiv: "ALLE"
    }
    searchTerms(param)
    .then(res => {
      setPersonalPolicy(res.data?.contents)
    })
      
  },[])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  
  return(
    <section className="contentSection">
      <h2>개인정보보호방침</h2>
      <div className="termsBox">
        <div className="txtBox">
          <div className="temsTxt">
            {personalPolicy}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PrTerms;