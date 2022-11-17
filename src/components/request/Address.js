import React, { useState } from "react";
import { useSelector } from 'react-redux';

import DaumPostcode from "react-daum-postcode";

import { useAppDispatch } from 'src/store';
import cargoSlice from "src/slice/cargo";
import modalSlice from "src/slice/modal";

import { geocoding } from "src/api/openapi";

const Address = ({ inputRef }) => {
  const cargo = useSelector((state) => state.cargo)
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

  const onComplete = (data, d) => {
    dispatch(
      modalSlice.actions.CLOSE()
    )

    geocoding(data.roadAddress)
    .then(res => {
      if (d === "depart") {
        setDepartAddr({
          st: res.road,
          st2: res.building,
          old: res.jibun,
          lat: res.lat,
          lon: res.lon,
        })
      } else if (d === "arrival") {
        setArrivalAddr({
          st: res.road,
          st2: res.building,
          old: res.jibun,
          lat: res.lat,
          lon: res.lon,
        })
      }
    })
  }

  const handleDepartSearchActive = () => {
    dispatch(
      modalSlice.actions.SHOW({
        header: "출발지 주소 찾기",
        onBtnHidden: true,
        components: <DaumPostcode onComplete={(addr) => onComplete(addr, "depart")} />
      })
    )
  }

  const handleArrivalSearchActive = () => {
    dispatch(
      modalSlice.actions.SHOW({
        header: "도착지 주소 찾기",
        onBtnHidden: true,
        components: <DaumPostcode onComplete={(addr) => onComplete(addr, "arrival")} />
      })
    )
  }

  const handleNextClick = () => {

    dispatch(
      cargoSlice.actions.STEP5({
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

  const handleDepartSt2Change = (e) => {
    setDepartAddr({ ...departAddr, st2: e.target.value })
  }

  const handleArrivalSt2Change = (e) => {
    setArrivalAddr({ ...arrivalAddr, st2: e.target.value })
  }

  return (
    <div className="step5">
      <div className="stepBox"><span className="badge">STEP 6</span> 출발/도착지 입력</div>
      <div className="inBox">
        <div className="startBox">
          <p className="inTit">출발지 주소</p>
          <p className="adrBox"><input type="text" readOnly placeholder="출발지 주소" value={departAddr.st} onClick={() => handleDepartSearchActive()} />
            <button className="btn adr" onClick={() => handleDepartSearchActive()}></button>
          </p>
          <p className="inTit2">상세 주소</p>
          <p className="adrDetail"><input type="text" placeholder="상세주소" value={departAddr.st2} onChange={handleDepartSt2Change} /></p>
          {/* <div className="phoneBox">
            <input type="text" placeholder="출발지 연락처" className="" />
            <button className="btn phon">변경</button>
          </div> */}
        </div>
        <div className="arrivalBox">
          <p className="inTit">도착지 주소</p>
          <p className="adrBox"><input type="text" readOnly placeholder="도착지 주소" value={arrivalAddr.st} onClick={() => handleArrivalSearchActive()} />
            <button className="btn adr" onClick={() => handleArrivalSearchActive()}></button>
          </p>
          <p className="inTit2">상세 주소</p>
          <p className="adrDetail"><input type="text" readOnly placeholder="상세주소" value={arrivalAddr.st2} onChange={handleArrivalSt2Change} /></p>
          {/* <div className="phoneBox">
            <input type="text" placeholder="도착지 연락처" className="" />
            <button className="btn phon">변경</button>
          </div> */}
        </div>
      </div>
      <div className="txtBox">
        입력하신 주소를 등록하시겠습니까?<br />
        이전 단계로 이동 시 입력하신 값들이 초기화 됩니다.
      </div>	
      <div className="btnBox">
        <button className="btn off" onClick={() => handlePrevClick()}>이전</button>
        <button className="btn on" onClick={() => handleNextClick()}>등록</button>
      </div>
    </div>
  )
}

export default Address;
