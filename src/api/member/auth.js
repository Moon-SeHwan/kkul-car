import request from "src/request";

const AUTH_URL = "/auth"
const API_URL = "/api"

export const initNaverLogin = () => {
  return request({
    url: `${API_URL}/naver`,
    method: "post"
  })
}

export const getNaverAccessToken = (code, state) => {
  return request({
    url: `${API_URL}/naver/callback?code=${code}&state=${state}`,
    method: "get"
  })
}

export const initKaKaoLogin = () => {
  return request({
    url: `${API_URL}/kakao`,
    method: "post"
  })
}

export const getKaKaoAccessToken = (code) => {
  return request({
    url: `${API_URL}/kakao/callback?code=${code}`,
    method: "get"
  })
}

export const adminLogin = (email, password) => {
  const data = {
    id: email,
    password: password
  }

  return request({
    url: `${AUTH_URL}/admin`,
    method: "post",
    data: data
  })
}