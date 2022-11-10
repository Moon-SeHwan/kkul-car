import request from "src/request";

/**
 * 
 * @param {*} start 출발지 "lon(경도), lat(위도)"
 * @param {*} goal 목적지 "lon(경도), lat(위도)"
 * @param {*} options 탐색옵션(기본값 traoptimal)
 * @returns 
 */
export const driving = async (start, goal, options) => {

  const res = await request({
    url: `${process.env.REACT_APP_BASE_URL_LOCAL}/api/naver/driving?start=${start}&goal=${goal}&option=${options}`,
    method: "get"
  })

  const data = res.data.route.traoptimal[0].summary

  return data
}

export const geocoding = async (query) => {
  const res = await request({
    url: `${process.env.REACT_APP_BASE_URL_LOCAL}/api/naver/geocode?query=${query}`,
    method: "get"
  })

  const data = res.data
  
  if (data.addresses.length > 1) {
    console.log(`${query}에는 여러개의 주소가 존재합니다.`);
  } else if (data.addresses.length === 0) {
    console.log(`${query}에 해당되는 좌표가 없어요.`);
    return [-1, -1];
  }

  let buildingName
  let jibun
  let road

  data.addresses[0].addressElements.forEach(e => {
    if (e.types.includes("BUILDING_NAME")) {
      buildingName = e.longName
      jibun = data.addresses[0].jibunAddress.replace(e.longName, "").replace(e.shortName, "").trim()
      road = data.addresses[0].roadAddress.replace(e.longName, "").replace(e.shortName, "").trim()
    }
  })

  return {
    jibun: jibun,
    road: road,
    building: buildingName,
    lat: data.addresses[0].y,
    lon: data.addresses[0].x,
  }
}


/*
export async function geocoding(query) {
  const coord = await axios
    .get(`${geocodingUrl}`, {
      params: {
        query,
      },
      headers: {
        "X-NCP-APIGW-API-KEY-ID": "205xj64cr0",
        "X-NCP-APIGW-API-KEY": "fKCrRKmTNrI3JWOYjzOITzkWpqb97mO3XutBDa9n",
      },
    })
    .then((res) => {
      // TODO: check if response is ok
      console.log(res.data);
      return res.data;
    })
    .then((data) => {
      if (data.addresses.length > 1) {
        console.log(`${query}에는 여러개의 주소가 존재합니다.`);
      } else if (data.addresses.length === 0) {
        console.log(`${query}에 해당되는 좌표가 없어요.`);
        return [-1, -1];
      }
      return [data.addresses[0].x, data.addresses[0].y];
    });

  return coord;
}
*/