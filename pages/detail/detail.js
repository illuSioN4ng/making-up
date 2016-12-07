// pages/detail/detail.js
//获取应用实例
var app = getApp();
//查询用户信息
const AV = require('../../libs/av-weapp.js');
var orderFormat = require('../../utils/orderFormat.js');
Page({
  data:{
    url: "http://wx.qlogo.cn/mmhead/kpUbvkMbNAdpQbvZBgncDWcRg7m4Dfkvy1cpIVNhdt8/132",
    scrollX: true,
    scrollY: true,
    userInfo: {},
    order: {},
    comments: [],
    commentObj: {}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options);
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      console.log(userInfo);
      that.setData({
        userInfo:userInfo
      });
      console.log(that.data);
      // 查询单个对象
    var orders = new AV.Query('orders');
    orders.get(options.objId).then(order => {
      order = orderFormat.orderFormat(order);
      console.log(order);
      that.setData({
        order: order
      });
      if( that.data.order.comments && that.data.order.comments.length > 0) {
        that.data.comments = that.data.order.comments;
      }
      console.log(that.data);
    }, error => console.log(error));
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
  imageEvent: function(e){
    console.log('11111111111111');
    console.log(e);
  },
  EventHandle: function(e){
    console.log(e);
  },
  commentInput: function(e){
    console.log(e);
    this.data.commentObj.author = this.data.userInfo;
    this.data.commentObj.commentStr = e.detail.value;
    this.data.commentObj.createAt = new Date();
  },
  commentSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e);
    if(!this.data.commentObj.commentStr || this.data.commentObj.commentStr === ''){
      console.log(this.data);
      wx.showToast({
        title: '评论为空',
        duration: 2000
      });
      return false;
    }
    this.data.comments.unshift(this.data.commentObj);

    var order = AV.Object.createWithoutData('orders', this.data.order.id);
    order.set('comments', this.data.comments);
    order.save().then(order => {
      wx.navigateTo({
        url: './detail?objId=' + this.data.order.id 
      });
    }, (error) => {
        throw error;
    });
  }
})