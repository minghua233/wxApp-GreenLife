// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
}) // 指明云函数生效的环境

// 云函数入口函数
exports.main = async (event, context) => {
  // 获取所有商品
  const getAllGoods = await db.collection('gl_mall').get()
  console.log(getAllGoods);
  return getAllGoods
}