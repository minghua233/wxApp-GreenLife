// pages/goodsDetail/goodsDetail.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    good: {}
  },
  buyNow() {
    const needScore = this.data.good.needScore
    wx.cloud.callFunction({
      name: 'glGetScore',
      data: {}
    }).then(res => {
      // console.log(res);
      const myScore = res.result.data[0].score
      if (myScore < needScore) {
        Toast.fail({
          message: '您的积分不足',
          forbidClick: true,
          duration: 1000,
          onClose: () => {
            return false
          }
        })
      } else {
        Toast.loading({
          message: '正在加载订单信息...',
          forbidClick: true,
          duration: 500
        })
        let goodsInfo = JSON.stringify(this.data.good)
        wx.navigateTo({
          url: `../createOrder/createOrder?goodsInfo=${encodeURIComponent(goodsInfo)}`
        })
      }

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 500
    })
    // console.log(options);
    const good = JSON.parse(decodeURIComponent(options.good))
    this.setData({ good })
    // console.log(this.data.good);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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