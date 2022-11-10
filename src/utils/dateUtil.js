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