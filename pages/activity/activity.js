// import api from '../../utils/api.js'

const {
  log
} = console

Page({
  data: {
    detailData: {
      title:'标题',
      number:12
    },
    commlist: {},
    applylist: {},
    joiner:[1,2,3,4,5]
  },
  onLoad: function(options) {
    // log(options)
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
  }
})