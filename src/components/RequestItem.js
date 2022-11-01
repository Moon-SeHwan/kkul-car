import React, { useState, useLayoutEffect } from "react";

import { useAppDispatch } from 'src/store';
import cargoSlice from "src/slice/cargo";

import {
  getCommonCodeByRequestItem
} from "src/api/code";

const RequestItem = ({ inputRef }) => {
  const dispatch = useAppDispatch()

  const [ requestList, setRequestList ] = useState({})
  // 냉장/냉동여부
  const [ rfofz, setRfofz ] = useState({
    value: "RNA",
    name: "냉장/냉동여부_해당없음"
  })
  // 차량종류
  const [ ctype, setCtype ] = useState({
    value: "",
    name: "선택안함"
  })
  // 기타 요청사항
  const [ reqit, setReqit ] = useState([])

  useLayoutEffect(() => {
    getCommonCodeByRequestItem()
    .then(res => {
      console.log(res)
      setRequestList(res.data)
    })
  }, [])

  const handleRequestChange = props => event => {
    const checked = event.target.checked
    const value = event.target.value
    const name = event.target.name

    const request = {
      value: value,
      name: name
    }

    if (props === "RFOFZ") {
      request.name = `${requestList[props].code_typename}_${request.name}`

      setRfofz(request)
    } else if (props === "CTYPE") {
      request.name = `${requestList[props].code_typename}_${request.name}`

      setCtype(request)
    } else {
      setReqit(items => {
        if (checked) {
          items.push(request)
        } else {
          items.filter(item => item.value === request.value)
        }
        
        return items
      })
    }
  }

  const handleChangePage = () => {
    let requestName = [rfofz.name]
    let requestValue = [rfofz.value]

    if (ctype.value !== "") {
      requestName.push(ctype.name)
      requestValue.push(ctype.value)
    } 
    requestName.push(...reqit.map(e => e.name))
    requestValue.push(...reqit.map(e => e.value))

    dispatch(
      cargoSlice.actions.SET_REQUEST_6({
        requestItems: {
          value: requestValue.join("^"),
          name: requestName
        }
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
    <div className="step8">
      <div className="stepBox"><span className="badge">STEP 8</span> 요청사항</div>
      <div className="inBox">						
        <p className="inTit">운송요금</p>
        <div className="raBox ra1">
          <span className="radioBox mgr25"><input type="radio" name="request" id="request-1-1" /><label htmlFor="request-1-1">상차지 지불</label></span>
          <span className="radioBox"><input type="radio" name="request" id="request-1-2" /><label htmlFor="request-1-2">하차지 지불</label></span>
        </div>
        <p className="inTit">증빙발행</p>
        <div className="raBox ra2">
          <span className="radioBox mgr25"><input type="radio" name="request2" id="request-2-1" /><label htmlFor="request-2-1">세금계산서 발행</label></span>
          <span className="radioBox"><input type="radio" name="request2" id="request-2-2" /><label htmlFor="request-2-2">현금영수증 발행</label></span>
        </div>
        <p className="inTit">기사님 상하차 도움(추가요금발생)</p>
        <div className="raBox ra3">
          <span className="radioBox mgr25"><input type="radio" name="request3" id="request-3-1" /><label htmlFor="request-3-1">필요</label></span>
          <span className="radioBox"><input type="radio" name="request3" id="request-3-2" /><label htmlFor="request-3-2">불필요</label></span>
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

export default RequestItem;
