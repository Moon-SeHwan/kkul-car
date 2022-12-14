import React, { useState } from "react";
import { useSelector } from 'react-redux';

import { useAppDispatch } from 'src/store';
import cargoSlice from "src/slice/cargo";

const CargoSize = ({ inputRef }) => {
  const cargo = useSelector((state) => state.cargo)
  const dispatch = useAppDispatch()

  const [horizontal, setHorizontal] = useState(cargo.cwidth)
  const [portrait, setPortrait] = useState(cargo.cverticalreal)
  const [height, setHeight] = useState(cargo.cheight)
  const [weight, setWeight] = useState(cargo.cweight)

  const handleChange = (prop) => (event) => {
    let val = event.target.value.replace(/[^0-9.]/g, "")
    
    if (val.startsWith(".")) {
      val = val.substring(1)
    }

    if (prop === "horizontal") {
      setHorizontal(val)
    } else if (prop === "portrait") {
      setPortrait(val)
    } else if (prop === "height") {
      setHeight(val)
    } else if (prop === "weight") {
      setWeight(val)
    }
  }

  const handleFocusOut = (prop) => (event) => {
    if (event.target.value === "" || event.target.value === "0" || event.target.value === "NaN") {
      if (prop === "horizontal") {
        setHorizontal(0)
      } else if (prop === "portrait") {
        setPortrait(0)
      } else if (prop === "height") {
        setHeight(0)
      } else if (prop === "weight") {
        setWeight(0)
      }
      return
    }

    let val = event.target.value

    if (val.startsWith("0") && !val.startsWith("0.")) val = val.substring(1)
    if (val.includes(".") && val.endsWith("0")) val = val.substring(0, val.length - 1)

    if (prop === "horizontal") {
      setHorizontal(parseFloat(val))
    } else if (prop === "portrait") {
      setPortrait(parseFloat(val))
    } else if (prop === "height") {
      setHeight(parseFloat(val))
    } else if (prop === "weight") {
      setWeight(parseFloat(val))
    }
  }

  const handleNextClick = () => {
    dispatch(
      cargoSlice.actions.STEP3({
        cweight: weight,
        cheight: height,
        cwidth: horizontal,
        cverticalreal: portrait,
      })
    )

    inputRef.current.slickNext()
  }

  const handlePrevClick = () => {
    inputRef.current.slickPrev()
  }

  return (
    <div className="step3">
      <div className="stepBox"><span className="badge">STEP 3</span> ???????????? ??????</div>
      <div className="imgBox"></div>
      <div className="inBox">
        <ul>
          <li><input type="text" inputMode="decimal" placeholder="??????" value={horizontal} onChange={handleChange("horizontal")} onBlur={handleFocusOut("horizontal")}/></li>
          <li><input type="text" inputMode="decimal" placeholder="??????" value={portrait} onChange={handleChange("portrait")} onBlur={handleFocusOut("portrait")}/></li>
          <li><input type="text" inputMode="decimal" placeholder="??????" value={height} onChange={handleChange("height")} onBlur={handleFocusOut("height")}/>m</li>
        </ul>
        <div className="weight">
          <input type="text" inputMode="decimal" placeholder="????????????" value={weight} onChange={handleChange("weight")} onBlur={handleFocusOut("weight")}/>
          ???
        </div>
      </div>
      <div className="txtBox">
        ???????????? ???????????? ?????????????????????????<br />
        ?????? ????????? ?????? ??? ???????????? ????????? ????????? ?????????.
      </div>
      <div className="btnBox">
        <button className="btn off" onClick={() => handlePrevClick()}>??????</button>
        <button className="btn on" onClick={() => handleNextClick()}>??????</button>
      </div>
    </div>
  )
}

export default CargoSize