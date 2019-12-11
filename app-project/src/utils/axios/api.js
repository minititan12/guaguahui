
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
}