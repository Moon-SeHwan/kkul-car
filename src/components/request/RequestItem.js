import React, { useState } from "react";

import { useAppDispatch } from 'src/store';
import cargoSlice from "src/slice/cargo";

/*
LP	REQIT	상차지지불
UP	REQIT	하차지지불

RP	REQIT	현금영수증/세금계산서 발생
DH	REQIT	기사님 도움
*/

const RequestItem = ({ inputRef }) => {
  const dispatch = useAppDispatch()

  const [request1, setRequest1] = useState([])
  const [request2, setRequest2] = useState([])

  const handleChangeRequest1 = (event) => {
    const checked = event.target.checked
    const val = event.target.value
    if (checked) {
      setRequest1(() => [...request1, val])
    } else {
      setRequest1((prev) => prev.filter(e => e !== val))
    }
  }

  const handleChangeRequest2 = (event) => {
    const checked = event.target.checked
    const val = event.target.value
    if (checked) {
      setRequest2(() => [...request2, val])
    } else {
      setRequest2((prev) => prev.filter(e => e !== val))
    }
  }

  const handleNextClick = () => {
    const requestItem = [...request1, ...request2].join("^")
    
    dispatch(
      cargoSlice.actions.STEP8({
        requestItems: requestItem
      })
    )

    inputRef.current.slickNext()
  }

  const handlePrevClick = () => {
    inputRef.current.slickPrev()
  }

  return (
    <div className="step8 pdb5">
      <div className="stepBox"><span className="badge">STEP 8</span> 요청사항</div>
      <div className="inBox">						
        <p className="inTit">결제방법(다수 선택가능)</p>
        <div className="raBox ra1">
          <span className="radioBox mgr25">
            <input type="checkbox" value="LP" name="request1" id="request-1-1" onChange={handleChangeRequest1} />
            <label htmlFor="request-1-1">상차지 지불</label>
          </span>
          <span className="radioBox">
            <input type="checkbox" value="UP" name="request1" id="request-1-2" onChange={handleChangeRequest1} />
            <label htmlFor="request-1-2">하차지 지불</label>
          </span>
        </div>
        <p className="inTit">요청사항</p>
        <div className="raBox ra2">
          <span className="radioBox mgr25">
            <input type="checkbox" value="RP" name="request2" id="request-2-1" onChange={handleChangeRequest2} />
            <label htmlFor="request-2-1">세금계산서/현금영수증 발행</label>
          </span>
          <span className="radioBox mgt5">
            <input type="checkbox" value="DH" name="request2" id="request-2-2" onChange={handleChangeRequest2} />
            <label htmlFor="request-2-2">기사님 도움(추가요금)</label>
          </span>
        </div>
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

export default RequestItem;
