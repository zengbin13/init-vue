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
