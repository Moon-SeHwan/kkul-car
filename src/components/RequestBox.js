import React, { useState, useRef, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from 'src/store';
import Slider from "react-slick";

import cargoSlice from "src/slice/cargo";

import LogIn from "./LogIn";
import LoadImage from "./request/LoadImage";
import CargoName from "./request/CargoName";
import CargoSize from "./request/CargoSize";
import DateTime from "./request/DateTime";
import Address from "./request/Address";
import LoadUnload from "./request/LoadUnload";
import RequestItem from "./request/RequestItem";

import { getToday, formatDateToString } from "src/utils/dateUtil";
import { formatFare } from "src/utils/commonUtils";
import {
  setRequest,
  getRequestFare
} from "src/api/cargo";

const requestBoxSettings = {
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
  swipe: false,
  swipeToSlide: false,
};

const RequestBox = () => {
  const cargo = useSelector((state) => state.cargo)
  const user = useSelector((state) => state.user)
  const dispatch = useAppDispatch()

  const sliderRef = useRef()
  const [requestClassName, setRequestClassName] = useState("requestBox")
  const [additionalFare, setAdditionalFare] = useState(0)
  
  const handleRequestBoxArrowDown = () => {
    setRequestClassName((prevName) => {
      if (prevName.includes("on")) {
        return "requestBox"
      } 
      else return "requestBox on"
    })
  }

  const handlePrevClick = () => {
    sliderRef.current.slickPrev()
  }

  const calculateFare = useCallback(() => {
    if (!(cargo.departLatitude === 0 && cargo.departLongitude === 0
      && cargo.arrivalLatitude === 0 && cargo.arrivalLongitude === 0)) {
        const param = {
          departLatitude: cargo.departLatitude,
          departLongitude: cargo.departLongitude,
          arrivalLatitude: cargo.arrivalLatitude,
          arrivalLongitude: cargo.arrivalLongitude,
        }
    
        getRequestFare(param)
        .then(res => {
          setAdditionalFare(() => res.data.additionalFare)

          dispatch(
            cargoSlice.actions.STEP9({
              transitFare: 10000,
              additionalFare: res.data.additionalFare,
              directDistance: res.data.directDistance,
              realDistance: res.data.realDistance,
            })
          )
        })
    }
  }, [cargo.departLatitude, cargo.departLongitude, cargo.arrivalLatitude, cargo.arrivalLongitude])

  useEffect(() => {
    setRequestClassName("requestBox on")
  }, [])

  useEffect(() => {
    calculateFare()
  }, [calculateFare])

  const handleSendConfirm = () => {
    const request = {
      ownerUid: user.ownerUid,
      imageList: cargo.imageList,
      cargoName: cargo.cargoName,
      truckType: cargo.truckType,
      cweight: cargo.cweight,
      cheight: cargo.cheight,
      cwidth: cargo.cwidth,
      cverticalreal: cargo.cverticalreal,
      departDatetimes: formatDateToString(cargo.departDatetimes),
      arrivalDatetimes: formatDateToString(cargo.arrivalDatetimes),
      departAddrSt: cargo.departAddrSt,
      departAddrSt2: cargo.departAddrSt2,
      departAddrOld: cargo.departAddrOld,
      arrivalAddrSt: cargo.arrivalAddrSt,
      arrivalAddrSt2: cargo.arrivalAddrSt2,
      arrivalAddrOld: cargo.arrivalAddrOld,
      receiverPhone: user.phoneNumber,
      departLatitude: cargo.departLatitude,
      departLongitude: cargo.departLongitude,
      arrivalLatitude: cargo.arrivalLatitude,
      arrivalLongitude: cargo.arrivalLongitude,
      loadMethod: cargo.loadMethod.value,
      unloadMethod: cargo.unloadMethod.value,
      requestItems: cargo.requestItems,
      transitFare: cargo.transitFare,
      additionalFare: cargo.additionalFare,
      status: "RO",
      regComDate: getToday(),
      directDistance: cargo.directDistance,
      realDistance: cargo.realDistance,
    }
    
    console.log(request)

    setRequest(request)
    .then(() => {
      // dispatch(
      //   cargoSlice.actions.REQUEST_COMPLETE({})
      // )

      setRequestClassName("requestBox")
      sliderRef.current.slickGoTo(0)
    })
    .then(() => {
      window.location.reload()
    })
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