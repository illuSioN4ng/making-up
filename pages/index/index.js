//index.js
//获取应用实例
var app = getApp();
//查询用户信息
const AV = require('../../libs/av-weapp.js');
var orderFormat = require('../../utils/orderFormat.js');
Page({
  data: {
    userInfo: {},
    orders: [],
    manage:{},
    QRCodeShow: '',
    QRCodeShowFlag: false
  },
  //事件处理函数
  navToPost: function() {
    wx.navigateTo({
      url: '../post/post'
    });
  },
  onLoad: function (e) {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      });
    });
    console.log(this.data);

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
    if(e.user){
      orders.equalTo('author.nickName', e.user);
      that.setData({
        manage: {
          user:e.user,
          display:false
          }
      });
    }
    orders.descending('createdAt').find().then(function (results) {
      results = results.map((curvalue) => {
        return orderFormat.orderFormat(curvalue);
      });
    
      that.setData({
        orders: results
      });
    }, function (error) {
      
    });
  },
  navToDetail: function(event) {
    var objId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?objId=' + objId 
    });
  },
  manageOrder:function(e){
    var that =this
    that.data.manage.display = !that.data.manage.display;
    that.data.manage.orderId = e.currentTarget.id;
    if(that.data.manage.display){
      that.data.manage.do = ['删除','分享']
    }else{
      delete that.data.manage.do
    }   
    that.setData({
      manage:that.data.manage
    });
  },
  deleteOrder:function(e){
  // var order = AV.Object.createWithoutData('orders', e.id)
  // order.destroy().then(function (success) {
  //   cossole.log(success)
  //   // 删除成功
  // }, function (error) {
  //   cossole.log(error)
  //   // 删除失败
  // });
  },
  QRCodeTap: function(e) {
    this.setData({
      QRCodeShow: e.target.dataset.qrcode,
      QRCodeShowFlag: true
    });
  },
  hideQRCode: function(e){
    if(e.target.id === 'QRCode-container') {
      this.setData({
        QRCodeShow: '',
        QRCodeShowFlag: false
      });
    }
  },
  chooseCircle: function(){
    wx.getLocation({
    type: 'gcj02', //返回可以用于wx.openLocation的经纬度
    success: function(res) {
      var latitude = res.latitude
      var longitude = res.longitude
      wx.openLocation({
        latitude: latitude,
        longitude: longitude,
        scale: 28
      })
    }
  })
  }
})
