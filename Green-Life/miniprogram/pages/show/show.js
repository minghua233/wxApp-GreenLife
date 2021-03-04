// pages/show/show.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
import { BASE_URL, RUBBISH_SORT, API_KEY, formatRubbish } from '../../utils/util'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    results: [],
    empty: false
  },
  getCollection(item) {
    wx.request({
      url: `${BASE_URL}${RUBBISH_SORT}?key=${API_KEY}&word=${item}`,
      success: res => {
        if (res.data.code == 200) {
          console.log(res)
          for (let item of res.data.newslist) item.type = formatRubbish(item.type)
          this.setData({ results: res.data.newslist })
        } else {
          console.log(res.data.msg)
          this.setData({ empty: true })
        }
      },
      fail: err => {
        console.log(err)
      }
    })

  },
  goBack() {
    wx.navigateBack()
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
    const { value } = options
    this.getCollection(value)
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