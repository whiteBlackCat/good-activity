

Page({
  data: {
    lists:[]
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  addParagraph(){
    this.setData({
      lists:[...this.data.lists,{
        imgUrl:'',
        text:''
      }]
    })
  }
})