//获取系统日期和时间
var util = require("../../utils/util.js");

// pages/order/order.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //充电桩信息
    markerId: 0,
    markers: [],
    //用户信息
    wechartId: "",
    //充电桩状态
    state: "",

    //系统时间
    date: "",
    time: "",

    //预约充电时长
    orderHours: "",
    array: [0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    index: 2,
    //预约时间点
    orderDate: "",
    orderTime: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取时间
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var date = util.formatDate(new Date());
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      time: time,
      date: date,
      orderTime: time,
      orderDate: date,
    });
    console.log("date:" + date + "time:" + time);

    //获取充电桩信息
    console.log("markerId:" + options.markerId);
    var markerId = options.markerId;
    var markers = JSON.parse(options.markers);
    this.setData({
      markerId: markerId,
      markers: markers,
    });
  },
  //日期选择
  bindDateChange: function (e) {
    this.setData({
      orderDate: e.detail.value,
    });
  },
  //时间选择
  bindTimeChange: function (e) {
    this.setData({
      orderTime: e.detail.value,
    });
  },
  //预约时长选择
  bindHoursChange: function (e) {
    this.setData({
      index: e.detail.value,
    });
  },
  //表单提交按钮
  formSubmit: function (e) {
    console.log("提交成功");
    //生成订单信息

    wx.navigateTo({
      url: "../orderSuccess/orderSuccess",
    });
  },
  //表单重置按钮
  formReset: function (e) {
    this.setData({
      orderDate: this.data.date,
      orderTime: this.data.time,
      index: 2,
    });
  },
  //返回上一界面
  clickback: function () {
    wx.navigateBack({
      complete: (res) => {},
      delta: 0,
      fail: (res) => {},
      success: (res) => {
        console.log("返回成功");
      },
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
