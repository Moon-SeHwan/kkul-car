import React, { useState, useRef } from "react";
import Slider from "react-slick";

import LogIn from "./LogIn";
import LoadImage from "./LoadImage";
import CargoName from "./CargoName";
import CargoSize from "./CargoSize";
import DateTime from "./DateTime";
import Address from "./Address";
import LoadUnload from "./LoadUnload";
import RequestItem from "./RequestItem";

const requestBoxSettings = {
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
};

const RequestBox = () => {
  const sliderRef = useRef()
  const [requestClassName, setRequestClassName] = useState("requestBox")
  
  const handleRequestBoxArrowDown = () => {
    setRequestClassName((prevName) => {
      if (prevName.includes("on")) return "requestBox"
      else return "requestBox on"
    })
  }

  const handlePrevClick = () => {
    sliderRef.current.slickPrev()
  }

  return (
    <div className={requestClassName}>
      <div className="tit">
        화물 의뢰하기 <button className="btn arw-dw" onClick={() => handleRequestBoxArrowDown()}></button>
      </div>
      <Slider {...requestBoxSettings } ref={sliderRef}>
        <LogIn inputRef={sliderRef} />      {/* step1 */}
        <LoadImage inputRef={sliderRef} />  {/* step2 */}
        <CargoName inputRef={sliderRef} />  {/* step3 */}
        <CargoSize inputRef={sliderRef} />  {/* step4 */}
        <DateTime inputRef={sliderRef} />   {/* step5 */}
        <Address inputRef={sliderRef} />    {/* step6 */}
        <LoadUnload inputRef={sliderRef} /> {/* step7 */}
        <RequestItem inputRef={sliderRef} />{/* step8 */}
        <div className="step9">
          <div className="stepBox"><span className="badge">STEP 9</span> 요금확인</div>
          <div className="txtBox">
            고객님께서 요청하신 운송 건의 추천요금은<br />
            <em>xxx,xxx</em>원<br />
            (기사님 상하차 도움비용 nn,nnn원 포함)
            <p className="mgt30">운송을 의뢰하시겠습니까?</p>
          </div>	
          <div className="btnBox">
            <button className="btn on">수락</button>
            <button className="btn off" onClick={() => handlePrevClick()}>이전으로</button>
          </div>
        </div>
      </Slider>
    </div>
  )
}

export default RequestBox;