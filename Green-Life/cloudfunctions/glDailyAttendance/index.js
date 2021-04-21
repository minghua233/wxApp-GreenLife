// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
}) // 指明云函数生效的环境

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event);
  const userInfo = event.userInfo
  // 增加签到记录
  const insertAttendance = await db.collection('gl_attendance').add({
    data:{
      openId: event.userInfo.openId,
      signTime: new Date()
    }
  })
}