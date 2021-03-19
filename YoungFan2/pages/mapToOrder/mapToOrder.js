// pages/mapToOrder/mapToOrder.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    markerId: 0,
    markers: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var markerId = options.markerId;
    var markers = JSON.parse(options.markers);
    // console.log("markerId" + markerId);
    // for (var i = 0; i < markers.length; i++) {
    //   console.log("markers:" + markers[i].latitude + " " + markers[i].longitude);
    // }
    this.setData({
      markerId: markerId,
      markers: markers,
    });
  },
  //预约
  orderTap: function () {
    var markerId = this.data.markerId;
    //数组转换为字符串传递
    var markers = JSON.stringify(this.data.markers);
    wx.navigateTo({
      url: "../order/order?markerId=" + markerId + "&markers=" + markers,
    });
  },
  //导航
  navigateTap: function () {
    var markerId = this.data.markerId;
    //数组转换为字符串传递
    var markers = JSON.stringify(this.data.markers);
    wx.navigateTo({
      url: "../navigate/navigate?markerId=" + markerId + "&markers=" + markers,
    });
  },
  //故障报修
  service: function () {
    var markerId = this.data.markerId;
    //数组转换为字符串传递
    var markers = JSON.stringify(this.data.markers);
    //把故障信息存储到数据库中

    //跳转到报修成功界面
    wx.navigateTo({
      url: "../service/service",
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
