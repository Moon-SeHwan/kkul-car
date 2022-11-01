import React, { useState } from "react";
import { useSelector } from 'react-redux';

import { useAppDispatch } from 'src/store';
import cargoSlice from "src/slice/cargo";
import {
  searchAddress
} from "src/api/cargo";

import Modal from "src/common/Modal";

const Address = ({ inputRef }) => {
  const cargo = useSelector((state) => state.cargo)
  const dispatch = useAppDispatch()

  const [isDepartOpen, setIsDepartOpen] = useState(false)
  const [isArrivalOpen, setIsArrivalOpen] = useState(false)
  const [departAddrSt, setDepartAddrSt] = useState(cargo.departAddrSt)
  const [departAddrOld, setDepartAddrOld] = useState(cargo.departAddrOld)
  const [arrivalAddrSt, setArrivalAddrSt] = useState(cargo.arrivalAddrSt)
  const [arrivalAddrOld, setArrivalAddrOld] = useState(cargo.arrivalAddrOld)
  const [departLatitude, setDepartLatitude] = useState(cargo.departLatitude)
  const [departLongitude, setDepartLongitude] = useState(cargo.departLongitude)
  const [arrivalLatitude, setArrivalLatitude] = useState(cargo.arrivalLatitude)
  const [arrivalLongitude, setArrivalLongitude] = useState(cargo.arrivalLongitude)

  const [showDepartAddr, setShowDepartAddr] = useState(
    departAddrSt + "\n(지번) " + departAddrOld
  )
  const [showArrivalAddr, setShowArrivalAddr] = useState(
    arrivalAddrSt + "\n(지번) " + arrivalAddrOld
  )

  const handleDepartSearchComplete = (data) => {

    searchAddress(data.roadAddress)
    .then(res => {
      /*
      x: 경도(longitude)
      y: 위도(latitude)
      */
      setIsDepartOpen(false)
      return res.data.documents[0]
    })
    .then((res) => {
      setDepartAddrSt(data.roadAddress)
      setDepartAddrOld(data.jibunAddress)
      setDepartLatitude(res.y)
      setDepartLongitude(res.x)

      setShowDepartAddr(data.roadAddress + "\n(지번) " + data.jibunAddress)
    })
  }

  const handleArrivalSearchComplete = (data) => {

    searchAddress(data.roadAddress)
    .then(res => {
      /*
      x: 경도(longitude)
      y: 위도(latitude)
      */
      return res.data.documents[0]
    })
    .then((res) => {
      setIsArrivalOpen(false)
      setArrivalAddrSt(data.roadAddress)
      setArrivalAddrOld(data.jibunAddress)
      setArrivalLatitude(res.y)
      setArrivalLongitude(res.x)

      setShowArrivalAddr(data.roadAddress + "\n(지번) " + data.jibunAddress)
    })
  }

  const handleDepartSearchActive = (active) => {
    setIsDepartOpen(active)
  }

  const handleArrivalSearchActive = (active) => {
    setIsArrivalOpen(active)
  }

  const handleChangePage = () => {
    dispatch(
      cargoSlice.actions.SET_REQUEST_4({
        departAddrSt: departAddrSt,
        departAddrOld: departAddrOld,
        arrivalAddrSt: arrivalAddrSt,
        arrivalAddrOld: arrivalAddrOld,
        departLatitude: departLatitude,
        departLongitude: departLongitude,
        arrivalLatitude: arrivalLatitude,
        arrivalLongitude: arrivalLongitude,
      })
    )
  }

  const handleNextClick = () => {
    inputRef.current.slickNext()
  }

  const handlePrevClick = () => {
    inputRef.current.slickPrev()
  }

  return (
    <div className="step6">
      <div className="stepBox"><span className="badge">STEP 6</span> 출발/도착지 입력</div>
      <div className="inBox">
        <div className="startBox">
          <p className="inTit">출발지 주소</p>
          <p className="adrBox"><input type="text" placeholder="출발지 주소" className="" onClick={() => handleDepartSearchActive(true)} />
            <button className="btn adr" onClick={() => handleDepartSearchActive(true)}></button>
          </p>
          <p className="adrDetail"><input type="text" placeholder="상세주소" className="" /></p>
          <div className="phoneBox">
            <input type="text" placeholder="출발지 연락처" className="" />
            <button className="btn phon">변경</button>
          </div>
        </div>
        <Modal isOpen={isDepartOpen} onClose={() => handleDepartSearchActive(false)} onComplete={handleDepartSearchComplete} header="출발지 주소 찾기"></Modal>
        <div className="arrivalBox">
          <p className="inTit">도착지 주소</p>
          <p className="adrBox"><input type="text" placeholder="도착지 주소" className="" onClick={() => handleArrivalSearchActive(true)} />
            <button className="btn adr" onClick={() => handleArrivalSearchActive(true)}></button>
          </p>
          <p className="adrDetail"><input type="text" placeholder="상세주소" className="" /></p>
          <div className="phoneBox">
            <input type="text" placeholder="도착지 연락처" className="" />
            <button className="btn phon">변경</button>
          </div>
        </div>
        <Modal isOpen={isArrivalOpen} onClose={() => handleArrivalSearchActive(false)} onComplete={handleArrivalSearchComplete} header="도착지 주소 찾기"></Modal>
      </div>
      <div className="btnBox">
        <button className="btn on">등록</button>
        <button className="btn off" onClick={() => handlePrevClick()}>이전으로</button>
        <button className="btn bdGray" onClick={() => handleNextClick()}>다음으로</button>
      </div>
    </div>
  )
}

export default Address;
