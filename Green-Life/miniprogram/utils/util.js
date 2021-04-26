import Dialog from '../miniprogram_npm/@vant/weapp/dialog/dialog'
const app = getApp()
// 接口相关
const BASE_URL = "https://api.tianapi.com/txapi"
const API_KEY = "82d82257c23baeb092f33886b4ff53f9"
const API_KEY_IMG = "ffe5f98ff1a811c901362be8df719188"
const RUBBISH_SORT = "/lajifenlei/index"
const RUBBISH_QUESTION = "/anslajifenlei/index"
const RUBBISH_IMG = "/imglajifenlei/index"

// 垃圾类别格式化
const formatRubbish = type => {
  switch (type) {
    case 0:
      return '可回收垃圾'
    case 1:
      return '有害垃圾'
    case 2:
      return '厨余垃圾'
    case 3:
      return '其他垃圾'
  }
}

// 是否登录
const isLogin = () => {
  if (!app.globalData.userInfo) {
    Dialog.alert({
      message: '该功能需登录后使用',
      confirmButtonText: '前往登录',
      color: 'blue'
    }).then(() => wx.switchTab({ url: `../user/user` }))
    return false
  } else {
    Dialog.close()
    return true
  }
}



// 时间格式化
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}



module.exports = {
  BASE_URL,
  API_KEY,
  API_KEY_IMG,
  RUBBISH_SORT,
  RUBBISH_QUESTION,
  RUBBISH_IMG,
  formatTime,
  formatRubbish,
  isLogin
}