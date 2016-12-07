// pages/privilege-detail/privilege-detail.js
const AV = require('../../libs/av-weapp.js');
Page({
  data:{
    discount:{}
  },
  onLoad:function(option){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    let discount = new AV.Query('discount');
    discount.equalTo('disId', option.id);
    discount.find().then(function (results) {
      that.setData({
        discount: results[0].attributes
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
  makeOrder:function(){
    wx.navigateTo({
      url: '../post/post'
    })
  }
})