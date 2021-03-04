// pages/testResult/testResult.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    score: '0',
    correct: '0'
  },
  goTest() {
    wx.switchTab({ url: `../test/test` })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    const correct = options.correct
    this.setData({
      correct: correct,
      score: correct * 10
    })
    app.globalData.dailyScore += this.data.score
    wx.cloud.callFunction({
      name: 'glAddScore',
      data: {
        score: this.data.score,
        type: '+',
        from: '答题赠送'
      }
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