//index.js
//获取应用实例
var app = getApp();
//查询用户信息
const AV = require('../../libs/av-weapp.js');
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    orders: [
      {
        avatarUrl: "http://wx.qlogo.cn/mmhead/kpUbvkMbNAdpQbvZBgncDWcRg7m4Dfkvy1cpIVNhdt8/132",
        nickName: 'illuSioN4ng',
        postTime: '2017-1-23',
        pictures: [
          'http://wx.qlogo.cn/mmhead/kpUbvkMbNAdpQbvZBgncDWcRg7m4Dfkvy1cpIVNhdt8/132',
          'http://wx.qlogo.cn/mmhead/kpUbvkMbNAdpQbvZBgncDWcRg7m4Dfkvy1cpIVNhdt8/132',
          'http://wx.qlogo.cn/mmhead/kpUbvkMbNAdpQbvZBgncDWcRg7m4Dfkvy1cpIVNhdt8/132'
        ],
        title: '京东双十一洗护类199减10',
        content: '已选128元商品，还差71元，小伙伴们快来凑单！！'
      },{
        avatarUrl: "http://wx.qlogo.cn/mmhead/kpUbvkMbNAdpQbvZBgncDWcRg7m4Dfkvy1cpIVNhdt8/132",
        nickName: 'illuSioN4ng',
        postTime: '2017-1-23',
        pictures: [
          'http://wx.qlogo.cn/mmhead/kpUbvkMbNAdpQbvZBgncDWcRg7m4Dfkvy1cpIVNhdt8/132',
          'http://wx.qlogo.cn/mmhead/kpUbvkMbNAdpQbvZBgncDWcRg7m4Dfkvy1cpIVNhdt8/132',
          'http://wx.qlogo.cn/mmhead/kpUbvkMbNAdpQbvZBgncDWcRg7m4Dfkvy1cpIVNhdt8/132'
        ],
        title: '京东双十一洗护类199减10',
        content: '已选128元商品，还差71元，小伙伴们快来凑单！！'
      },{
        avatarUrl: "http://wx.qlogo.cn/mmhead/kpUbvkMbNAdpQbvZBgncDWcRg7m4Dfkvy1cpIVNhdt8/132",
        nickName: 'illuSioN4ng',
        postTime: '2017-1-23',
        pictures: [
          'http://wx.qlogo.cn/mmhead/kpUbvkMbNAdpQbvZBgncDWcRg7m4Dfkvy1cpIVNhdt8/132',
          'http://wx.qlogo.cn/mmhead/kpUbvkMbNAdpQbvZBgncDWcRg7m4Dfkvy1cpIVNhdt8/132',
          'http://wx.qlogo.cn/mmhead/kpUbvkMbNAdpQbvZBgncDWcRg7m4Dfkvy1cpIVNhdt8/132'
        ],
        title: '京东双十一洗护类199减10',
        content: '已选128元商品，还差71元，小伙伴们快来凑单！！'
      }
    ]
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
    app.getUserInfo(function(userInfo){
      //更新数据
      console.log(userInfo);
      that.setData({
        userInfo:userInfo
      });
    })
  }
})
