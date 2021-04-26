// pages/order/order.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
import dayjs from 'dayjs'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userOrder:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    Toast.loading({
      message: '查询中...',
      forbidClick: true,
      duration: 500
    })
    wx.cloud.callFunction({
      name: 'glGetOrder',
      data: {}
    }).then(res => {
      // console.log(res);
      let order = res.result.data
      for (let i = 0; i < order.length; i++) {
        // dayjs格式化日期
        order[i].addTime = dayjs(order[i].addTime).format('YYYY-MM-DD HH:mm:ss')
      }
      this.setData({
        userOrder: order
      })
    })
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