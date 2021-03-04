// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
}) // 指明云函数生效的环境

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event);
  const userInfo = event.userInfo
  // 更新指定地址记录
  await db.collection('gl_address').where({
    _id: event._id
  }).update({
    data: {
      recipient: event.recipient,
      phone: event.phone,
      address: event.address,
      addressDetail: event.addressDetail
    }
  })
}