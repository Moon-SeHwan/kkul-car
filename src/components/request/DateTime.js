import React, { forwardRef, useState, useRef } from "react";
import { useSelector } from 'react-redux';

import DatePicker from "react-datepicker";
import { ko } from 'date-fns/esm/locale';
import "react-datepicker/dist/react-datepicker.css";

import { useAppDispatch } from 'src/store';
import cargoSlice from "src/slice/cargo";
import { getToday, formatHourAndMinutes, formatDate, formatStringToDateTime } from "src/utils/dateUtil";

const hour = [
  "00", "01", "02", "03", 
  "04", "05", "06", "07", 
  "08", "09", "10", "11", 
  "12", "13", "14", "15", 
  "16", "17", "18", "19", 
  "20", "21", "22", "23", 
]

const min = [
  "00", "10", "20", "30", "40", "50"
]

const CustomDepartDatePicker = forwardRef(({ value, onClick, onChange }, ref) => {

  return (
    <div className="dateBox" ref={ref}>
      <input 
        className="amin mgr5"
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
        className="pmin mgr5"
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

  const departRef = useRef()
  const arrivalRef = useRef()
  const [departDate, setDepartDate] = useState(cargo.departDatetimes === "" ? new Date() : new Date(formatStringToDateTime(cargo.departDatetimes)))
  const [departTime, setDepartTime] = useState(formatHourAndMinutes(cargo.departDatetimes) || { h: "01", m: "00" })
  const [arrivalDate, setArrivalDate] = useState(cargo.arrivalDatetimes === "" ? new Date() : new Date(formatStringToDateTime(cargo.arrivalDatetimes)))
  const [arrivalTime, setArrivalTime] = useState(formatHourAndMinutes(cargo.arrivalDatetimes) || { h: "01", m: "00" })

  const handleDepartChange = (date) => {
    setDepartDate(date)
  }

  const handleArrivalChange = (date) => {
    setArrivalDate(date)
  }

  const handleDepartTimeChange = (prop) => (e) => {
    setDepartTime({ ...departTime, [prop]: e.target.value })
  }

  const handleArrivalTimeChange = (prop) => (e) => {
    setArrivalTime({ ...arrivalTime, [prop]: e.target.value })
  }

  const handleNextClick = () => {
    dispatch(
      cargoSlice.actions.STEP5({
        departDatetimes: `${formatDate(departDate)} ${departTime.h}:${departTime.m}`,
        arrivalDatetimes: `${formatDate(arrivalDate)} ${arrivalTime.h}:${arrivalTime.m}`
      })
    )

    inputRef.current.slickNext()
  }

  const handlePrevClick = () => {
    inputRef.current.slickPrev()
  }

  // 요일 반환
  const getDayName = (date) => {
    return date.toLocaleDateString('ko-KR', {
      weekday: 'long',
    }).substr(0, 1);
  }
  
  // 날짜 비교시 년 월 일까지만 비교하게끔
  const createDate = (date) => {
    return new Date(new Date(date.getFullYear()
      , date.getMonth()
      , date.getDate()
      , 0
      , 0
      , 0));
  }

  return (
    <div className="step5">
      <div className="stepBox"><span className="badge">STEP 5</span> 출발/도착 시간 입력</div>
      <div className="inBox">
        <p className="inTit">출발시각</p>
        <div className="amBox ">
          <DatePicker
            selected={departDate}
            dateFormat="yyyy년 MM월 dd일"
            dateFormatCalendar="yyyy년 MM월"
            showPopperArrow={false}
            onChange={(date) => handleDepartChange(date)}
            minDate={new Date()}
            locale={ko}
            popperPlacement="bottom"
            customInput={<CustomDepartDatePicker inputValue={departDate} />}
            dayClassName={date =>
              getDayName(createDate(date)) === '토' ? "saturday"
            :
              getDayName(createDate(date)) === '일' ? "sunday" : undefined
            }
          />
          <div className="timeBox">
            <select className="sel a1" ref={departRef} value={departTime.h} onChange={handleDepartTimeChange("h")}>
              {
                hour.map(h => (
                  <option key={h} value={h}>{h}</option> 
                ))
              }
            </select> 시
            <select className="sel a1 mgl10" value={departTime.m} onChange={handleDepartTimeChange("m")}>
              {
                min.map(m => (
                  <option key={m} value={m}>{m}</option> 
                ))
              }
            </select> 분
          </div>
        </div>
        <p className="inTit">도착시각</p>
        <div className="pmBox">
          <DatePicker 
            selected={arrivalDate}
            dateFormat="yyyy년 MM월 dd일"
            dateFormatCalendar="yyyy년 MM월"
            showPopperArrow={false}
            onChange={date => handleArrivalChange(date)}
            locale={ko}
            popperPlacement="top"
            minDate={getToday()}
            customInput={<CustomArrivalDatePicker inputValue={arrivalDate} />}
            dayClassName={date =>
              getDayName(createDate(date)) === '토' ? "saturday"
            :
              getDayName(createDate(date)) === '일' ? "sunday" : undefined
            }
          />
          <div className="timeBox">
            <select 
              ref={arrivalRef}
              className="sel a1" 
              value={arrivalTime.h}
              onChange={handleArrivalTimeChange("h")}>
              {
                hour.map(h => (
                  <option key={h} value={h}>{h}</option> 
                ))
              }
            </select> 시
            <select className="sel a1 mgl10" value={arrivalTime.m} onChange={handleArrivalTimeChange("m")}>
              {
                min.map(m => (
                  <option key={m} value={m}>{m}</option> 
                ))
              }
            </select> 분
          </div>
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

export default DateTime
