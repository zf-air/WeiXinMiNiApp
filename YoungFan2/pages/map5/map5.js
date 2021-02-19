var app = getApp();
// 引入SDK核心类
var QQMapWX = require('../../utils/qqmap-wx-jssdk1.2/qqmap-wx-jssdk');
// 实例化API核心类
var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    location: "",
    latitude: "",
    longitude: "",
    // 图标定位
    markers: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 数据加载
  onLoad: function (options) {
    var that = this;
    // 发送请求，GET
    // 成功后台返回location，latitude，longitude
    wx.request({
      url: 'https://apis.map.qq.com?userId=' + 'wxb38f955af462e53c',
      method: 'GET',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        that.setData({
          // 地址+经纬度
          location: res.data.data.address,
          latitude: res.data.data.lat,
          longitude: res.data.data.lng,
          // 电话
          phone: res.data.data.phone,
          // 定位标志的经纬度
          markers: [{
            latitude: res.data.data.lat,
            longitude: res.data.data.lng,
          }]
        });
      },
      fail: function (res) {
        console.log('失败了');
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  // 地图
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
  },
  // 地图导航
  getLoc: function (e) {
    // console.log(e.currentTarget.id);  // 获取当前点击的数组下标
    var that = this;
    wx.getLocation({
      type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      success: function (res) {
        //使用微信内置地图查看位置接口
        wx.openLocation({
          latitude: parseFloat(that.data.latitude),  // 要去的地址经度，浮点数
          longitude: parseFloat(that.data.longitude),  // 要去的地址纬度，浮点数
          name: '终点位置',  // 位置名
          address: that.data.location,  // 要去的地址详情说明
          scale: 18,   // 地图缩放级别,整形值,范围从1~28。默认为最大
          infoUrl: 'http://www.gongjuji.net'  // 在查看位置界面底部显示的超链接,可点击跳转（测试好像不可用）
        });
      },
      cancel: function (res) {
        console.log('地图定位失败');
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})