import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

import { useAppDispatch } from 'src/store';
import cargoSlice from "src/slice/cargo";

import {
  getCommonCodeByType
} from "src/api/code";

const LoadUnload = ({ inputRef }) => {
  const cargo = useSelector((state) => state.cargo)
  const dispatch = useAppDispatch()

  const [list, setList] = useState([])

  const loadApi = () => {
    const codeType = "LDULD";

    getCommonCodeByType(codeType)
    .then(res => {
      setList(res.data)
    })
    .then(() => {
      setLoad({
        value: cargo.loadMethod.value,
        name: cargo.loadMethod.name
      })
  
      setUnLoad({
        value: cargo.unloadMethod.value,
        name: cargo.unloadMethod.name
      })
    })
  }

  const [load, setLoad] = React.useState({
    value: "",
    name: "선택"
  })
  const [unload, setUnLoad] = React.useState({
    value: "",
    name: "선택"
  })

  useEffect(() => {
    loadApi()
  }, [])

  const handleLoadChange = (child) => {
    setLoad({
      value: child.props.value,
      name: child.props.children
    })
  }
  
  const handleUnLoadChange = (child) => {
    setUnLoad({
      value: child.props.value,
      name: child.props.children
    })
  }

  const handleChangePage = () => {
    dispatch(
      cargoSlice.actions.SET_REQUEST_5({
        loadMethod: { ...load },
        unloadMethod: { ...unload }
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
    <div className="step7">
      <div className="stepBox"><span className="badge">STEP 7</span> 상/하차 방법</div>
      <div className="inBox">
        
        <p className="inTit">상차방법</p>
        <select className="sel a1 mgb15">
          {
            list.map(obj => (
              <option key={obj.cdid} value={obj.cdid}>{obj.codeName}</option>
            ))
          }
        </select>

        <p className="inTit">하차방법</p>
        <select className="sel a1">
          {
            list.map(obj => (
              <option key={obj.cdid} value={obj.cdid}>{obj.codeName}</option>
            ))
          }
        </select>
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

export default LoadUnload;
