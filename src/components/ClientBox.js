import React, { useState } from "react";

const ClientBox = () => {
  const [clientClassName, setClientClassName] = useState("clientBox")
  
  const handleClientBoxArrowDown = () => {
    setClientClassName((prevName) => {
      if (prevName.includes("on")) return "clientBox"
      else return "clientBox on"
    })
  }

  return (
    <div className={clientClassName}>
      <dl className="">
        <dt>고객 센터 <button className="btn arw-dw" onClick={() => handleClientBoxArrowDown()}></button></dt>
        <dd>
          <div className="phoneBox">
            <a href="tel:070-1234-5678">
              365일 24시간 언제 어디서나!<br />
              <em className="num">070-1234-5678</em>
            </a>
          </div>
          <ul>
            <li><a href="terms.html">운송약관</a></li>
            <li><a href="#!">이용약관</a></li>
            <li><a href="#!">개인정보보호방침</a></li>
          </ul>
        </dd>
      </dl>
    </div>
  )
}

export default ClientBox;