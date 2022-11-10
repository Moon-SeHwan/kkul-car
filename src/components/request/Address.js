import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

import { useAppDispatch } from 'src/store';
import cargoSlice from "src/slice/cargo";
import modalSlice from "src/slice/modal";

import { driving } from "src/api/openapi";

const Address = ({ inputRef }) => {
  const cargo = useSelector((state) => state.cargo)
  const modal = useSelector((state) => state.modal)
  const dispatch = useAppDispatch()

  const [departAddr, setDepartAddr] = useState({
    st: cargo.departAddrSt || "",
    st2: cargo.departAddrSt2 || "",
    old: cargo.departAddrOld || "",
    lat: cargo.departLatitude,
    lon: cargo.departLongitude,
  })
  const [arrivalAddr, setArrivalAddr] = useState({
    st: cargo.arrivalAddrSt || "",
    st2: cargo.arrivalAddrSt2 || "",
    old: cargo.arrivalAddrOld || "",
    lat: cargo.arrivalLatitude,
    lon: cargo.arrivalLongitude,
  })

  useEffect(() => {
    if (modal.data !== null) {

      if (modal.d === "depart") {
        handleDepartSearchComplete(modal.data)
      } else if (modal.d === "arrival") {
        handleArrivalSearchComplete(modal.data)
      }

      dispatch(
        modalSlice.actions.CLOSE()
      )
    }
  }, [modal.data, modal.d, dispatch])

  const handleDepartSearchComplete = (data) => {
    setDepartAddr({
      st: data.road,
      st2: data.building,
      old: data.jibun,
      lat: data.lat,
      lon: data.lon,
    })
  }

  const handleArrivalSearchComplete = (data) => {
    setArrivalAddr({
      st: data.road,
      st2: data.building,
      old: data.jibun,
      lat: data.lat,
      lon: data.lon,
    })
  }

  const handleDepartSearchActive = () => {
    dispatch(
      modalSlice.actions.SHOW({
        d: "depart",
        header: "출발지 주소 찾기",
      })
    )
  }

  const handleArrivalSearchActive = () => {
    dispatch(
      modalSlice.actions.SHOW({
        d: "arrival",
        header: "도착지 주소 찾기",
      })
    )
  }

  const handleNextClick = () => {
    // if (departAddr.st === "") {
    //   alert("출발지 주소를 입력해주세요")
    //   return
    // }

    // if (arrivalAddr.st === "") {
    //   alert("도착지 주소를 입력해주세요")
    //   return
    // }

    dispatch(
      cargoSlice.actions.STEP6({
        departAddrSt: departAddr.st,
        departAddrSt2: departAddr.st2,
        departAddrOld: departAddr.old,
        arrivalAddrSt: arrivalAddr.st,
        arrivalAddrSt2: arrivalAddr.st2,
        arrivalAddrOld: arrivalAddr.old,
        departLatitude: parseFloat(departAddr.lat),
        departLongitude: parseFloat(departAddr.lon),
        arrivalLatitude: parseFloat(arrivalAddr.lat),
        arrivalLongitude: parseFloat(arrivalAddr.lon),
      })
    )

    inputRef.current.slickNext()
  }

  const handlePrevClick = () => {
    inputRef.current.slickPrev()
  }

  const handleTest = (e) => {
    setDepartAddr({...departAddr, st2: e.target.value })
  }

  return (
    <div className="step6">
      <div className="stepBox"><span className="badge">STEP 6</span> 출발/도착지 입력</div>
      <div className="inBox">
        <div className="startBox">
          <p className="inTit">출발지 주소</p>
          <p className="adrBox"><input type="text" readOnly placeholder="출발지 주소" value={departAddr.st} className="" onClick={() => handleDepartSearchActive(true)} />
            <button className="btn adr" onClick={() => handleDepartSearchActive(true)}></button>
          </p>
          <p className="inTit2">상세 주소</p>
          <p className="adrDetail"><input type="text" placeholder="상세주소" value={departAddr.st2} className="" onChange={handleTest} /></p>
          {/* <div className="phoneBox">
            <input type="text" placeholder="출발지 연락처" className="" />
            <button className="btn phon">변경</button>
          </div> */}
        </div>
        {/* <Modal isOpen={isDepartOpen} onClose={() => handleDepartSearchActive(false)} onComplete={handleDepartSearchComplete} header="출발지 주소 찾기"></Modal> */}
        <div className="arrivalBox">
          <p className="inTit">도착지 주소</p>
          <p className="adrBox"><input type="text" readOnly placeholder="도착지 주소" value={arrivalAddr.st} className="" onClick={() => handleArrivalSearchActive(true)} />
            <button className="btn adr" onClick={() => handleArrivalSearchActive(true)}></button>
          </p>
          <p className="inTit2">상세 주소</p>
          <p className="adrDetail"><input type="text" readOnly placeholder="상세주소" value={arrivalAddr.st2} className="" /></p>
          {/* <div className="phoneBox">
            <input type="text" placeholder="도착지 연락처" className="" />
            <button className="btn phon">변경</button>
          </div> */}
        </div>
        {/* <Modal isOpen={isArrivalOpen} onClose={() => handleArrivalSearchActive(false)} onComplete={handleArrivalSearchComplete} header="도착지 주소 찾기"></Modal> */}
      </div>
      <div className="txtBox">
        입력하신 사이즈를 등록하시겠습니까?<br />
        이전 단계로 이동 시 입력하신 값들이 초기화 됩니다.
      </div>	
      <div className="btnBox">
        <button className="btn on" onClick={() => handleNextClick()}>등록</button>
        <button className="btn off" onClick={() => handlePrevClick()}>이전으로</button>
        <button className="btn bdGray" onClick={() => handleNextClick()}>다음으로</button>
      </div>
    </div>
  )
}

export default Address;
