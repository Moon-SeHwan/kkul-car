import React, { useState } from "react";
import { useSelector } from 'react-redux';

import { useAppDispatch } from 'src/store';
import cargoSlice from 'src/slice/cargo';

/*
RRF 냉장
FFZ 냉동
RNA 해당없음

CG	카고
WB	윙바디
TC	탑차
LF	리프트
*/

const CargoName = ({ inputRef }) => {
  const cargo = useSelector((state) => state.cargo)
  const dispatch = useAppDispatch()

  const [name, setName] = useState(cargo.cargoName)
  const [rfofz, setRfofz] = useState("RNA")
  const [stoty, setStoty] = useState("")

  const handleRfofzChange = (e) => {
    if (e.target.value === "RRF" || e.target.value === "FFZ") {
      setStoty(() => "TC")
    }

    setRfofz(e.target.value)
  }

  const handleStotyChange = (e) => {
    if (rfofz === "RRF" || rfofz === "FFZ") {
      alert("냉장/냉동은 탑차입니다.")
      setStoty(() => "TC")

      return
    }

    setStoty(e.target.value)
  }

  const handleNextClick = () => {
    dispatch(
      cargoSlice.actions.STEP3({
        cargoName: name,
        truckType: stoty === "" ? rfofz : `${rfofz}^${stoty}`,
      })
    )

    inputRef.current.slickNext()
  }

  const handlePrevClick = () => {
    inputRef.current.slickPrev()
  }

  return (
    <div className="step2 pdb5">
      <div className="stepBox"><span className="badge">STEP 2</span> 화물명 입력</div>
      <input type="text" value={name} placeholder="화물명" onChange={e => { setName(e.target.value) }}/>
      <div className="inBox">
        <p className="inTit">냉장/냉동여부</p>
        <div className="raBox ra1">
          <span className="radioBox mgr25">
            <input type="radio" value="RRF" name="rfofz" id="rfofz-1" checked={rfofz === "RRF"} onChange={handleRfofzChange}/>
            <label htmlFor="rfofz-1">냉장</label>
          </span>
          <span className="radioBox mgr25">
            <input type="radio" value="FFZ" name="rfofz" id="rfofz-2" checked={rfofz === "FFZ"} onChange={handleRfofzChange}/>
            <label htmlFor="rfofz-2">냉동</label>
          </span>
          <span className="radioBox">
            <input type="radio" value="RNA" name="rfofz" id="rfofz-3" checked={rfofz === "RNA"} onChange={handleRfofzChange}/>
            <label htmlFor="rfofz-3">해당없음</label>
          </span>
        </div>
        <p className="inTit">차량종류</p>
        <div className="raBox ra2">
          <span className="radioBox mgr25">
            <input type="radio" value="CG" name="stoty" id="stoty-1" checked={stoty === "CG"} onChange={handleStotyChange}/>
            <label htmlFor="stoty-1">카고</label>
          </span>
          <span className="radioBox mgr25">
            <input type="radio" value="WB" name="stoty" id="stoty-2" checked={stoty === "WB"} onChange={handleStotyChange}/>
            <label htmlFor="stoty-2">윙바디</label>
          </span>
          <span className="radioBox mgr25">
            <input type="radio" value="TC" name="stoty" id="stoty-3" checked={stoty === "TC"} onChange={handleStotyChange}/>
            <label htmlFor="stoty-3">탑</label>
          </span>
          <div className="mgt10">
            <span className="radioBox mgr13">
              <input type="radio" value="LF" name="stoty" id="stoty-4" checked={stoty === "LF"} onChange={handleStotyChange}/>
              <label htmlFor="stoty-4">리프트</label>
            </span>
            <span className="radioBox">
              <input type="radio" value="" name="stoty" id="stoty-5" checked={stoty === ""} onChange={handleStotyChange}/>
              <label htmlFor="stoty-5">해당없음</label>
            </span>
          </div>
        </div>
      </div>
      <div className="txtBox">
        입력하신 화물명을 등록하시겠습니까?<br />
        이전 단계로 이동 시 입력하신 값들이 초기화 됩니다.
      </div>	
      <div className="btnBox">
        <button className="btn off" onClick={() => handlePrevClick()}>이전</button>
        <button className="btn on" onClick={() => handleNextClick()}>등록</button>
      </div>
    </div>
  )
}

export default CargoName;