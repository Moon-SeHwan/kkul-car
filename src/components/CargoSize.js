import React, { useState } from "react";
import { useSelector } from 'react-redux';

import { useAppDispatch } from 'src/store';
import cargoSlice from "src/slice/cargo";

const CargoSize = ({ inputRef }) => {
  const cargo = useSelector((state) => state.cargo)
  const dispatch = useAppDispatch()

  const [values, setValues] = useState({
    horizontal: cargo.cwidth,
    portrait: cargo.cverticalreal,
    height: cargo.cheight,
    weight: cargo.cweight,
    volume: (cargo.cwidth * cargo.cverticalreal * cargo.cheight).toFixed(1),
  })

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleChangePage = () => {
    dispatch(
      cargoSlice.actions.SET_REQUEST_2({
        cweight: values.weight,
        cheight: values.height,
        cwidth: values.horizontal,
        cverticalreal: values.portrait
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
    <div className="step4">
      <div className="stepBox"><span className="badge">STEP 4</span> 화물정보 등록</div>
      <div className="imgBox"></div>
      <div className="inBox">
        <ul>
          <li><input type="text" placeholder="가로" onChange={handleChange("horizontal")}/></li>
          <li><input type="text" placeholder="세로" onChange={handleChange("portrait")}/></li>
          <li><input type="text" placeholder="높이" onChange={handleChange("height")}/>m</li>
        </ul>
        <div className="weight">
          <input type="text" placeholder="화물중량" onChange={handleChange("weight")}/>
          ㎏
        </div>
      </div>
      <div className="txtBox">
        입력하신 사이즈를 등록하시겠습니까?<br />
        이전 단계로 이동 시 입력하신 값들이 초기화 됩니다.
      </div>	
      <div className="btnBox">
        <button className="btn on">등록</button>
        <button className="btn off" onClick={() => handlePrevClick()}>이전으로</button>
        <button className="btn bdGray" onClick={() => handleNextClick()}>다음으로</button>
      </div>
    </div>
  )
}

export default CargoSize