import React, { forwardRef, useState } from "react";
import { useSelector } from 'react-redux';

import DatePicker from "react-datepicker";
import { ko } from 'date-fns/esm/locale';
import "react-datepicker/dist/react-datepicker.css";

import { useSearchParams, useNavigate } from "react-router-dom";

import { useAppDispatch } from 'src/store';
import cargoSlice from "src/slice/cargo";

const hour = [
  "01", "02", "03", "04",
  "05", "06", "07", "08",
  "09", "10", "11", "12",
]

const CustomDepartDatePicker = forwardRef(({ value, onClick, onChange }, ref) => {

  return (
    <div className="dateBox" ref={ref}>
      <input 
        className="amin"
        type="text"
        value={value}
        ref={ref}
        onChange={(e) => onChange(e.target.value)}
        onClick={onClick} 
        placeholder="도착일" 
        inputMode="none"/>
      <button className="btn date" onClick={() => onClick()}></button>
    </div>
  )
})

const CustomArrivalDatePicker = forwardRef(({ value, onClick, onChange }, ref) => {

  return (
    <div className="dateBox" ref={ref}>
      <input 
        className="pmin"
        type="text"
        value={value}
        ref={ref}
        onChange={(e) => onChange(e.target.value)}
        onClick={onClick} 
        placeholder="도착일" 
        inputMode="none"/>
      <button className="btn date" onClick={() => onClick()}></button>
    </div>
  )
})

const DateTime = ({ inputRef }) => {
  const cargo = useSelector((state) => state.cargo)
  const dispatch = useAppDispatch()
  const [ params ] = useSearchParams()
  const navigate = useNavigate()

  const [depart, setDepart] = useState(cargo.departDatetimes.replace(" ", "T"))
  const [arrival, setArrival] = useState(cargo.arrivalDatetimes.replace(" ", "T"))
  const [departDate, setDepartDate] = useState(new Date())
  const [arrivalDate, setArrivalDate] = useState(new Date())

  const handleDepartChange = (event) => {
    console.log(depart)
    setDepart(event.target.value)
  }

  const handleArrivalChange = (event) => {
    console.log(arrival)
    setArrival(event.target.value)
  };

  const handleChangePage = () => {
    dispatch(
      cargoSlice.actions.SET_REQUEST_3({
        departDatetimes: depart.replace("T", " "),
        arrivalDatetimes: arrival.replace("T", " ")
      })
    )

    navigate(`/ShipperRequire?stepIndex=${params.get("stepIndex")}`)
  }

  const handleNextClick = () => {
    inputRef.current.slickNext()
  }

  const handlePrevClick = () => {
    inputRef.current.slickPrev()
  }

  return (
    <div className="step5">
      <div className="stepBox"><span className="badge">STEP 5</span> 출발/도착 시간 입력</div>
      <div className="inBox">
        <div className="amBox">
          <DatePicker 
            selected={departDate}
            dateFormat="yyyy년 MM월 dd일"
            dateFormatCalendar="yyyy년 MM월"
            onChange={date => setDepartDate(date)}
            locale={ko}
            customInput={<CustomDepartDatePicker inputValue={departDate} />}
          />
          <div className="timeBox">
            <p className="inTit">출발시각</p>
            <select className="sel a1">
              <option value="am">오전</option>
              <option value="pm">오후</option>
            </select>
            <select className="sel a1">
              {
                hour.map(h => {
                  <option key={h} value={h}>h</option> 
                })
              }
            </select> 시
            <select className="sel a1 mgl10">
              <option value="00">00</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select> 분
          </div>
        </div>
        <div className="pmBox">
          <DatePicker 
            selected={arrivalDate}
            dateFormat="yyyy년 MM월 dd일"
            dateFormatCalendar="yyyy년 MM월"
            onChange={date => setArrivalDate(date)}
            locale={ko}
            customInput={<CustomArrivalDatePicker inputValue={arrivalDate} />}
          />
          <div className="timeBox">
            <p className="inTit">도착시각</p>
            <select className="sel a1">
              <option value="am">오전</option>
              <option value="pm">오후</option>
            </select>
            <select className="sel a1">
              {
                hour.map(h => {
                  <option key={h} value={h}>h</option> 
                })
              }
            </select> 시
            <select className="sel a1 mgl10">
              <option value="00">00</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select> 분
          </div>
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

export default DateTime
