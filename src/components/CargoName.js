import React from "react";

const CargoName = ({ inputRef }) => {

  const handleNextClick = () => {
    inputRef.current.slickNext()
  }

  const handlePrevClick = () => {
    inputRef.current.slickPrev()
  }

  return (
    <div className="step3">
      <div className="stepBox"><span className="badge">STEP 3</span> 화물명 입력</div>
      <div className="inBox">
        <input type="text" placeholder="화물명"/>
        <div className="raBox">
          <input type="radio"  name="bang-1" id="bang-1-1" /><label className="btn" htmlFor="bang-1-1">냉장</label>
          <input type="radio"  name="bang-1" id="bang-1-2" /><label className="btn" htmlFor="bang-1-2">냉동</label>
          <input type="radio"  name="bang-1" id="bang-1-3" /><label className="btn" htmlFor="bang-1-3">방수</label>
          <input type="radio"  name="bang-1" id="bang-1-4" /><label className="btn" htmlFor="bang-1-4">방풍</label>
        </div>
      </div>
      <div className="btnBox">
        <button className="btn on">등록</button>
        <button className="btn off" onClick={() => handlePrevClick()}>이전으로</button>
        <button className="btn bdGray" onClick={() => handleNextClick()}>다음으로</button>
      </div>
    </div>
  )
}

export default CargoName;