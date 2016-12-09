// pages/detail/detail.js
//获取应用实例
var app = getApp();
//查询用户信息
const AV = require('../../libs/av-weapp.js');
var author,
    title = '',
    content = '',
    description = '',
    pictures = [],
    activityURL = "",
    discountId = '';

Page({
  data:{
      pictures: []
  },
  onLoad:function(options){
      console.log(options)
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      author = userInfo;
      console.log(author);
      discountId = options.disId;
    });
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  titleEventFunc: function(e) {
      if(e.detail && e.detail.value) {
          title = e.detail.value;
      }
  },
  contentEventFunc: function(e) {
      if(e.detail && e.detail.value) {
          content = e.detail.value;
          console.log(content);
      }
  },
  descriptionEventFunc: function(e) {
      if(e.detail && e.detail.value) {
          description = e.detail.value;
          console.log(description);
      }
  },
  activityUrlEventFunc: function(e) {
      if(e.detail && e.detail.value) {
          activityURL = e.detail.value;
          console.log(description);
      }
  },
  formSubmit: function(e) {
      console.log(title);
      console.log(content);
      console.log(description);
      console.log(pictures);
      console.log(activityURL);
      if(title === '') {
          wx.showToast({
            title: '标题为空',
            duration: 2000
          });
          return false;
      }else if(content === ''){
          wx.showToast({
            title: '内容为空',
            duration: 2000
          });
          return false;
      }else if(description === ''){
          wx.showToast({
            title: '优惠形式为空',
            duration: 2000
          });
          return false;
      }else if(pictures.length === 0){
           wx.showToast({
            title: '图片信息为空',
            duration: 2000
          });
          return false;
      }else {

          var orderObj = AV.Object.extend('orders'),
            order = new orderObj();
          order.set('title', title);
          order.set('content', content);
          order.set('description', description);
          order.set('url', activityURL);
          order.set('author', author);
          order.set('pictures', pictures);
          order.set('discountId', discountId);

          order.save().then(function (order) {
            // 成功保存之后，执行其他逻辑.
            console.log(order);
            wx.navigateTo({
                url: '../index/index'
            })
          }, function (error) {
            // 异常处理
            console.log(error);
          });
      }
      console.log(e);
      console.log(e.detail.value);
  },  
  chooseImage: function() {
      //上传图片相关
      var that = this;
      wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              let tempFilePaths = res.tempFilePaths;
              console.log(tempFilePaths);
              tempFilePaths.forEach(function(url, index){
                //   pictures.push(url);
                //   that.setData({
                //       pictures: pictures
                //   });
                let strRegex = "(.jpg|.png|.gif|.jpeg)$"; //用于验证图片扩展名的正则表达式
                let re=new RegExp(strRegex);
                if (re.test(url.toLowerCase())){
                    let name = '' + index + '.' + url.split('.')[url.split('.').length - 1],
                        localFile = url,
                        image = new AV.File(name, {
                            blob: {  
                                uri: localFile,  
                            }
                        });
                        console.log(name);
                        image.save().then(function(file) {
                            // 文件保存成功
                            console.log(file.url());
                            console.log(file.url());
                            pictures.push(file.url());
                            that.setData({
                            pictures: pictures
                            });
                        }, function(error) {
                            // 异常处理
                            console.error(error);
                        }); 
                }else {
                    throw "选择的不是图片";
                }
               
              });
          }
      });
  }
})