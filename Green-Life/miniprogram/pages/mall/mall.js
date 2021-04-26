// pages/mall/mall.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
import { isLogin } from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    score: 0,
    allGoods: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    isLogin()
    Toast.loading({
      message: '加载商品中...',
      forbidClick: true,
      duration: 1000
    })
    wx.cloud.callFunction({
      name: 'glGetScore',
      data: {}
    }).then(res => {
      // console.log(res);
      let score = res.result.data[0].score
      this.setData({
        score
      })
    })
    wx.cloud.callFunction({
      name: 'glGetGoods',
      data: {}
    }).then(res => {
      // console.log(res);
      let allGoods = res.result.data
      this.setData({
        allGoods
      })
    })
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