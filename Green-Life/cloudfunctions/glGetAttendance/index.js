// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
}) // 指明云函数生效的环境

// 云函数入口函数
exports.main = async (event, context) => {
  const userInfo = event.userInfo
  // 获取用户最新签到记录
  const getLatestSign = await db.collection('gl_attendance').orderBy('signTime', 'asc').limit(1).where({
    openId: userInfo.openId
  }).get()
  return getLatestSign
}