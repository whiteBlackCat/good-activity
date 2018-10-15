import {
  imgPrefix,
  navPrefix,
} from '../../API/config.js'
import login from '../../API/login'

const app = getApp()
const hash = new Map()

Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
    imgPrefix,
    catagoryIndex: 0,
    catagoryList: [],
    imgUrls: [1],
    activities: [1],
    location: null,
    isLogin: app.globalData.isLogin
  },
  // 切换类目
  catagoryChange(e) {
    this.setData({
      catagoryIndex: e.currentTarget.dataset.index
    })
    this.__getActivity(e.currentTarget.dataset.code)
  },
  login(res) {
    console.log(res)
    return
    login(res)
  },
  // 根据code获取某类下所有活动
  __getActivity(code) {
    if (hash.has(code)) {
      this.setData({
        activities: hash.get(code)
      })
    } else {
      let that = this
      app.$http.get('/V1wxeventslist', {
        tcode: code
      }).then(res => {
        if (res.status === 0) {
          that.setData({
            activities: res.data
          })
          hash.set(code, res.data)
        } else { //status==1 可以
          that.setData({
            activities: []
          })
          hash.set(code, [])
        }
      })
    }
  },
  // 获取轮播信息
  __getBanner() {
    let that = this
    app.$http.get('/V1wxslideList').then(res => {
      if (res.status === 0) {
        that.setData({
          imgUrls: res.data
        })
      }
    })
  },
  onReady() {
    // 获取catagoryList信息
    let that = this
    wx.getStorage({
      key: 'catagoryList',
      success: function(res) {
        that.setData({
          catagoryList: res.data
        })
        that.__getActivity(res.data[0].hd_types_code)
      },
      fail() {
        that._updateCatagory().then(catagoryList => {
          that.setData({
            catagoryList
          })
          wx.nextTick(() => {
            that.__getActivity(catagoryList[0].hd_types_code)
          })
        })
      }
    })
    this.__getBanner()
    // 获取位置
    this._getLocation()
  },
  onUnload() {
    hash.clear()
  },
  search(e) {
    log(e.detail.value)
  },
  goActivityDetail(e) {
    let code = e.currentTarget.dataset.code
    wx.navigateTo({
      url: `../activity/activity?code=${code}`
    })
  },
  // 更新Catagory后再获取第一类目数据
  _updateCatagory() {
    let that = this
    return new Promise((resolve, reject) => {
      app.$http.get('/V1wxTypesList')
        .then(res => {
          if (res.status === 0) {
            res.data.forEach(item => {
              item.hd_types_pic = imgPrefix + item.hd_types_pic
            })
            wx.setStorage({
              key: 'catagoryList',
              data: res.data,
            })
            resolve(res.data)
          }
        })
    })
  },
  _getLocation() {
    let that = this
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        that.setData({
          location: res
        })
      }
    })
  }
})