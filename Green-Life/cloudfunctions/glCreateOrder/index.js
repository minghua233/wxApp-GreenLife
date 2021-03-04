// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
}) // 指明云函数生效的环境

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event);
  const userInfo = event.userInfo
  const goodInfo = event.goodInfo
  const addressInfo = event.addressInfo
  const address = addressInfo.address + addressInfo.addressDetail
  // 增加兑换记录
  await db.collection('gl_order').add({
    data: {
      openId: userInfo.openId,
      goodId: goodInfo._id,
      goodName: goodInfo.goodName,
      goodPicture: goodInfo.goodPicture,
      needScore: goodInfo.needScore,
      address: address,
      addTime: new Date()
    }
  })
  // 更新商品数量
  let newSum = goodInfo.goodSum - 1
  await db.collection('gl_mall').doc(goodInfo._id).update({
    data: {
      goodSum: newSum
    }
  })
}