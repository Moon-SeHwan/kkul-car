import axios from "axios";
const geocodingUrl =
  "/map-geocode/v2/geocode";

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
