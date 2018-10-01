import http from './API/http'
import loginOut from './API/loginOut.js'

require('./API/clientUpdate.js')

App({
  onLaunch: function() {
    let that = this
    wx.checkSession({
      success() {
        let sessioncode = wx.getStorageSync('session_key')
        console.log('sessioncode is:   ' + sessioncode)
        sessioncode && (that.globalData.isLogin = true)
      },
      fail(){
        loginOut()
      }
    })
  },
  globalData: {
    user: null,
    isLogin: false
  },
  $http: http
})