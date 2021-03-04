// miniprogram/pages/index.js

Page({
  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    descImg: '',
    value: ''
  },
  showPopup(e) {
    const type = e.currentTarget.dataset['type']
    switch (type) {
      case '0':
        this.setData({ descImg: 'https://636d-cmh-5gebbyey0b914c53-1303973985.tcb.qcloud.la/Green-Life/khs_intro.jpg?sign=a974239651ff56b33b25b27089329262&t=1610955620' })
        break;
      case '1':
        this.setData({ descImg: 'https://636d-cmh-5gebbyey0b914c53-1303973985.tcb.qcloud.la/Green-Life/yh_intro.jpg?sign=b89630a9e5558949cc8e923142acd279&t=1610955638' })
        break;
      case '2':
        this.setData({ descImg: 'https://636d-cmh-5gebbyey0b914c53-1303973985.tcb.qcloud.la/Green-Life/cy_intro.jpg?sign=5fddfaba9d06d05c650cfdbb41923849&t=1610955654' })
        break;
      case '3':
        this.setData({ descImg: 'https://636d-cmh-5gebbyey0b914c53-1303973985.tcb.qcloud.la/Green-Life/qt_intro.jpg?sign=fa1e12f5f4d840a501f9bea2e8aaef42&t=1610955674' })
        break;
    }
    this.setData({ show: true })
  },
  onClose() {
    this.setData({ show: false })
  },
  searchRub(event) {
    this.setData({ value: event.detail })
    wx.navigateTo({
      url: `../show/show?value=${this.data.value}`
    })
  },
  scanPic(e) {
    wx.navigateTo({
      url: `../scanPicture/scanPicture`
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getCollection()

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