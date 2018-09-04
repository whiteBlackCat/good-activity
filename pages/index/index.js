import {
  imgPrefix,
  navPrefix
} from '../../utils/config.js'
import api from '../../utils/api'
import Hash from '../../utils/Hash'

const app = getApp()
const {
  log
} = console

const hash = new Hash()

Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
    imgPrefix,
    catagoryIndex: 0,
    // 既然决定该项数据不主动更新,那么对应hash可以固定,不必动态生成
    catagoryList: [{
        icon: `${navPrefix}5b61761daf922.png`,
        label: '美食',
        code: '5137298406'
      },
      {
        icon: `${navPrefix}5b6175ce58e9c.png`,
        label: '运动',
        code: '6948501732'
      },
      {
        icon: `${navPrefix}5b617550e832e.png`,
        label: '家居家装',
        code: '1873905642'
      },
      {
        icon: `${navPrefix}5b6277a76c71a.png`,
        label: '美容美妆',
        code: '6978102345'
      },
      {
        icon: `${navPrefix}5b6175a591789.png`,
        label: '房产',
        code: '7580193246'
      },
      {
        icon: `${navPrefix}5b6175b0585cd.png`,
        label: '娱乐',
        code: '2351798046'
      },
      {
        icon: `${navPrefix}5b617647cc782.png`,
        label: '汽车',
        code: '6597840213'
      },
      {
        icon: `${navPrefix}5b6176bb32241.png`,
        label: '服饰',
        code: '4590273816'
      },
      {
        icon: `${navPrefix}5b617745bf2b2.png`,
        label: '母婴',
        code: '5730149826'
      },
      {
        icon: `${navPrefix}5b6177882781a.png`,
        label: '其他',
        code: '0862143597'
      }
    ],
    imgUrls: [1],
    activities: [1]
  },
  catagoryChange(e) {
    let i = e.currentTarget.dataset.index,
      code = e.currentTarget.dataset.code
    this.setData({
      catagoryIndex: i
    })
    this.__getActivity(code)
  },
  // 根据code获取某类下所有活动
  __getActivity(code) {
    if (hash.has(code)) {
      this.setData({
        activities: hash.find(code)
      })
    } else {
      let that = this
      api.request({
        url: api.catagory,
        data: {
          tcode: code
        },
        success(res) {
          if (res.status === 0) {
            that.setData({
              activities: res.data
            })
            hash.add(code, res.data)
          } else { //status==1 可以
            that.setData({
              activities: []
            })
            hash.add(code, [])
          }
        }
      })
    }
  },
  __getBanner() {
    let that = this
    api.request({
      url: api.banner,
      success(res) {
        if (res.status === 0) {
          that.setData({
            imgUrls: res.data
          })
        }
      }
    })
  },
  onLoad: function() {
    this.__getBanner()
    this.__getActivity(this.data.catagoryList[0].code)
    // app.api.get('V1wxslideList')
  },
  onUnload() {
    hash.clear()
  },
  search(e) {
    log(e.detail.value)
  },
  goActivityDetail(e) {
    let code = e.currentTarget.dataset.code,
      sessioncode = wx.getStorageSync('session_key')
    wx.navigateTo({
      url: `../activity/activity?sessioncode=${sessioncode}&acode=${code}`
    })
  }
})