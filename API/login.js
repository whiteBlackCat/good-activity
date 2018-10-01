import http from './http.js'

export default data => {
  return new Promise((resolve, reject) => {
    wx.login({
      success(res) {
        let code = res['code']
        if (code) {
          http.get('V1Wxlogin', {
            "code": code,
            "rawData": data['rawData'],
            "signature": data['signature'],
            "encryptedData": data['encryptedData'],
            "iv": data['iv']
          }).then(res => {
            let sessionCode = res.session3rd;
            if (sessionCode) {
              wx.setStorage({
                key: 'session_key',
                data: sessionCode
              })
              resolve(sessionCode)
            } else {
              reject('sessionCode获取失败')
            }
          }).catch(err => {
            reject(err)
          })
        } else {
          reject('临时code获取失败')
        }
      }
    })
  })
}