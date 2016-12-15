//获取应用实例
var app = getApp();
//查询用户信息
const AV = require('../../libs/av-weapp.js');
var phone = '',
    name = '',
    school = '',
    num = '',
    pictures = [];
Page({
  data:{
    pictures: []
  },
  onLoad:function(options){
      pictures = [];
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      });
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
  phoneEventFunc: function(e) {
      if(e.detail && e.detail.value) {
          phone = e.detail.value;
      }
  },
  nameEventFunc: function(e) {
      if(e.detail && e.detail.value) {
          name = e.detail.value;
      }
  },
  schoolEventFunc: function(e) {
      if(e.detail && e.detail.value) {
          school = e.detail.value;
      }
  },
  numberEventFunc: function(e) {
      if(e.detail && e.detail.value) {
          num = e.detail.value;
      }
  },
  formSubmit: function(e) {
      if(phone === '') {
          wx.showToast({
            title: '电话为空',
            duration: 2000
          });
          return false;
      }else if(name === ''){
          wx.showToast({
            title: '姓名为空',
            duration: 2000
          });
          return false;
      }else if(school === ''){
          wx.showToast({
            title: '所在学校为空',
            duration: 2000
          });
          return false;
      }else if(num === 0){
           wx.showToast({
            title: '学号/教职工编号为空',
            duration: 2000
          });
          return false;
      }else if(pictures.length === 0){
           wx.showToast({
            title: '图片为空',
            duration: 2000
          });
          return false;
      }else {

          var identity = AV.Object.extend('identity'),
          ident = new identity();
          ident.set('phone', phone);
          ident.set('name', name);
          ident.set('school', school);
          ident.set('num', num);
          ident.set('pictures', pictures);

          ident.save().then(function (ident) {
            // 成功保存之后，执行其他逻辑.
            wx.navigateBack();
            // wx.navigateTo({
            //     url: '../index/index'
            // });
          }, function (error) {
            // 异常处理
            console.log(error);
          });
      }
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
                            pictures = [];
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