// pages/detail/detail.js
//获取应用实例
var app = getApp();
//查询用户信息
const AV = require('../../libs/av-weapp.js');

var pictures = [];

Page({
  data:{
      pictures: [],
      QRCode: '',
      author: {},
      title: '',
      content: '',
      description: '',
      activityURL: '',
      discountId: ''
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.data.pictures = [];//防止缓存影响
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.data.author = userInfo;
      that.data.discountId = options.disId;
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
          this.data.title = e.detail.value;
      }
  },
  contentEventFunc: function(e) {
      if(e.detail && e.detail.value) {
          this.data.content = e.detail.value;
      }
  },
  descriptionEventFunc: function(e) {
      if(e.detail && e.detail.value) {
          this.data.description = e.detail.value;
      }
  },
  activityUrlEventFunc: function(e) {
      if(e.detail && e.detail.value) {
          this.data.activityURL = e.detail.value;
      }
  },
  formSubmit: function(e) {
      if(this.data.title === '') {
          wx.showToast({
            title: '标题为空',
            duration: 2000
          });
          return false;
      }else if(this.data.content === ''){
          wx.showToast({
            title: '内容为空',
            duration: 2000
          });
          return false;
      }else if(this.data.description === ''){
          wx.showToast({
            title: '优惠形式为空',
            duration: 2000
          });
          return false;
      }else if(this.data.QRCode === ''){
           wx.showToast({
            title: '群二维码为空',
            duration: 2000
          });
          return false;
      }else if(this.data.pictures.length === 0){
           wx.showToast({
            title: '图片信息为空',
            duration: 2000
          });
          return false;
      }else {

          var orderObj = AV.Object.extend('orders'),
            order = new orderObj();
          order.set('title', this.data.title);
          order.set('content', this.data.content);
          order.set('description', this.data.description);
          order.set('url', this.data.activityURL);
          order.set('author', this.data.author);
          order.set('pictures', this.data.pictures);
          order.set('discountId', this.data.discountId);
          order.set('QRCode', this.data.QRCode);

          order.save().then(function (order) {
            // 成功保存之后，执行其他逻辑.
            wx.navigateTo({
                url: '../index/index'
            })
          }, function (error) {
            // 异常处理
            console.log(error);
          });
      }
  },  
  chooseQRCode: function() {
      //上传图片相关
      var that = this;
      wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              let tempFilePaths = res.tempFilePaths;
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
                        image.save().then(function(file) {
                            // 文件保存成功
                            console.log(file);
                            that.setData({
                                QRCode: file.url()
                            });
                            console.log(this.data.QRCode);
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
                        image.save().then(function(file) {
                            // 文件保存成功
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