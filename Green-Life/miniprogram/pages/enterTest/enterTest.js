// pages/enterTest/enterTest.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
import { BASE_URL, API_KEY, RUBBISH_QUESTION } from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    choice: '',
    question: '',
    answer: '',
    num: 1,
    correctNum: 0
  },
  choose(e) {
    this.setData({ choice: e.currentTarget.dataset['type'] })
    console.log(this.data.choice);
    this.isCorrect(this.data.choice)
    this.setData({ num: this.data.num + 1 })
    if (this.data.num > 5) {
      wx.navigateTo({
        url: `../testResult/testResult?correct=${this.data.correctNum}`
      })
      return
    }
    this.getQuestion()
  },
  isCorrect(ans) {
    if (ans == this.data.question.type) {
      Toast.success({
        message: '答对了！',
        forbidClick: true,
        duration: 500
      })
      this.setData({ correctNum: this.data.correctNum + 1 })
      return true
    }
    else Toast.fail(`答错了，正确答案是${this.data.question.explain}`)
    return false
  },
  getQuestion() {
    wx.request({
      url: `${BASE_URL}${RUBBISH_QUESTION}?key=${API_KEY}`,
      success: res => {
        if (res.data.code == 200) {
          console.log(res)
          this.setData({
            question: res.data.newslist[0]
          })
          console.log(this.data.question);
        } else console.log(res.data.msg)

      },
      fail: err => console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    Toast.loading({
      message: '题目加载中...',
      forbidClick: true,
      duration: 500
    })
    this.getQuestion()
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