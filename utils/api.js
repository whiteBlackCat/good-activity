import {host} from './config.js'
const R = {}

R.banner = 'V1wxslideList'  //首页轮播
R.index = 'V1wxindex' //首页信息
R.catagory = 'V1wxeventslist' //分类活动
R.activityDetail = 'V1wxeventsdetails' //活动详情
// R.catagory = 'V1wxeventslist' //分类活动
// R.catagory = 'V1wxeventslist' //分类活动
// R.catagory = 'V1wxeventslist' //分类活动
// R.catagory = 'V1wxeventslist' //分类活动
// R.catagory = 'V1wxeventslist' //分类活动
// R.catagory = 'V1wxeventslist' //分类活动
// R.catagory = 'V1wxeventslist' //分类活动
// R.catagory = 'V1wxeventslist' //分类活动
// R.catagory = 'V1wxeventslist' //分类活动
// R.catagory = 'V1wxeventslist' //分类活动


R.request = (...args) => {
  // loading动画开始
  wx.showLoading({
    title: '加载数据...',
    mask: true
  })

  // loading动画结束
  let oldComplete = args[0].complete
  args[0].complete = () => {
    wx.hideLoading()
    typeof oldComplete === 'function' && oldComplete()
  }

  // 对success做统一处理  去掉微信对请求体的包裹
  let oldSuccess = args[0].success
  args[0].success = (res) => {
    oldSuccess(res.data)
  }
  wx.request(...args)
}

let api = new Proxy(R, {
  get(target, property) {
    if (typeof target[property] === 'string') {
      return `${host}${target[property]}`
    } else {
      return Reflect.get(target, property)
    }
  }
})

module.exports = api
