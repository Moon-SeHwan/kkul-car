import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ClientBox = () => {
  const navigate = useNavigate()

  const [clientClassName, setClientClassName] = useState("clientBox")

  const onClickToTrTerms = () => {
    navigate('TrTerms')
  }

  const onClickToUsTerms = () => {
    navigate('UsTerms')
  }

  const onClickToPrTerms = () => {
    navigate('PrTerms')
  }

  useEffect(() => {
    setClientClassName(() => "clientBox on")
  }, [])
  
  const handleClientBoxArrowDown = () => {
    setClientClassName((prevName) => {
      if (prevName.includes("on")) return "clientBox"
      else return "clientBox on"
    })
  }

  return (
    <div className={clientClassName}>
      <dl className="">
        <dt>고객 센터 <button className="arw-dw" onClick={() => handleClientBoxArrowDown()}></button></dt>
        <dd>
          <div className="phoneBox">
            <img src={require("src/assets/icon/phone.png")} alt="" />
            <a href="tel:042-488-8741">
              365일 24시간 언제 어디서나!<br />
              <em className="num">042-488-8741</em>
            </a>
          </div>
          <ul>
            <li onClick={onClickToTrTerms}>운송약관</li>
            <li onClick={onClickToUsTerms}>이용약관</li>
            <li onClick={onClickToPrTerms}>개인정보보호방침</li>
          </ul>
        </dd>
      </dl>
    </div>
  )
}

export default ClientBox;