// index.js
// 获取应用实例
const app = getApp();

Page({
  data: {
    motto: "Hello World",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    openid: "",
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: "../logs/logs",
    });
  },
  onLoad() {
    var that = this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      });
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        });
      };
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: (res) => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
          });
        },
      });
    }
    wx.login({
      success: function (res) {
        console.log("res.code=====" + res.code);
        if (res.code) {
          //发起网络请求
          wx.request({
            url:
              "https://api.weixin.qq.com/sns/jscode2session?appid=wxb38f955af462e53c&secret=932a40e736d017a7323cf545379c0e97&js_code=" +
              res.code +
              "&grant_type=authorization_code",
            method: "POST",
            success: function (res) {
              that.setData({
                openid: res.data.openid,
              });
              console.log("openid====" + res.data.openid);
            },
          });
        } else {
          console.log("获取用户登录态失败！" + res.errMsg);
        }
      },
    });
  },
  //我的预约信息
  myOrder:function(){
    wx.navigateTo({
      url: '../myOrder/myOrder',
    })
  },
  getUserInfo(e) {
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    });
  },
});
