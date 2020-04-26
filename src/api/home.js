// import axios from "./axios";
// export function getBannerData() {
//   return axios.requset({
//     url: "/banner",
//     method: "get",
//   });
// }

import requset from "../utils/request";

export function getBannerData() {
  return requset({
    url: "/banner",
    method: "get",
  });
}

export function getUserData() {
  return requset({
    url: "/user",
    method: "get",
  });
}
