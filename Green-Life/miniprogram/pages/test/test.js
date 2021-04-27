// pages/test/test.js
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify'
import { isLogin } from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  goTest() {
    wx.navigateTo({
      url: `../enterTest/enterTest`
    })
  },
  comingSoon(){
    Notify({
      message: '更多答题敬请期待~',
      color: '#ffffff',
      background: '#00af91',
      duration: 600,
    })
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