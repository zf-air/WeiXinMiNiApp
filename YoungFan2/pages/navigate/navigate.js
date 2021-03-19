// pages/navigate/navigate.js
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
    var that = this;
    console.log("markerId:" + options.markerId);
    var markerId = options.markerId;
    var markers = JSON.parse(options.markers);
    this.setData({
      markerId: markerId,
      markers: markers,
    });
    //获取marker信息
    var markerLatitude = that.data.markers[markerId].latitude;
    var markerLongitude = that.data.markers[markerId].longitude;
    var markerName = that.data.markers[markerId].name;
    //导航
    wx.openLocation({
      latitude: markerLatitude,
      longitude: markerLongitude,
      name: markerName,
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
    })
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
