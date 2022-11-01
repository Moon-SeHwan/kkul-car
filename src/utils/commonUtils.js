export const nowDateTime = () => {
  return new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ").replace(/\..*/, '');
}

export const formatTimeStamp = (dateString) => {
  const date = new Date(dateString)

  date.setHours(date.getHours() + 9)

  const formatDate = date.toISOString().replace("T", " ")

  return `${formatDate.substring(0, 4)}년${formatDate.substring(5, 7)}월${formatDate.substring(8, 10)}일 ${formatDate.substring(11, 19)}`
}

//  param : datetime, return yyyy-mm-dd fommat
export const formatDate = (dateString) => {
  const date = new Date(dateString);

  const monthNames = [
    "01", "02", "03", "04"
    , "05", "06", "07", "08"
    , "09", "10", "11", "12"
  ];

  const year = date.getFullYear();
  const monthIndex = date.getMonth();
  const day = date.getDate() >= 10 ? date.getDate() : '0'+date.getDate() ;

  return year + '-' + monthNames[monthIndex] + '-' + day
}

//  param : datetime, return yyyy-mm-dd hh:mi24
export const formatDateTime = (dateTimeString) => {
const date = new Date(dateTimeString);

const monthNames = [
  "01", "02", "03", "04"
  , "05", "06", "07", "08"
  , "09", "10", "11", "12"
];

const year = date.getFullYear();
const monthIndex = date.getMonth();
const day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate() ;

//분 변경(한 자리 수의 분 표시)
return year + '-' + monthNames[monthIndex] + '-' + day + ' ' + date.getHours() + ':' + ('0'+date.getMinutes()).slice(-2); 
}  

//  param : yyyymmdd, return yyyy-mm-dd fommat
export const formatDateByString = (dateString) => {
return dateString.substring(0,4) + '-' + dateString.substring(4,6) + '-' +  dateString.substring(6,8)
}  