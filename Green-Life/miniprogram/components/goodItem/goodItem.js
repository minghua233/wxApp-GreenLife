// components/goodItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    good: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    chooseItem() {
      let good = JSON.stringify(this.properties.good)
      wx.navigateTo({
        url: `../goodsDetail/goodsDetail?good=${encodeURIComponent(good)}`
      })
    }
  }
})
