// pages/score/score.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
import dayjs from 'dayjs'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scoreDetail: [],
    score: 0
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
    Toast.loading({
      message: '查询中...',
      forbidClick: true,
      duration: 500
    })
    wx.cloud.callFunction({
      name: 'glScoreDetail',
      data: {}
    }).then(res => {
      // console.log(res);
      let detail = res.result.data.reverse()
      for (let i = 0; i < detail.length; i++) {
        detail[i].addTime = dayjs(detail[i].addTime).format('YYYY-MM-DD HH:mm:ss')
        console.log(detail[i].addTime);
        // detail[i].addTime = detail[i].addTime.slice(0, 19)
        // detail[i].addTime = detail[i].addTime.replace('T', ' ')
      }
      this.setData({
        scoreDetail: detail
      })
    })
    wx.cloud.callFunction({
      name: 'glGetScore',
      data: {}
    }).then(res => {
      console.log(res);
      let score = res.result.data[0].score
      this.setData({
        score
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