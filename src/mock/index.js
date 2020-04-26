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
