// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
}) // 指明云函数生效的环境

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event);
  const userInfo = event.userInfo
  // 增加积分记录
  const insertScore = await db.collection('gl_score').add({
    data: {
      openId: event.userInfo.openId,
      score: event.score,
      type: event.type,
      from: event.from,
      addTime: new Date()
    }
  })
  // 获取用户积分
  const getUser = await db.collection('gl_user').where({
    openId: userInfo.openId
  }).get()
  console.log(getUser);
  let newScore = 0
  if (event.type == '+') newScore = getUser.data[0].score + event.score
  else newScore = getUser.data[0].score - event.score
  // // 更新用户积分
  await db.collection('gl_user').doc(getUser.data[0]._id).update({
    data: {
      score: newScore
    }
  })
}