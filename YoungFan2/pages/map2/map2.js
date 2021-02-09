// pages/map2/map2.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    latitude: "",
    longitude: "",
    scale: 14,
    markers: [],
  },
  //第一次或者下拉刷新获取位置
  getLocation: function () {
    var that = this;
    //获取当前的地理位置
    wx.getLocation({
      type: "wgs84", // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        //赋值经纬度
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        });
        //在地图上显示位置
        that.showLocation();
      },
    });
  },
  //在地图上显示自己位置
  showLocation: function (res) {
    var that = this;
    var latitude = that.data.latitude;
    var longitude = that.data.longitude;
    if (res != null) {
      //赋值经纬度
      latitude = res.latitude;
      longitude = res.longitude;
    }
    wx.openLocation({
      latitude: Number(latitude),
      longitude: Number(longitude),
      scale: 14,
    });
  },
  //获取手动选的位置
  chooseLocation: function (e) {
    console.log(e);
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        // success
        console.log(res);
        that.showLocation(res);
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      },
    });
  },
  //导航
  onGuideTap: function (event) {
    // 从前端获取数据
    var lat = Number(event.currentTarget.dataset.latitude);
    var lon = Number(event.currentTarget.dataset.longitude);
    var bankName = event.currentTarget.dataset.bankname;
    console.log(lat);
    console.log(lon);
    wx.openLocation({
      type: "gcj02",
      latitude: lat,
      longitude: lon,
      name: bankName,
      scale: 28,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLocation();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getLocation();
  },

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
  onPullDownRefresh: function () {
    this.showLocation();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
