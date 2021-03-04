// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
}) // 指明云函数生效的环境

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event);
  const userInfo = event.userInfo
  // 增加地址记录
  const insertScore = await db.collection('gl_address').add({
    data: {
      openId: event.userInfo.openId,
      recipient: event.recipient,
      phone: event.phone,
      address: event.address,
      addressDetail: event.addressDetail
    }
  })
}