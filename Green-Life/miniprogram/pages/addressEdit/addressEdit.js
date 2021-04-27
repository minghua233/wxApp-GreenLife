// pages/addressEdit/addressEdit.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recipient: '',
    phone: '',
    address: '江西省南昌市青山湖区',
    addressDetail: '',
    status: 'add',
    addressId: '',
    navTitle: '新增地址',
    invalidRecipient: false,
    invalidPhone: false,
    errorRecipient: '',
    errorPhone: '',
    region: ['江西省', '南昌市', '青山湖区']
  },
  pickRegion: function (e) {
    let currentRegion = e.detail.value;
    let currentAddress = currentRegion.join('')
    console.log(currentRegion.join(''));
    this.setData({
      region: currentRegion,
      address: currentAddress
    })
  },
  isValidName(event) {
    if (!event.detail) return
    if (/^[\u4e00-\u9fa5]{2,6}$/.test(event.detail)) {
      this.setData({
        invalidRecipient: false,
        errorRecipient: ''
      })
    } else {
      this.setData({
        invalidRecipient: true,
        errorRecipient: '请输入正确的收件人姓名'
      })
    }
  },
  isValidPhone(event) {
    if (/^1[345789]\d{9}$/.test(event.detail)) {
      this.setData({
        invalidPhone: false,
        errorPhone: ''
      })
    } else {
      this.setData({
        invalidPhone: true,
        errorPhone: '请输入正确的收件人手机号'
      })
    }
  },
  canSubmit() {
    if (this.data.recipient === '' || this.data.invalidRecipient === true) {
      console.log(this.data.invalidRecipient);
      Toast.fail('您的收件人姓名填写有误');
      return false
    }
    if ((this.data.phone === '' || this.data.invalidPhone === true)) {
      Toast.fail('您的收件人手机号填写有误');
      return false
    }
    if (this.data.addressDetail === '') {
      Toast.fail('您的收件人详细地址填写有误');
      return false
    }
    return true
  },
  addAddress() {
    if (this.canSubmit()) {
      Toast.loading({
        message: '保存地址中...',
        forbidClick: true,
        duration: 500,
      })
      wx.cloud.callFunction({
        name: 'glAddAddress',
        data: {
          recipient: this.data.recipient,
          phone: this.data.phone,
          address: this.data.address,
          addressDetail: this.data.addressDetail
        }
      }).then(res => {
        Toast.success({
          message: '地址添加成功',
          forbidClick: true,
          duration: 500,
          onClose: () => {
            wx.redirectTo({
              url: '../address/address'
            })
          }
        })
      })
    }
  },
  editAddress() {
    if (this.canSubmit()) {
      Toast.loading({
        message: '保存地址中...',
        forbidClick: true,
        duration: 500,
      })
      wx.cloud.callFunction({
        name: 'glUpdateAddress',
        data: {
          _id: this.data.addressId,
          recipient: this.data.recipient,
          phone: this.data.phone,
          address: this.data.address,
          addressDetail: this.data.addressDetail
        }
      }).then(res => {
        Toast.success({
          message: '地址修改成功',
          forbidClick: true,
          duration: 500,
          onClose: () => {
            wx.redirectTo({
              url: '../address/address'
            })
          }
        })
      })
    }
  },
  delAddress() {
    Dialog.confirm({
      title: '删除确认',
      message: '确认删除此地址吗？',
    }).then(() => {
      Toast.loading({
        message: '删除地址中...',
        forbidClick: true,
        duration: 500,
      })
      wx.cloud.callFunction({
        name: 'glDelAddress',
        data: {
          _id: this.data.addressId,
        }
      }).then(res => {
        Toast.success({
          message: '地址删除成功',
          forbidClick: true,
          duration: 500,
          onClose: () => {
            wx.redirectTo({
              url: '../address/address'
            })
          }
        })
      })
    }).catch(() => {
      console.log('用户取消删除');
    })
  },
  giveUP() {
    Dialog.confirm({
      title: '返回确认',
      message: '确认放弃您的编辑吗？',
    })
      .then(() => {
        wx.redirectTo({
          url: '../address/address'
        })
      })
      .catch(() => {
        console.log('用户取消');
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
    if (this.data.status != 'add') {
      this.setData({
        navTitle: '修改地址'
      })
      const addressInfo = JSON.parse(decodeURIComponent(options.addressInfo))
      this.setData({
        addressId: addressInfo._id,
        recipient: addressInfo.recipient,
        phone: addressInfo.phone,
        address: addressInfo.address,
        addressDetail: addressInfo.addressDetail
      })
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