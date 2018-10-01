const app = getApp()
Page({
  data: {
    detailData: {
      title: '标题',
      number: 12
    },
    commlist: {},
    applylist: {},
    joiner: [1, 2, 3, 4, 5]
  },
  onLoad: function(options) {
    this.code = options.code
    // let {
    //   sessioncode,
    //   acode
    // } = options,
    // that = this
    // api.request({
    //   url: api.activityDetail,
    //   data: {
    //     sessioncode,
    //     acode
    //   },
    //   success(res) {
    //     if (res.status === 0) {
    //       that.setData({
    //         detailData: res.data,
    //         commlist: res.commlist,
    //         applylist: res.applylist
    //       })
    //     }
    //   }
    // })
  },
  onReady(){
    this._getActivityDetail(this.code)
  },
  signIn() {
    // 若已经登录则直接跳转
    // 由于可以收集号码注册 sessionCode不再是唯一依据
    let sessionCode = wx.getStorageSync('session_key')
    if (sessionCode) {
      wx.navigateTo({
        url: '',
      })
    } else {
      wx.navigateTo({
        url: '../register/register',
      })
    }
  },
  _getActivityDetail(code) {
    let sessioncode = wx.getStorageSync('session_key')
    app.$http.get(`/V1wxeventsdetails/${sessioncode}/${code}`).then(res=>{
      debugger
    })
  }
})