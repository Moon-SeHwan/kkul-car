import request from "src/request";

const BASE_URL = "/customer/terms"

export const searchTerms = (param) => {
  return request({
    url: `${BASE_URL}/termstype?termsType=${param.termsType}&expDiv=${param.expDiv}&useYn=Y`,
    method: "get"
  })
}
