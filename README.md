## vue项目——企业级构建



### 1. 项目创建

1. 安装Node环境 Vue脚手架

2. 创建项目 `vue create demo-name`

   ​	<img src="C:\Users\yu13\AppData\Roaming\Typora\typora-user-images\1587889106148.png" alt="1587889106148" style="zoom:50%;" />

### 2. axios封装——请求响应劫持

1. 安装axios

   ```shell
   npm install axios
   ```

2. 全局配置——baseUrl

   `config/index.js`

   ```js
   // 全局配置
   export default {
     title: "demo-name",
     baseUrl: {
       dev: "http://localhost:3000", //开发时，接口地址
       pro: "" //上线时，接口地址
     }
   }
   ```

3. 请求对象的封装

   `api/axios.js`

   ```js
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
   
   ```

   `utils/request.js`

   ```js
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
       return response;
     },
     (error) => {
       Promise.reject(error);
     }
   );
   
   export default service;
   
   ```

4. 页面级别的api

   ```js
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
   ```

   

### 3. 解决跨域——代理服务器

- 生产模式——后端允许跨域 

  ```js
  app.use((req, res, next) => {
    res.append("Access-Control-Allow-Origin", "*");
    res.append("Access-Control-Allow-headers", "*");
    next();
  });
  ```

- 开发模式——使用代理服务器

  `config/index.js`

  ```js
  // 全局配置
  export default {
    title: "demo-name",
    baseUrl: {
      dev: "/api/", //开发时，接口地址
      pro: "" //上线时，接口地址
    }
  }
  ```

  `vue.config.js`

  ```js
  module.exports = {
    devServer: {
      proxy: {
        "/api": {
          target: "http://localhost:3000/",
          changeOrigin: true,
          pathRewrite: {
            "^/api": "",
          },
        },
      },
    },
  };
  ```

### 4.模拟后台数据——mockjs

```
npm install mockjs
```

`main.js`

```js
if (process.env.NODE_ENV === "development") {
  require("./mock/index"); //import只能位于顶部区域
}
```

`mock/index.js`

```js
import Mock from "mockjs";

// 配置请求延时
Mock.setup({
  timeout: "1000",
});

Mock.mock("/api/user", {
  username: "xiaoyu",
  age: 18,
});

export default Mock;
```

### 5.页面REM布局

`utils/setRem.js`

```js
//设计稿1rem=100px 设计稿宽度为750px 即为7.5rem
const baseSize = 100;
const designWidth = 750;
function setRem() {
  //1.获取浏览器屏幕宽度
  const htmlWidth =
    document.documentElement.clientWidth || document.body.clientWidth;
  //2.计算缩放比例 屏幕宽度 / 设计稿宽度
  const scale = htmlWidth / designWidth;
  //3.设置根元素字体大小
  document.querySelector("html").style.fontSize = baseSize * scale + "px";
}

//初始化
setRem();
//监听改变
window.addEventListener("resize", () => {
  setRem();
});

```



### 附录：

#### 目录结构

```
src                               源码目录
|-- api                              所有api接口
|-- assets                           静态资源，images, icons, styles等
|-- components                       公用组件
|-- config                           配置信息
|-- constants                        常量信息，项目所有Enum, 全局常量等
|-- directives                       自定义指令
|-- filters                          过滤器，全局工具
|-- datas                            模拟数据，临时存放
|-- lib                              外部引用的插件存放及修改文件
|-- mock                             模拟接口，临时存放
|-- plugins                          插件，全局使用
|-- router                           路由，统一管理
|-- store                            vuex, 统一管理
|-- themes                           自定义样式主题
|-- views                            视图目录
|   |-- role                             role模块名
|   |-- |-- role-list.vue                    role列表页面
|   |-- |-- role-add.vue                     role新建页面
|   |-- |-- role-update.vue                  role更新页面
|   |-- |-- index.less                      role模块样式
|   |-- |-- components                      role模块通用组件文件夹
|   |-- employee                         employee模块
```

