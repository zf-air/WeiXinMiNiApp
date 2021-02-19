Page({
  /**
   * 页面的初始数据
   */
  data: {
    //目前所在位置
    latitude: 0,
    longitude: 0,
    //设备宽高
    width: 0,
    height: 0,
  },

  //第一次或者下拉刷新获取位置
  getLocation: function () {
    var that = this;
    //获取当前的地理位置
    wx.getLocation({
      type: "gcj02", // 默认为 wgs84 返回 gps 坐标， 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        //赋值经纬度
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        });
        console.log("getLocation: " + that.data.longitude + " " + that.data.latitude);
        //在地图上显示位置
        // that.showLocation();
      },
    });
  },
  //在地图上显示位置
  showLocation: function (res) {
    var that = this;
    var latitude = that.data.latitude;
    var longitude = that.data.longitude;
    console.log("showLocation: " + longitude + " " + latitude);
    if (res != null) {
      //赋值经纬度
      latitude = res.latitude;
      longitude = res.longitude;
    }
    wx.openLocation({
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      scale: 14,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          width: res.windowWidth,
          height: res.windowHeight,
        });
      },
    });
    console.log("width:" + this.data.width + " height:" + this.data.height);
    this.getLocation();
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
