import React, { forwardRef, useState } from "react";
import { useSelector } from 'react-redux';

import DatePicker from "react-datepicker";
import { ko } from 'date-fns/esm/locale';
import "react-datepicker/dist/react-datepicker.css";

import { useAppDispatch } from 'src/store';
import cargoSlice from "src/slice/cargo";
import { 
  getToday, 
  formatHourAndMinutes, 
  formatDate, 
  formatStringToDateTime, 
  formatDateToDay, 
  compareDateAndDate,
} from "src/utils/dateUtil";

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
    <div className="dateBox">
      <input 
        className="amin mgr5"
        type="text"
        value={value}
        readOnly
        onChange={(e) => onChange(e.target.value)}
        inputMode="none"/>
      <button className="btn date" onClick={() => onClick()}></button>
    </div>
  )
})

const CustomArrivalDatePicker = forwardRef(({ value, onClick, onChange }, ref) => {
  
  return (
    <div className="dateBox">
      <input 
        className="pmin mgr5"
        type="text"
        value={value}
        readOnly
        onChange={(e) => onChange(e.target.value)}
        inputMode="none"/>
      <button className="btn date" onClick={() => onClick()}></button>
    </div>
  )
})

const DateTime = ({ inputRef }) => {
  const cargo = useSelector((state) => state.cargo)
  const dispatch = useAppDispatch()

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
    const departDateTime = `${formatDate(departDate)} ${departTime.h}:${departTime.m}`
    const arrivalDatetime = `${formatDate(arrivalDate)} ${arrivalTime.h}:${arrivalTime.m}`

    dispatch(
      cargoSlice.actions.STEP4({
        departDatetimes: departDateTime,
        arrivalDatetimes: arrivalDatetime
      })
    )

    inputRef.current.slickNext()
  }

  const handlePrevClick = () => {
    inputRef.current.slickPrev()
  }

  return (
    <div className="step4">
      <div className="stepBox"><span className="badge">STEP 4</span> ??????/?????? ?????? ??????</div>
      <div className="inBox">
        <p className="inTit">????????????</p>
        <div className="amBox">
          <DatePicker
            disabledKeyboardNavigation
            calendarClassName="top-datepicker"
            selected={departDate}
            dateFormat="yyyy??? MM??? dd???"
            dateFormatCalendar="yyyy??? MM???"
            showPopperArrow={false}
            onChange={(date) => handleDepartChange(date)}
            minDate={getToday()}
            locale={ko}
            popperPlacement="bottom"
            customInput={<CustomDepartDatePicker />}
            dayClassName={date =>
              formatDateToDay(date) === "???" ? "saturday"
            :
              formatDateToDay(date) === "???" ? "sunday" : undefined
            }
          />
          <div className="timeBox">
            <select className="sel a1" value={departTime.h} onChange={handleDepartTimeChange("h")}>
              {
                hour.map(h => (
                  <option key={h} value={h}>{h}</option> 
                ))
              }
            </select> ???
            <select className="sel a1 mgl10" value={departTime.m} onChange={handleDepartTimeChange("m")}>
              {
                min.map(m => (
                  <option key={m} value={m}>{m}</option> 
                ))
              }
            </select> ???
          </div>
        </div>
        <p className="inTit">????????????</p>
        <div className="pmBox">
          <DatePicker 
            disabledKeyboardNavigation
            calendarClassName="bottom-datepicker"
            selected={arrivalDate}
            dateFormat="yyyy??? MM??? dd???"
            dateFormatCalendar="yyyy??? MM???"
            showPopperArrow={false}
            onChange={date => handleArrivalChange(date)}
            locale={ko}
            popperPlacement="top"
            minDate={getToday()}
            customInput={<CustomArrivalDatePicker />}
            dayClassName={date =>
              formatDateToDay(date) === "???" ? "saturday"
            :
              formatDateToDay(date) === "???" ? "sunday" : undefined
            }
          />
          <div className="timeBox">
            <select className="sel a1" value={arrivalTime.h} onChange={handleArrivalTimeChange("h")}>
              {
                hour.map(h => (
                  <option key={h} value={h}>{h}</option> 
                ))
              }
            </select> ???
            <select className="sel a1 mgl10" value={arrivalTime.m} onChange={handleArrivalTimeChange("m")}>
              {
                min.map(m => (
                  <option key={m} value={m}>{m}</option> 
                ))
              }
            </select> ???
          </div>
        </div>
      </div>
      <div className="txtBox">
        ???????????? ????????? ?????????????????????????<br />
        ?????? ????????? ?????? ??? ???????????? ????????? ????????? ?????????.
      </div>	
      <div className="btnBox">
        <button className="btn off" onClick={() => handlePrevClick()}>??????</button>
        <button className="btn on" onClick={() => handleNextClick()}>??????</button>
      </div>
    </div>
  )
}

export default DateTime
