//index.js
import util from '../../utils/util.js'
Page({
  data: {
    pic:[
      '/pages/imgs/love.png','/pages/imgs/count.png',
      '/pages/imgs/t-1.jpg','/pages/imgs/t-2.png',
      '/pages/imgs/t-1.jpg','/pages/imgs/t-3.png',
    ],
  },
  onLoad: function () {

  },
  // 预览
  onPreview(e){
    let pic = this.data.pic;
    let i = Number(e.currentTarget.dataset.i)
    util.preview(pic,pic[i])
  },
})