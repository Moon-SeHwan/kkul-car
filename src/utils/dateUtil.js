import moment from "moment";
import "moment-timezone";
import "moment/locale/ko";

export const getToday = () => {
  return moment().toDate()
}

export const formatHourAndMinutes = (dateString) => {
  if (dateString === null || dateString === undefined || dateString === "") return undefined

  dateString = moment(dateString, "YYYY-MM-DD HH:mm").format("HH:mm")

  const res = dateString.split(":")

  return {
    h: res[0] || undefined,
    m: res[1] || undefined,
  }
}

// YYYY-MM-DD HH:mm -> return YYYY-MM-DD
export const formatStringToDateTime = (dateString) => {
  if (dateString === null || dateString === undefined || dateString === "") return null

  return dateString = moment(dateString, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD")
}

// return korean time
export const formatDateTimeToKorea = (dateString) => {
  dateString = moment(dateString).tz("Asia/Seoul").format("YYYY-MM-DD HH:mm")

  return dateString
}

// return YYYY-MM-DD
export const formatDate = (dateString) => {
  if (dateString === null || dateString === undefined || dateString === "") return ""

  dateString = moment(dateString).format("YYYY-MM-DD")

  return dateString
}

export const formatDateToString = (dateString) => {
  if (dateString === null || dateString === undefined || dateString === "") return ""

  dateString = moment(dateString, "YYYY-MM-DD HH:mm")

  return dateString
}

export const formatDateToDay = (dateString) => {
  const day = ["일", "월", "화", "수", "목", "금", "토"]
  return day[moment(dateString).day()]
}

// STEP3 출발시간 vs 도착시간 비교 위한 함수
export const compareDateAndDate = (depart, arrival) => {
  if (depart === null || depart === undefined || depart.trim() === "") return false
  if (arrival === null || arrival === undefined || arrival.trim() === "") return false

  depart = moment(depart, "YYYY-MM-DD HH:mm")
  arrival = moment(arrival, "YYYY-MM-DD HH:mm")

  if (depart.diff(arrival) / 600000 < 0) return true
  else return false
}