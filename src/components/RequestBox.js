import React, { useState, useRef, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";

import { useAppDispatch } from 'src/store';
import cargoSlice from "src/slice/cargo";

import LogIn from "./LogIn";
import LoadImage from "./request/LoadImage";
import CargoName from "./request/CargoName";
import CargoSize from "./request/CargoSize";
import DateTime from "./request/DateTime";
import Address from "./request/Address";
import LoadUnload from "./request/LoadUnload";
import RequestItem from "./request/RequestItem";

import { formatFare } from "src/utils/commonUtils";

const RequestBox = () => {
  const sliderRef = useRef(null)
  const [requestClassName, setRequestClassName] = useState("requestBox on")
  const [additionalFare, setAdditionalFare] = useState(21000)
  const [pageNumber, setPageNumber] = useState(0)
  
  const handleRequestBoxArrowDown = () => {
    setRequestClassName((prevName) => {
      if (prevName.includes("on")) return "requestBox"
      else return "requestBox on"
    })
  }

  const handlePrevClick = () => {
    sliderRef.current.slickPrev()
  }

  const handleSendConfirm = () => {
    alert("수락")
  }

  return (
    <div className={requestClassName}>
      <div className="tit">
        화물 의뢰하기 <span className="page">({`${pageNumber}/8`})</span> <button className="arw-dw" onClick={() => handleRequestBoxArrowDown()}></button>
      </div>
      <Slider 
        ref={sliderRef}
        infinite={false}
        lazyLoad={true}
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
        adaptiveHeight={true}
        swipe={false}
        swipeToSlide={false}
        beforeChange={(_, next) => setPageNumber(next)}
      >
        <LogIn inputRef={sliderRef} />      {/* step1 */}
        <LoadImage inputRef={sliderRef} />  {/* step2 */}
        <CargoName inputRef={sliderRef} />  {/* step3 */}
        <CargoSize inputRef={sliderRef} />  {/* step4 */}
        <DateTime inputRef={sliderRef} />   {/* step5 */}
        <Address inputRef={sliderRef} />    {/* step6 */}
        <LoadUnload inputRef={sliderRef} page={pageNumber} /> {/* step7 */}
        <RequestItem inputRef={sliderRef} />{/* step8 */}
        <div className="step8">
          <div className="stepBox"><span className="badge">STEP 8</span> 요금확인</div>
          <div className="txtBox">
            고객님께서 요청하신 운송 건의 추천요금은<br />
            <em>{formatFare(10000 + additionalFare)}</em>원<br />
            (추가 비용 {formatFare(additionalFare)}원 포함)
            <p className="mgt30">운송을 의뢰하시겠습니까?</p>
          </div>	
          <div className="btnBox">
            <button className="btn off" onClick={() => handlePrevClick()}>이전</button>
            <button className="btn on" onClick={() => handleSendConfirm()}>수락</button>
          </div>
        </div>
      </Slider>
    </div>
  )
}

export default RequestBox;