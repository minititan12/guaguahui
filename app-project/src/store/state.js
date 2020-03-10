export default {
  //用户
  login: false,                //用户是否登录
  userData: {},                //用户数据
  showAccountLogin: false,     //切换登录方式(账号登录)

  //首页
  currentTab: 1,  //当前首页tab
  toTop: false,   //返回到首页置顶
  mainPageRefresh: false,     //首页下拉刷新
  messageNum: 0,               //首页的消息数量
  mainProductActive: 0,         //首页产品的active

  //首页搜索
  searchText: "",              //首页搜索当前内容   
  showSearch: false,          //显示首页搜索的内容
  
  //goods页面
  currentGoodsInputValue: "",   //当前品牌商品列表中的input值

  //产品详情页面
  showPopUp: false,            //显示商品详情页中上拉框
  servePopUp: false,    //产品详情中的服务弹出框是否显示
  sharePopUp: false,    //产品详情中的分享弹出框是否显示
  currentProductData: null,       //当前产品详情页面数据
  currentProductPopUpImg: "",     //当前产品详情页面上拉购买产品主图
  currentProductPopUpStock: '0',  //当前产品详情页面上拉购买产品库存
  currentBuyDetail: null,         //当前产品已选择属性后的购买信息
  showMasking: false,         //点击商品图片显示遮罩
  currentCreditGoodDetail: null,  //积分商品详情数据
  showProMask: false,         //积分商品中的图片点击显示遮罩
  showProPopUp: false,        //显示积分商品的上拉框
  proPopUpImg: '',            //积分商品弹出框的商品主图
  integralProBuyDetail: null,    //积分商品购买信息

  //购物车页面
  cart: [],                    //购物车页面中的商品数据
  cartRefresh: false,         //购物车刷新
  selectedID: [],              //购物车页面中选择的商品id
  selectedList: [],            //购物车页面中选择的商品数据列表
  selectedAll: false,          //购物车页面中是否选择了全部的商品
  selectedListTotalPrice: 0,   //购物车页面中选择的商品总价格

  //我的页面
  allCount: null,

  //支付数据
  payOrderData: null,          //支付页面数据
  confirmData: null,           //确认页面商品数据
  payRadio: "1",  //支付方式
  confirmList: [],             //需要用户确认的商品数据列表
  confirmListTotalPrice: 0,    //需要用户确认的商品总价格
  waitPayList: [],             //等待支付的商品数据列表
  waitPayListTotalPrice: 0,    //等待支付的商品总价格

  //地址
  defaultAddress: {},          //默认地址数据
  addressList:[],              //地址数据列表

  //分类页面
  classifyList: [],            //分类页面总数据
  currentClassifySort: 0,      //当前选择的分类页面中的大分类是哪个

  //客服页面
  serviceFirstLoad: [],       //客服页面第一次加载的数据
  answer: {},                  //所有的聊天数据
  newAnswer: {},               //存储监听到的新消息,用于message页面的数量统计

  //订单页面
  orderData: null,                //订单页面的订单列表数据
  orderActive: 0,              //订单页面的tab选择

  //微信数据
  wxTicket: "",                //微信ticket
  openid: null,                //微信获取的openid
  aweixin: null,               //微信的数据

  //营销功能
  //拼团
  groupBuyData: null,                //拼团产品购买的数据
  groupGoodsDes: null,          //拼团产品信息
  groupBuyID: -1,               //拼团产品页中的拼单选择

  allSpellGroups: [],           //所有这个拼团商品已有的拼单
  showGroupDialog:{ value: false },            //显示拼团的弹窗

  // 砍价功能
  // 砍价商品数据
  bargainData:{},
  // 分享的信息
  shareInfo:{},

  // 消息的未读数
  unread:null,

  //秒杀产品数据
  seckillData: null,
}