
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
  //获取投诉大小类
  getcategory: baseUrl + '/api/method/getcategory',
  //获取可以投诉的订单
  getcomplainedorders: baseUrl + '/api/method/getcomplainedorders',
  //投诉
  addcomplaint: baseUrl + '/api/method/addcomplaint',
  // 退款商品信息
  // http://showdoc.gghbuy.com/web/#/1?page_id=75
  refundGoodsInfo: baseUrl + '/api/method/refundGoodsInfo',
  // 申请退款
  // http://showdoc.gghbuy.com/web/#/1?page_id=71
  refundApply: baseUrl + '/api/method/refundApply',
  // 退款售后列表
  // http://showdoc.gghbuy.com/web/#/1?page_id=70
  refundList: baseUrl + '/api/method/refundList',
  // 退款详情
  // http://showdoc.gghbuy.com/web/#/1?page_id=78
  refundDetail: baseUrl + '/api/method/refundDetail',
  // 物流公司
  // http://showdoc.gghbuy.com/web/#/1?page_id=79
  expressList: baseUrl + '/api/method/expressList',
  // 退款发货
  // http://showdoc.gghbuy.com/web/#/1?page_id=77
  refundGoods: baseUrl + '/api/method/refundGoods',
  //获取积分列表
  //http://showdoc.gghbuy.com/web/#/1?page_id=80
  getCreditGoods: baseUrl + '/api/method/getCreditGoods',
  //获取积分商品详情数据
  //http://showdoc.gghbuy.com/web/#/1?page_id=81
  getCreditGoodsDetail: baseUrl + '/api/method/getCreditGoodsDetail',
  // 记录足迹
  // http://showdoc.gghbuy.com/web/#/1?page_id=86
  history: baseUrl + '/api/method/history',
  // 我的足迹列表
  // http://showdoc.gghbuy.com/web/#/1?page_id=87
  footprint: baseUrl + '/api/method/footprint',
  // 删除我的足迹
  // http://showdoc.gghbuy.com/web/#/1?page_id=88
  deletefootprint: baseUrl + '/api/method/deletefootprint',
}