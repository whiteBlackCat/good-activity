import {
  host
} from './config'

const R = {}

R.banner = 'V1wxslideList' //首页轮播
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