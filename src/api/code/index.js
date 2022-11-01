import request from "src/request";

const BASE_URL = "/common"

export function getCommonCode() {
  return request({
    url: `${BASE_URL}/code`,
    method: "get"
  })
}

export function getCommonCodeByType(codeType) {
  return request({
    url: `${BASE_URL}/code/${codeType}`,
    method: "get"
  })
}

export function getCommonCodeByRequestItem() {
  return request({
    url: `${BASE_URL}/code/request-item`,
    method: "get"
  })
}