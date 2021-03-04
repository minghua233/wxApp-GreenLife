// pages/createOrder/createOrder.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressInfo: {},
    goodsInfo: {}
  },
  // 选择地址
  chooseAddress() {
    const status = 'choose'
    wx.redirectTo({
      url: `../address/address?status=${status}`
    })
  },
  // 提交订单
  submit() {
    Toast.loading({
      message: '创建订单中...',
      forbidClick: true,
      duration: 500
    })
    wx.cloud.callFunction({
      name: 'glCreateOrder',
      data: {
        addressInfo: this.data.addressInfo,
        goodInfo: this.data.goodsInfo
      }
    }).then(
      wx.cloud.callFunction({
        name: 'glAddScore',
        data: {
          score: this.data.goodsInfo.needScore,
          type: '-',
          from: '积分商城兑换'
        }
      }).then(
        Toast.success({
          message: '订单创建成功',
          forbidClick: true,
          duration: 500
        })
      )
    )
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({ goodsInfo: app.globalData.goodsInfo })
    if (options.goodsInfo) {
      let goodsInfo = JSON.parse(decodeURIComponent(options.goodsInfo))
      this.setData({ goodsInfo })
      app.globalData.goodsInfo = goodsInfo
    }

    if (options.addressInfo) {
      let addressInfo = JSON.parse(decodeURIComponent(options.addressInfo))
      this.setData({ addressInfo })
    }
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