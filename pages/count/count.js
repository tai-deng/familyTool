// pages/count/count.js
import cache from '../../utils/cache.js'
import util from '../../utils/util.js'
Page({
  data: {
    hand:0,
    key:'record',
    aname:'sja',
    bname:'sjb',
  },
  onLoad: function (options) {
    this.init()
  },
  onReady: function () {},
  init(){
    // 缓存记录处理
    let options = cache.get(this.data.key)
    if(options){
      this.setData({options})
    }
  },
  // 加
  onAdd(e){
    let hand = this.data.hand;
    hand++
    this.setData({hand})
    this.deal();
  },
  // 减
  onMinus(e){
    let hand = this.data.hand;
    hand--;
    hand = hand<0? 0: hand;
    this.setData({hand})
    this.deal();
  },
  // 记录
  bindPickerChange(e){
    let op = this.data.options;
    let i = Number(e.detail.value);
    if(JSON.stringify(op[i]) != '{}'){
      this.setData({
        title:op[i].title,
        price:op[i].price,
        hand:op[i].hand,
        sj:op[i].sj,
      })
      this.deal();
    }
  },
  // 交易计算
  deal(){
    if(this.data.price && this.data.hand && this.data.sj){
    let price = Number(this.data.price);
    let hand = Number(this.data.hand);
    let total = price * hand;
    let gh = 0; // 过户费
    if(this.data.sj && this.data.sj == this.data.aname){
      gh = 0.00002;
    }
    let max = total * 0.003;  // 最高交易佣金
    let min = 5;  // 最低交易佣金
    if(max < min){
      max = min
    }
    let tax = max + gh;
    this.setData({tax})}
  },
  bindfocus(){
    this.init()
  },
  // 交易所
  radioChange(e){
    let v = e.detail.value;
    this.setData({sj:v})
    this.deal();
  },
  onDetails(){
    let details = !this.data.details;
    this.setData({details})
  },
  formSubmit(e){
    let title = e.detail.value.title;
    let price = e.detail.value.price;
    let hand = this.data.hand;
    let sj = this.data.sj;
    if(title && price && hand && sj){
      let obj = {title,price,hand,sj};
      let data = cache.get(this.data.key);
      if(!data){
        data = [];
        data.push(obj)
        cache.set(this.data.key,data);
      }else{
        cache.set(this.data.key,cache.update(data,obj));
      }
      this.deal();
    }else{
      if(!sjb){
        util.toast('上交和深交的过户费不一样')
      }
      if(!hand){
        util.toast('买了几手啊？')
      }
      if(!price){
        util.toast('股票的单价也要填的')
      }
      if(!title){
        util.toast('要有记录标题才能保存')
      }
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})