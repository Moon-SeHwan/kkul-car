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
    url: `${BASE_URL}/requestByStat?ownerUid=${param.ownerUid}&status=${param.status}`,
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
    url: `${BASE_URL}/request/hist/${reqId}`,
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

export function updateStatus(obj) {
  return request({
    url: `${BASE_URL}/status`,
    method: "post",
    params: {
      status:obj.status,
      reqId: obj.reqId
    }
  })
}

export function updateAddFare(obj) {
  return request({
    url: `${BASE_URL}/request/addFare`,
    method: "post",
    data: obj
  })
}