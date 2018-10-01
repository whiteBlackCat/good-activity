// import {
//   catagoryList
// } from '../index/index'
const range = []

// catagoryList.forEach(item => {
//   range.push(item.label)
// })

Page({
  data: {
    range,
    index: 0,
    date: '',
    start: '',
    end: '',
  },
  pickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },
  onReady() {
    let date = new Date(),
      start = date.toISOString().split('T')[0],
      // 只限定15天内
      end = new Date((new Date()).setDate(date.getDate() + 15)).toISOString().split('T')[0]
    this.setData({
      date: start,
      start,
      end
    })
  },
  dateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  submit(e){
    wx.navigateTo({
      url: 'publish-activity-step2/publish-activity-step2'
    })
  }
})