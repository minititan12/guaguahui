
const baseUrl = process.env.VUE_APP_REQUEST_HOST;

export default {
  //地址
  //设置默认地址
  setAddressDefault: baseUrl + '/api/method/setAddressDefault',
  //删除地址
  delAddress: baseUrl + '/api/method/delAddress',
  //获取地址
  getAddress: baseUrl + '/api/method/getAddress',
  //修改地址
  updateAddress: baseUrl + '/api/method/updateAddress',
  //添加地址
  addAddress: baseUrl + '/api/method/addAddress',
  //初始化地址判断是修改还是添加
  editAddress: baseUrl + '/api/method/editAddress',
  //获取默认地址
  getDefault: baseUrl + '/api/method/getDefault',

  //秒杀页面
  //获取秒杀数据
  getSeckillGoods: baseUrl + '/api/method/getSeckillGoods',

  //登录页面
  //登录
  login: baseUrl + '/api/method/Login',
  //注册
  register: baseUrl + '/api/method/register',
  //获取验证码
  getCode: baseUrl + '/api/method/getCode',
  //绑定手机
  bindPhone: baseUrl + '/api/method/bindPhone',
  //利用token判断登录状态
  getLoginStatus: baseUrl + '/api/method/getLoginStatus',

  //确认订单(pay)页面
  //删除购物车中的对应订单
  delCart: baseUrl + '/api/method/delCart',
  //下订单
  makeOrder: baseUrl + '/api/method/makeOrder',


  //分类商品页
  //获取商品数据
  getBrandGoods: baseUrl + '/api/method/getBrandGoods',
  //获取搜索商品数据
  searchbrandGoods: baseUrl + '/api/method/searchbrandGoods',


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


  //获取订单信息
  getMyOrder: baseUrl + '/api/method/getMyOrder',
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


  //产品详情页
  //获取商品信息
  getGoodsInfo: baseUrl + '/api/method/getGoodsInfo',
  //获取该商品所有组队拼团信息
  getAllSpellGroups: baseUrl + '/api/method/getAllSpellGroups',
  //获取该商品拼团信息的描述
  getGroupGoodsdec: baseUrl + '/api/method/getGroupGoodsdec',
  //获取所有商店优惠券信息
  getAllShopsCoupons: baseUrl + '/api/method/getAllShopsCoupons',
  //获取秒杀商品的商品描述
  getSeckillGoodsDes: baseUrl + '/api/method/getSeckillGoodsDes',
  //获取可分享的拼团队伍信息
  getShareSpellGroup: baseUrl + '/api/method/getShareSpellGroup',
  //获取服务窗口信息
  explain: baseUrl + '/api/method/explain',
  //获取评价列表
  showCommentList: baseUrl + '/api/method/showCommentList',
  //获取可用的优惠券
  getCoupons: baseUrl + '/api/method/getCoupons',
  //获取微信的openid
  getOpenid: baseUrl + '/index/index/getOpenid',
  //加入购物车
  addCart: baseUrl + '/api/method/addCart',


  //客服页面
  //获取聊天历史内容
  getcontent: baseUrl + '/api/method/getcontent',
  //储存聊天内容
  storagecontent: baseUrl + '/api/method/storagecontent',


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


  //砍价
  //点击砍价
  doBargin: baseUrl + '/api/method/doBargin',


  //获取当前订单的优惠券信息
  getShopCoupons: baseUrl + '/api/method/getShopCoupons',


  //设置页面
  //获取当前用户的最新信息
  get_user_id: baseUrl + '/api/method/get_user_id',
  //改变用户头像
  headimg: baseUrl + '/api/method/headimg',
  //改变用户名
  editnickname: baseUrl + '/api/method/editnickname',
  //入驻商铺
  applicationL: baseUrl + '/api/method/application',
  //获取选择的分类
  getbrand: baseUrl + '/api/method/getbrand',


  //商店页面
  //获取该商店商品列表
  getshopgoods: baseUrl + '/api/method/getshopgoods',
  //点击收藏
  doCollect: baseUrl + '/api/method/doCollect',
  //判断是否收藏
  checkCollects: baseUrl + '/api/method/checkCollects',

  //营销功能
  //砍价细节
  barginGoodsDetail: baseUrl + '/api/method/barginGoodsDetail',
  //砍价列表
  barginlist: baseUrl + '/api/method/barginlist',
  //我的砍价列表
  myBarginList: baseUrl + '/api/method/myBarginList',

  //拼团
  //获取拼团热门商品
  getSpellGroupHotGoods: baseUrl + '/api/method/getSpellGroupHotGoods',
  //获取拼团商品列表
  getSpellGroupGoods: baseUrl + '/api/method/getSpellGroupGoods',
  //获取分享页的拼团信息
  getShareSpellGroupDes: baseUrl + '/api/method/getShareSpellGroupDes',
  //用户参加拼团
  userDoSpellGroup: baseUrl + '/api/method/userDoSpellGroup',
  //用户加入拼团
  userPartSpellGroup: baseUrl + '/api/method/userPartSpellGroup',
  //获取可分享的拼团信息
  getShareSpellGroup: baseUrl + '/api/method/getShareSpellGroup',

  //获取积分
  //http://showdoc.gghbuy.com/web/#/1?page_id=89
  getCredit: baseUrl + '/api/method/getCredit',
  //获取积分列表
  //http://showdoc.gghbuy.com/web/#/1?page_id=80
  getCreditGoods: baseUrl + '/api/method/getCreditGoods',
  //获取积分商品详情数据
  //http://showdoc.gghbuy.com/web/#/1?page_id=81
  getCreditGoodsDetail: baseUrl + '/api/method/getCreditGoodsDetail',
  //提交积分商品订单
  //http://showdoc.gghbuy.com/web/#/1?page_id=82
  creditGoodsOrder: baseUrl + '/api/method/creditGoodsOrder',
  //积分明细
  //http://showdoc.gghbuy.com/web/#/1?page_id=84
  creditLog: baseUrl + '/api/method/creditLog',
  //积分兑换记录
  //http://showdoc.gghbuy.com/web/#/1?page_id=83
  creditOrderList: baseUrl + '/api/method/creditOrderList',


  //我的
  //获取收藏列表
  getCollects: baseUrl + '/api/method/getCollects',
  //获取我的优惠券
  getMyCoupons: baseUrl + '/api/method/getMyCoupons',

  //显示评价
  showComment: baseUrl + '/api/method/showComment',

  // 记录足迹
  // http://showdoc.gghbuy.com/web/#/1?page_id=86
  history: baseUrl + '/api/method/history',
  // 我的足迹列表
  // http://showdoc.gghbuy.com/web/#/1?page_id=87
  footprint: baseUrl + '/api/method/footprint',
  // 删除我的足迹
  // http://showdoc.gghbuy.com/web/#/1?page_id=88
  deletefootprint: baseUrl + '/api/method/deletefootprint',

  //支付页面
  //支付
  pay: baseUrl + '/api/method/pay',
  //支付宝外部网页支付
  doPay: baseUrl + '/api/method/doPay',

  //App
  //获取微信code
  getWxcode: baseUrl + '/index/index/getWxcode',
  //获取签名包
  signpackage: baseUrl + '/api/index/signpackage',
  //获取融云token
  getRongYunToken: baseUrl + '/api/method/getRongYunToken',

  //home
  //首页获取推荐
  recommend: baseUrl + '/api/method/recommend',
  //首页获取轮播图
  lunbo: baseUrl + '/api/method/lunbo',
  //首页获取分类
  getClass: baseUrl + '/api/method/getClass',
  //首页获取热销商品列表
  hotlist: baseUrl + '/api/method/hotlist',
  //首页获取分类品牌
  getClassbrand: baseUrl + '/api/method/getClassbrand',
  //首页获取秒杀
  checkSeckill: baseUrl + '/api/method/checkSeckill',
  //首页获取产品
  getGoods: baseUrl + '/api/method/getGoods',
  //首页推荐产品
  getReconmendGoods: baseUrl + '/api/method/getReconmendGoods',
  //首页获取品牌广告信息
  brandadsense: baseUrl + '/api/method/brandadsense',
  //首页获取商品广告信息
  goodsadsense: baseUrl + '/api/method/goodsadsense',
  //获取用户的聊天信息
  getuserchat: baseUrl + '/api/method/getuserchat',
  //获取用户的信息细节
  userDetails: baseUrl + '/api/method/userDetails',
  //删除聊天
  deleteshat: baseUrl + '/api/method/deleteshat',
  //获取用户的优惠券总数
  getUserCouponsTotal: baseUrl + '/api/method/getUserCouponsTotal',
  //获取用户的收藏总数
  getUserCollects: baseUrl + '/api/method/getUserCollects',
  //获取各种订单的数量
  count: baseUrl + '/api/method/count',
  //提交确认订单
  comfirmOrder: baseUrl + '/api/method/comfirmOrder',
  //购物车商品信息
  showCart: baseUrl + '/api/method/showCart',
  //查找商品
  searchGoods: baseUrl + '/api/method/searchGoods',
}