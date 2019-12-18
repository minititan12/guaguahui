
const baseUrl = process.env.VUE_APP_REQUEST_HOST;

export default {
  // 用户阅读消息
  // http://showdoc.gghbuy.com/web/#/1?page_id=58
  readMsg: baseUrl + '/api/method/readMsg',
  // 获取消息红点
  // http://showdoc.gghbuy.com/web/#/1?page_id=59
  getMsgRedtotal: baseUrl + '/api/method/getMsgRedtotal',
  // 获取消息列表
  // http://showdoc.gghbuy.com/web/#/1?page_id=57
  getMsgList: baseUrl + '/api/method/getMsg',
  // 用户阅读消息
  // http://showdoc.gghbuy.com/web/#/1?page_id=58
  readMsg: baseUrl + '/api/method/readMsg',
  // 绑定银行卡
  // http://showdoc.gghbuy.com/web/#/1?page_id=41
  bindBank: baseUrl + '/api/method/bindBank',
  // 银行卡列表
  // http://showdoc.gghbuy.com/web/#/1?page_id=42
  bankList: baseUrl + '/api/method/bankList',
  // 我绑定的银行卡
  myBindBank: baseUrl + '/api/method/myBindBank',
  // 提现
  // http://showdoc.gghbuy.com/web/#/1?page_id=44
  withdraw: baseUrl + '/api/method/withdraw',
  // 佣金明细
  // http://showdoc.gghbuy.com/web/#/1?page_id=45
  commissionLog: baseUrl + '/api/method/commissionLog',
  // 用户解绑银行卡
  // http://showdoc.gghbuy.com/web/#/1?page_id=46
  unbindBank: baseUrl + '/api/method/unbindBank',
  // 订单详情
  // http://showdoc.gghbuy.com/web/#/1?page_id=69
  orderDetail: baseUrl + '/api/method/orderDetail',
  // 取消订单
  cancelOrder: baseUrl + '/api/method/cancelOrder',
  // 删除订单
  delOrder: baseUrl + '/api/method/delOrder',
  // 确认收货
  receipt: baseUrl + '/api/method/receipt',
  // 物流消息
  // http://showdoc.gghbuy.com/web/#/1?page_id=67
  logisticsDetails: baseUrl + '/api/method/logisticsDetails',
  // 评价图片上传
  evaImageUpload: baseUrl + '/api/method/show_img_upload',
<<<<<<< HEAD
  //获取投诉大小类
  getcategory: baseUrl + '/api/method/getcategory',
  //获取可以投诉的订单
  getcomplainedorders: baseUrl + '/api/method/getcomplainedorders',
  //投诉
  addcomplaint: baseUrl + '/api/method/addcomplaint',
=======
  // 退款商品信息
  // http://showdoc.gghbuy.com/web/#/1?page_id=75
  refundGoodsInfo: baseUrl + '/api/method/refundGoodsInfo',
  // 申请退款
  // http://showdoc.gghbuy.com/web/#/1?page_id=71
  refundApply: baseUrl + '/api/method/refundApply',
>>>>>>> a0b939463b8a90371aac50570502c6af150ab3c0
}