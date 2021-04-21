// pages/user/user.js
import { isLogin } from '../../utils/util'
import dayjs from 'dayjs'
import isToday from '../../utils/isToday'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '../../images/user.jpg',
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    isSigned: false,
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '获取用户头像昵称', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.getUserSetting(res.userInfo)
      }
    })
  },
  getUserInfo(e) {
    // console.log(e);
    const userInfo = e.detail.userInfo
    if (userInfo) this.getUserSetting(userInfo)
    console.log(app.globalData.userInfo);
  },
  getUserSetting(userInfo) {
    app.globalData.userInfo = userInfo;
    this.setData({
      avatarUrl: userInfo.avatarUrl,
      userInfo: userInfo,
      hasUserInfo: true
    })
    wx.getSetting({
      success(settingRes) {
        // console.log(settingRes);
        // 应经授权
        if (settingRes.authSetting['scope.userInfo']) {
          wx.getUserInfo({ // 获取用户信息
            success(infoRes) {
              // console.log(infoRes);
              app.globalData.userInfo = infoRes.userInfo
              wx.cloud.callFunction({
                name: 'glCreateUser',
                data: {
                  avataUrl: infoRes.userInfo.avataUrl,
                  nickName: infoRes.userInfo.nickName,
                  sex: infoRes.userInfo.gender
                }
              })
            }
          })
        }
      }
    })
  },
  signToday() {
    if (!this.data.isSigned) {
      Toast.loading({
        message: '正在签到...',
        forbidClick: true,
        duration: 500
      })
      wx.cloud.callFunction({
        name: 'glDailyAttendance',
        data: {}
      }).then(res => {
        this.setData({
          isSigned: true
        })
        wx.cloud.callFunction({
          name: 'glAddScore',
          data: {
            score: 200,
            type: '+',
            from: '每日签到'
          }
        }).then(res => {
          Toast.loading({
            type: 'success',
            message: '签到成功',
            forbidClick: true,
            duration: 500
          })
        })
      })
    } else {
      Toast.fail('今日已签到');
    }

  },
  goAddress() {
    if (isLogin()) wx.navigateTo({ url: `../address/address` })
  },
  goDetail() {
    if (isLogin()) wx.navigateTo({ url: `../score/score` })
  },
  goOrder() {
    if (isLogin()) wx.navigateTo({ url: `../order/order` })
  },
  aboutUs() {
    wx.navigateTo({ url: `../createOrder/createOrder` })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    if (!this.data.isSigned) {
      wx.cloud.callFunction({
        name: 'glGetAttendance',
        data: {}
      }).then(res => {
        console.log(res);
        const signTime = res.result.data.signTime
        dayjs.extend(isToday)
        if (dayjs(signTime).isToday()) {
          this.setData({
            isSigned: true
          })
        }
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