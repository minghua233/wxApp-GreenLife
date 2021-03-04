// pages/address/address.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userAddress: [],
    status: ''
  },
  goAdd() {
    wx.navigateTo({
      url: '../addressEdit/addressEdit'
    })

  },
  goEdit(e) {
    let addressInfo = JSON.stringify(e.currentTarget.dataset['info'])
    // 从选择地址界面跳入
    if(this.data.status == 'choose') {
      wx.redirectTo({
        url: `../createOrder/createOrder?addressInfo=${encodeURIComponent(addressInfo)}`
      })
    }
    let status = 'edit'
    wx.navigateTo({
      url: `../addressEdit/addressEdit?addressInfo=${encodeURIComponent(addressInfo)}&status=${status}`
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const status = options.status
    this.setData({
      status: status
    })
    Toast.loading({
      message: '查询中...',
      forbidClick: true,
      duration: 800
    })
    wx.cloud.callFunction({
      name: 'glGetAddress',
      data: {}
    }).then(res => {
      console.log(res);
      let address = res.result.data
      this.setData({
        userAddress: address
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