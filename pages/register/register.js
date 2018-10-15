import login from '../../API/login.js'
import loginOut from '../../API/loginOut.js'
import getPrevPage from '../../utils/getPrevPage.js'

Page({
  data: {
    title: '微信登录,快速注册',
    phone: false
  },
  onLoad() {
    loginOut()
  },
  login(e) {
    login(e.detail).then(code => {
      let prevPage = getPrevPage()
      prevPage && typeof prevPage._updateLoginState === 'function' && prevPage._updateLoginState()

      setTimeout(() => {
        wx.navigateBack()
      },2500)

      wx.showToast({
        title: '注册成功'
      })
    })
  },
  loginUsePhone(e){
    
  },
  usePhone() {
    this.setData({
      title: '手机注册',
      phone: true
    })
  }
})