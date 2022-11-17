import axios from "axios";
import store from "src/store";
import { persistor } from "src/index"; 

const HOST_NAME = window.location.hostname

let API_BASE_URL = ""

if (HOST_NAME === "localhost" || HOST_NAME === "127.0.0.1") {
  API_BASE_URL = process.env.REACT_APP_BASE_URL_LOCAL
} else if (HOST_NAME === "192.168.0.113") {
  API_BASE_URL = process.env.REACT_APP_BASE_URL_DEV
}

const request = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: { "Cache-Control": "no-cache" }
});

request.interceptors.request.use(config => {
  const TOKEN = store.getState().token

  config = {
    ...config,
    headers: {
      "Authorization": `Bearer ${TOKEN.accessToken}`
    },
  }
  
  return config;
}, error => {
  return Promise.reject(error)
})

request.interceptors.response.use(response => {
  if (response.status === 403) {
    return {
      data: undefined,
      code: "JwtExpiredException",
      describe: "JwtExpiredException"
    }
  }
  return response;
}, error => {
  console.log(error)
  if (!error.response) {
    return {
      data: undefined,
      code: "NetWorkError",
      describe: "NetWorkError"
    }
  } else {
    if (error.code === "ERR_NETWORK") {
      return {
        data: undefined,
        code: "AxiosError",
        describe: "AxiosError"
      }
    }
  
    if (error.request.status === 403) {
      persistor.purge()
      .then(() => {
        window.location.href = "/"
        alert("로그인 시간이 만료되었습니다.")
      })
    } 

    return error;
  }
})

export default request
