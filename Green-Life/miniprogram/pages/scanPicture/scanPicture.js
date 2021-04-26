import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
import { BASE_URL, RUBBISH_IMG, API_KEY_IMG, formatRubbish } from '../../utils/util'
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },

  chooseImg: function () {
    const that = this
    wx.chooseImage({
      count: 1, // 图片数量
      sizeType: ['compressed'], // 上传压缩图片
      sourceType: ['album', 'camera'], // 来源相机或相册
      success: imgRes => {
        Toast.loading({
          message: '查询中...',
          forbidClick: true,
          duration: 1500
        })
        console.log(imgRes)
        if (imgRes.size > 1024 * 1024 * 2) {
          wx.showModal({
            title: '图片过大',
            content: '很抱歉，图片最大允许2M，当前为' + (imgRes.size / (1024 * 1024)).toFixed(2),
          })
          return false;
        } else {
          wx.getFileSystemManager().readFile({
            filePath: imgRes.tempFilePaths[0], //选择图片返回的相对路径
            encoding: 'base64', //编码格式
            success: res => { //成功的回调
              wx.request({  // 请求垃圾分类图像识别接口
                url: BASE_URL + RUBBISH_IMG,
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                data: {
                  key: API_KEY_IMG,
                  img: 'data:image/png;base64,' + res.data
                },
                success: res => {
                  if (res.data.code == 200) {
                    console.log(res.data.newslist)
                    let newSource = res.data.newslist
                    for (let item of newSource) item.lajitype = formatRubbish(item.lajitype)
                    that.setData({
                      img: imgRes.tempFilePaths[0],
                      size: (imgRes.size / (1024 * 1024)).toFixed(2),
                      bindSource: newSource
                    })
                  } else {
                    console.error(res.data)
                  }
                }
              })
            }
          })
        }
      },
      fail: err =>{
        Toast({
          type: 'fail',
          message: '未选择图片!',
          duration: 500,
          onClose: () => {
            wx.switchTab({ url: `../index/index` })
          },
        });
        // Toast.fail('未选择图片');
       
      }
    }
    )
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.chooseImg()
    // console.log(this.data);
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