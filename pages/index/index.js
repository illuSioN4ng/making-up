//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo, rawData, signature, encryptedData){
      //更新数据
      console.log(userInfo, rawData, signature, encryptedData);
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
