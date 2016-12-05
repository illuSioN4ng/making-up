//index.js
//获取应用实例
var app = getApp();
//查询用户信息
const AV = require('../../libs/av-weapp.js');
var orderFormat = require('../../utils/orderFormat.js');
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    orders: []
  },
  //事件处理函数
  navToPost: function() {
    wx.navigateTo({
      url: '../post/post'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      console.log(userInfo);
      that.setData({
        userInfo:userInfo
      });
    });

// 修改对象
  // var order = AV.Object.createWithoutData('orders', '5843fe81ac502e006ba5efb0');
  // // 修改属性
  // order.set('author', userInfo);
  // // 保存到云端
  // order.save();
   
// 查询单个对象
    // var orders = new AV.Query('orders'),
    // that = this;
    // console.log(orders);
    // orders.get('5843fe81ac502e006ba5efb0').then(order => {
    //   order = orderFormat.orderFormat(order);
    //   var ordersArr = [];
    //   ordersArr.push(order);
    //   that.setData({
    //     orders: ordersArr
    //   });

    //   console.log('+++++++++++++++++', ordersArr);
    // }, error => console.log(error));

//查询多个数据，即首页数据列表查询
    var orders = new AV.Query('orders');
    orders.descending('createdAt').find().then(function (results) {
      results = results.map((curvalue) => {
        return orderFormat.orderFormat(curvalue);
      });
      console.log(results);
      that.setData({
        orders: results
      });
  }, function (error) {
  });
  }
})
