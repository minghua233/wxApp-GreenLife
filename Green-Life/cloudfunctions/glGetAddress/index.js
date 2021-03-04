// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
}) // 指明云函数生效的环境

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event);
  const userInfo = event.userInfo
  // 获取用户地址
  const getUserAddress = await db.collection('gl_address').where({
    openId: userInfo.openId
  }).get()
  return getUserAddress
}