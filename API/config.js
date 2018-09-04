const imgPrefix = 'https://www.jdz6666.com/Public/' // 图片前缀
const navPrefix = 'https://www.jdz6666.com/Public/Public/nuploads/2018-08-01/' //导航图片前缀
const requestPrefix = 'https://www.jdz6666.com/' // 请求域名

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
    if (typeof(response.data) == 'string' && response.data != '') {
      response.data = JSON.parse(response.data);
    }

    // if (response.data.code == "C501") {


    // }
    wx.hideLoading()

    // response.data=Mock.mock(response.data)
    // Do something with response data .
    // Just return the data field of response

  },
  (err, promise) => {
    // Do something with response error
    //promise.resolve("ssss")
    wx.hideLoading()
  }

)
// Set the base url
fly.config.baseURL = requestPrefix

module.exports = {
  imgPrefix,
  navPrefix,
  fly
}