import request from "src/request";

const BASE_URL = "/cargo"

export function setRequest(data) {
  return request({
    url: `${BASE_URL}/request`,
    method: "post",
    data: data
  })
}

export function getRequestList(ownerUid) {
  return request({
    url: `${BASE_URL}/request/${ownerUid}`,
    method: "get"
  })
}

export function searchAddress(query) {
  return request({
    url: `${BASE_URL}/address?query=${query}`,
    method: "get"
  })
}

export function getRequestListByStatus(param) {
  return request({
    url: `${BASE_URL}/request/status/${param.ownerUid}?status=${param.status}`,
    method: "get"
  })
}

export function getRequestDetail(reqId) {
  return request({
    url: `${BASE_URL}/request/detail/${reqId}`,
    method: "get"
  })
}

export function getRequestHist(reqId) {
  return request({
    url: `${BASE_URL}/request/history/${reqId}`,
    method: "get"
  })
}

export function getRequestFare(dto) {
  return request({
    url: `${BASE_URL}/request/fare`,
    method: "get",
    params: dto
  })
}

export function cancelRequest(reqId) {
  return request({
    url: `${BASE_URL}/cancel/${reqId}`,
    method: "put",
  })
}

export function updateAdditionalFare(obj) {
  return request({
    url: `${BASE_URL}/request/additional-fare`,
    method: "post",
    data: obj
  })
}