// pages/myOrder/myOrder.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    time: 100,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setTime();
  },
  // 设置计时器
  setTime() {
    let that = this;
    let myTime = setInterval(function () {
      that.setData({
        time: that.data.time - 1,
      });
      if (that.data.time == 0) {
        clearInterval(myTime);
        // wx.navigateTo({
        //  url:''
        // })
        console.log("计时结束");
      }
    }, 1000);
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
