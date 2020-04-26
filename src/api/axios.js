import axios from "axios";
import config from "../config/index";

// 判断是否为开发环境
const baseUrl =
  process.env.NODE_ENV === "development" ? config.baseUrl.dev : dev.baseUrl.pro;

class HttpRquset {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.queue = {}; //请求队列
  }
  //请求内部配置
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      header: {},
    };
    return config;
  }
  //请求拦截器
  interceptors(instance, url) {
    instance.interceptors.request.use(
      (config) => {
        // 处理请求配置
        return config;
      },
      (error) => {
        //请求出错
        console.log(error);
      }
    );
    instance.interceptors.response.use(
      (response) => {
        // 处理响应数据
        return response;
      },
      (error) => {
        //请求出错
        console.log("error:", error);
      }
    );
  }
  //请求实例
  requset(options) {
    // 1. 创建请求实例对象
    const instance = axios.create();
    // 2.构建请求参数 内部配置 + 外部配置options
    options = Object.assign(this.getInsideConfig(), options);
    // 3.请求响应劫持
    this.interceptors(instance, options.url);
    return instance(options);
  }
}

const axiosObj = new HttpRquset(baseUrl);
export default axiosObj;
