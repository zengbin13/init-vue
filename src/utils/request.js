import axios from "axios";
import config from "../config/index";

// 1.获取baseUrl
const baseUrl =
  process.env.NODE_ENV === "development"
    ? config.baseUrl.dev
    : config.baseUrl.pro;

// 2.创建请求实例

const service = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  headers: {},
});
// 3.请求响应拦截器
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
service.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default service;
