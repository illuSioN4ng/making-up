## 微信小程序-凑单神器
### 背景
&emsp;为了解决电商的一些活动门槛（如：满额减、满额起送等）达不到，而导致的购物难问题，改善高校同学得凑单体验。
### 项目框架
&emsp;前端选择是微信小程序，后端是[leanCloud](https://leancloud.cn/)。
### 踩到的坑
1. 调用`wx.chooseImage(OBJECT)`获取本地图片地址，直接更新data,刷新页面，页面中的图片显示空白。
&emsp;&emsp;解决方案：选择图片之后先上传leanCloud，返回云地址，在写入data即可。
2. image标签没有事件绑定（暂时不知道怎么去做图片点击放大功能，有文章分享称微信小程序image是基于background-image做的，摊手┑(￣Д ￣)┍）
&emsp;&emsp;开始想要用`scroll-view`做，不过和预想的效果完全不一样，无奈。
3. bind/catch的区别（bind事件绑定不会阻止冒泡事件向上冒泡，catch事件绑定可以阻止冒泡事件向上冒泡。）
4. 页面data的获取：`this.data`即可，注意（this对象的指向）
5. wx.redirectTo(OBJECT) bug 返回首页tabBar不显示