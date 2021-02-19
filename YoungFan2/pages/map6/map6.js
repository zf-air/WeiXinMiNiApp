// pages/map6/map6.js
var QQMapWX = require("../../utils/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.min");
const chooseLocation = requirePlugin("chooseLocation"); //地图选点结果插件实例

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
    
    scale: 14,
    markers: [],
    key: "YF3BZ-4DAKD-SMN4W-PO5M4-VYZZT-54B2Y", //在腾讯位置服务申请的key
    referer: "young帆充电桩", //调用腾讯位置服务相关插件的app的名称
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

  //导航
  navigate(){
    wx.openLocation({
      latitude: this.data.endLatitude,
      longitude: this.data.endLongitude,
      name: this.data.endAddress,
    })
  },

  //跳转到地图页
  index:function(){
    wx.navigateTo({
      url: '../map7/map7',
    })
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
  onReady: function () {
    this.getLocation();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 从地图选点插件返回后，在页面的onShow生命周期函数中能够调用插件接口，取得选点结果对象
    const location = chooseLocation.getLocation(); // 如果点击确认选点按钮，则返回选点结果对象，否则返回null
    if (location != null) {
      console.log(location);
      this.setData({
        endLatitude: location.latitude,
        endLongitude: location.longitude,
        endAddress: location.name,
      });
    }
  },
  //腾讯位置服务地图选点
  clickMap() {
    let that = this;
    //获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限
    wx.getSetting({
      success(res) {
        //console.log(res)
        //scope.userLocation 就是地理授权的标志：
        //res.authSetting['scope.userLocation'] == undefined 表示初始进入该页面
        //res.authSetting['scope.userLocation'] == false 表示非初始化进入该页面 且未授权
        //res.authSetting['scope.userLocation'] == true 表示地理位置授权
        if (
          res.authSetting["scope.userLocation"] != undefined &&
          res.authSetting["scope.userLocation"] != true
        ) {
          //表示非初始化进入该页面 且未授权：
          wx.showModal({
            title: "请求授权当前位置",
            content: "需要获取您的地理位置，请确认授权",
            showCancel: true,
            cancelText: "取消",
            cancelColor: "#000000",
            confirmText: "确定",
            confirmColor: "#3CC51F",
            success: (result) => {
              if (res.cancel) {
                wx.showToast({
                  title: "拒绝授权",
                  icon: "none",
                  duration: 1000,
                });
              } else if (result.confirm) {
                //调起客户端小程序设置界面，返回用户设置的操作结果。
                //设置界面只会出现小程序已经向用户请求过的权限
                wx.openSetting({
                  success: (dataAu) => {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: "授权成功",
                        icon: "success",
                        duration: 1000,
                      });
                      //再次授权之后，调用腾讯位置服务的地图选点插件API
                      that.callQQPlugin();
                    } else {
                      wx.showToast({
                        title: "授权失败",
                        icon: "none",
                        duration: 1000,
                      });
                    }
                  },
                });
              }
            },
          });
        } else if (res.authSetting["scope.userLocation"] == undefined) {
          //调用腾讯位置服务的地图选点插件API
          that.callQQPlugin();
        } else {
          //调用腾讯位置服务的地图选点插件API
          that.callQQPlugin();
        }
      },
    });
  },
  //调用腾讯位置服务的地图选点插件API
  callQQPlugin() {
    const key = this.data.key; //使用在腾讯位置服务申请的key
    const referer = this.data.referer; //调用插件的app的名称
    const latitude = this.data.latitude;
    const longitude = this.data.longitude;
    console.log("callQQPlugin: " + longitude + " " + latitude);
    if (latitude != "" && longitude != "") {
      const location = JSON.stringify({
        latitude: latitude,
        longitude: longitude,
      });
      wx.navigateTo({
        url:
          "plugin://chooseLocation/index?key=" +
          key +
          "&referer=" +
          referer +
          "&location=" +
          location,
      });
    } else {
      wx.navigateTo({
        url: "plugin://chooseLocation/index?key=" + key + "&referer=" + referer,
      });
    }
  },
  //腾讯位置服务路线规划
  routePlan() {
    let that = this;
    //获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限
    wx.getSetting({
      success(res) {
        //console.log(res)
        //scope.userLocation 就是地理授权的标志：
        //res.authSetting['scope.userLocation'] == undefined 表示初始进入该页面
        //res.authSetting['scope.userLocation'] == false 表示非初始化进入该页面 且未授权
        //res.authSetting['scope.userLocation'] == true 表示地理位置授权
        if (
          res.authSetting["scope.userLocation"] != undefined &&
          res.authSetting["scope.userLocation"] != true
        ) {
          //表示非初始化进入该页面 且未授权：
          wx.showModal({
            title: "请求授权当前位置",
            content: "需要获取您的地理位置，请确认授权",
            showCancel: true,
            cancelText: "取消",
            cancelColor: "#000000",
            confirmText: "确定",
            confirmColor: "#3CC51F",
            success: (result) => {
              if (res.cancel) {
                wx.showToast({
                  title: "拒绝授权",
                  icon: "none",
                  duration: 1000,
                });
              } else if (result.confirm) {
                //调起客户端小程序设置界面，返回用户设置的操作结果。
                //设置界面只会出现小程序已经向用户请求过的权限
                wx.openSetting({
                  success: (dataAu) => {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: "授权成功",
                        icon: "success",
                        duration: 1000,
                      });
                      //再次授权之后，调用腾讯位置服务的路线规划插件API
                      that.callRoutePlanPlugin();
                    } else {
                      wx.showToast({
                        title: "授权失败",
                        icon: "none",
                        duration: 1000,
                      });
                    }
                  },
                });
              }
            },
          });
        } else if (res.authSetting["scope.userLocation"] == undefined) {
          //调用腾讯位置服务的路线规划插件API
          that.callRoutePlanPlugin();
        } else {
          //调用腾讯位置服务的路线规划插件API
          that.callRoutePlanPlugin();
        }
      },
    });
  },
  //
  callRoutePlanPlugin() {
    let plugin = requirePlugin("routePlan"); //路线规划插件
    let key = this.data.key; //使用在腾讯位置服务申请的key
    let referer = this.data.referer; //调用插件的app的名称
    let latitude = this.data.endLatitude;
    let longitude = this.data.endLongitude;
    let name = this.data.endAddress;
    if (latitude != "" && longitude != "") {
      let endPoint = JSON.stringify({
        //终点
        name: name,
        latitude: latitude,
        longitude: longitude,
      });
      wx.navigateTo({
        url:
          "plugin://routePlan/index?key=" +
          key +
          "&referer=" +
          referer +
          "&endPoint= " +
          endPoint,
      });
    } else {
      console.log("请先选择地点");
    }
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
