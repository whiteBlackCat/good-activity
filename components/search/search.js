Component({
  externalClasses: ['search', 'prepend', 'input'],
  properties: {
    placeholderText: {
      type:String,
      value:'搜索商家、商品名称'
    }
  },

  methods: {
    search(e) {
      let {
        detail
      } = e,
      options = {
        bubbles: false,
        composed: false,
        capturePhase: false
      }
      this.triggerEvent('update', detail, options)
    }
  }
})