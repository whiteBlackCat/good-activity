import {
  host
} from 'config'

var Fly = require("../lib/wx.umd.min.js")
var fly = new Fly(); //Create an instance of Fly

// Add interceptors
fly.interceptors.request.use((config, promise) => {
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  // Add custom headers

  return config;
})
fly.interceptors.response.use(
  (response, promise) => {
    // 将JSON字符串转换成对象
    if (typeof(response.data) == 'string' && response.data != '') {
      response.data = JSON.parse(response.data);
    }
    wx.hideLoading()

    // response.data=Mock.mock(response.data)
    // Do something with response data .
    // Just return the data field of response
    
    // 完全不需要外层的包裹体
    return response.data
  },
  (err, promise) => {
    // Do something with response error
    promise.reject(err)
    wx.hideLoading()
  }

)
// Set the base url
fly.config.baseURL = host
fly.config.headers['Content-Type'] = 'application/json;charset=utf-8'

export default {
  get(url, data = {}) {
    return fly.get(url, data)
  },
  post(url, data = {}) {
    return fly.post(url, data)
  }
}