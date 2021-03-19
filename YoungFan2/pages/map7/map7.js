Page({
  /**
   * 页面的初始数据
   */
  data: {
    //我的位置
    latitude: "",
    longitude: "",
    address: "",
    //路线规划的终点位置
    endLatitude: "",
    endLongitude: "",
    endAddress: "",
    //设备宽高
    width: 0,
    height: 0,
    //充电桩标记点
    markers: [
      //松园
      {
        id: 0,
        name: "松园充电区",
        iconPath: "../../image/charge.png",
        height: 30,
        width: 30,
        latitude: 34.822604321500634,
        longitude: 113.53296328995512,
        callout: {
          display: "ALWAYS", // 常显气泡
          content: "松园", //名称文本
          color: "#fff", //文本颜色
          borderRadius: 5, //边框圆角
          borderWidth: 1, //边框宽度
          borderColor: "#0060ff", //边框颜色
          bgColor: "#0060ff", //背景色
          padding: 5, //文本边缘留白
          textAlign: "center", //文本对齐方式。有效值: left, right, center
        },
      },
      //菊园
      {
        id: 1,
        name: "菊园充电区",
        iconPath: "../../image/charge.png",
        height: 30,
        width: 30,
        latitude: 34.82058296193651,
        longitude: 113.53285868380354,
        callout: {
          display: "ALWAYS", // 常显气泡
          content: "菊园", //名称文本
          color: "#fff", //文本颜色
          borderRadius: 5, //边框圆角
          borderWidth: 1, //边框宽度
          borderColor: "#0060ff", //边框颜色
          bgColor: "#0060ff", //背景色
          padding: 5, //文本边缘留白
          textAlign: "center", //文本对齐方式。有效值: left, right, center
        },
      },
      //荷园
      {
        id: 2,
        name: "荷园充电区",
        iconPath: "../../image/charge.png",
        height: 30,
        width: 30,
        latitude: 34.81447013929131,
        longitude: 113.53259046290205,
        callout: {
          display: "ALWAYS", // 常显气泡
          content: "荷园", //名称文本
          color: "#fff", //文本颜色
          borderRadius: 5, //边框圆角
          borderWidth: 1, //边框宽度
          borderColor: "#0060ff", //边框颜色
          bgColor: "#0060ff", //背景色
          padding: 5, //文本边缘留白
          textAlign: "center", //文本对齐方式。有效值: left, right, center
        },
      },
      //柳园
      {
        id: 3,
        name: "柳园充电区",
        iconPath: "../../image/charge.png",
        height: 30,
        width: 30,
        latitude: 34.81257630538572,
        longitude: 113.5325099966316,
        callout: {
          display: "ALWAYS", // 常显气泡
          content: "柳园", //名称文本
          color: "#fff", //文本颜色
          borderRadius: 5, //边框圆角
          borderWidth: 1, //边框宽度
          borderColor: "#0060ff", //边框颜色
          bgColor: "#0060ff", //背景色
          padding: 5, //文本边缘留白
          textAlign: "center", //文本对齐方式。有效值: left, right, center
        },
      },
    ],
    //规定区域
    ployline: [
      {
        points: [
          { latitude: 34.827219353057544, longitude: 113.53100259516523 },
          { latitude: 34.827043211562284, longitude: 113.54201574538038 },
          { latitude: 34.807625706045194, longitude: 113.54125936243818 },
          { latitude: 34.807797484490195, longitude: 113.5292135617523 },
          { latitude: 34.827219353057544, longitude: 113.53100259516523 },
        ],
        // color: "#33c9FFDD", 浅蓝色
        color:"#5CADAD",
        width: 5,
        dottedLine: true,
      },
    ],

    key: "YF3BZ-4DAKD-SMN4W-PO5M4-VYZZT-54B2Y", //在腾讯位置服务申请的key
    referer: "young帆充电桩", //调用腾讯位置服务相关插件的app的名称
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
        console.log(
          "getLocation: " + that.data.longitude + " " + that.data.latitude
        );
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
  //点击标记点事件
  markerTap: function (e) {
    var markerId = e.detail.markerId;
    //数组转换为字符串传递
    var markers = JSON.stringify(this.data.markers);
    wx.navigateTo({
      url:
        "../mapToOrder/mapToOrder?markerId=" + markerId + "&markers=" + markers,
    });
  },
  //扫码控件
  scanCodeEvent: function () {
    var that = this;
    wx.scanCode({
      onlyFromCamera: true, // 只允许从相机扫码,false是可以从相机和图库
      success(res) {
        console.log("扫码成功：" + JSON.stringify(res));
        // 扫码成功后  在此处理接下来的逻辑
        // that.setData({
        //   scanCode: res.result
        // })
      },
    });
  },
  //返回上一页控件
  navigateBack: function () {
    wx.navigateBack({
      complete: (res) => {
        console.log("返回上一界面成功");
      },
    });
  },
  //返回当前位置控件
  locateCurrentSite: function (e) {
    console.log("返回当前位置");
    let mpCtx = wx.createMapContext("mymap");
    mpCtx.moveToLocation();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取手机信息
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
