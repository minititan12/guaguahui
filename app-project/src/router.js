import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('./views/home')
const Product = () => import('./views/product/product')
//pay文件夹
const Pay = () => import('./views/pay/pay.vue')
const Payment = () => import('./views/pay/payment.vue')
const AccessCoupon = () => import('./views/pay/accessCoupon.vue')

//login文件夹
const Login = () => import('./views/login/login.vue')
const GetPhone = () => import('./views/login/getPhone.vue')

//address文件夹
const NewAddress = () => import('./views/address/newAddress.vue')
const AddressList = () => import('./views/address/addressList.vue')

//order文件夹
const OrderPage = () => import('./views/order/orderPage.vue')
const Comment = () => import('./views/order/comment.vue')
const CommentContent = () => import('./views/order/commentContent.vue')
const Logistics = () => import('./views/order/logistics.vue')
const Refund = () => import('./views/order/refund.vue')
const RequestRefund = () => import ('./views/order/requestRefund.vue')
const WaitShare = () => import('./views/order/waitShare.vue')
const OrderDetails = () => import('./views/order/orderDetails.vue')

//marketing文件夹
const LimitBuy = () => import('./views/marketing/limitBuy.vue')
const GroupBuy = () => import('./views/marketing/groupBuy/groupBuy.vue')
const GroupPaySuccess = () => import('./views/marketing/groupBuy/groupPaySuccess.vue')
const MineGroup = () => import('./views/marketing/groupBuy/mineGroup.vue')
const GroupOrderDesc = () => import('./views/marketing/groupBuy/groupOrderDesc.vue')
const GroupOrderShare = () => import('./views/marketing/groupBuy/groupOrderShare.vue')
const Activities = () => import('./views/marketing/activities.vue')
const IntergralShop = () => import('./views/marketing/integralShop.vue')
const CutPrice = () => import('./views/marketing/bargain/cutPrice.vue')
const Bargain = () => import('./views/marketing/bargain/bargain.vue')
const MyBargain = () =>import('./views/marketing/bargain/myBargain.vue')


//product文件夹
const Service = () => import('./views/product/service.vue')
const Shop = () => import('./views/product/shop.vue')
const GetCoupon = () => import('./views/product/getCoupon.vue')
const AllComment = () => import('./views/product/allComment.vue')

//mine文件夹
const Set = () => import('./views/mine/set.vue')
const SetPage = () => import('./views/mine/setPage.vue')
const Complaint = () => import('./views/mine/complaint.vue')
const ComplaintDesc = () => import('./views/mine/complaintDesc.vue')
const Collect = () => import('./views/mine/collect.vue')
const History = () => import('./views/mine/history.vue')
const Coupon = () => import('./views/mine/coupon.vue')
const CouponSearch = () => import('./views/mine/couponSearch.vue')


// 我的钱包
const Wallet = () => import('./views/wallet/wallet.vue')
const BankCard = () => import('./views/wallet/bankCard.vue')
const AddBankCard = () => import('./views/wallet/addBankCard.vue')
const Withdraw = () => import('./views/wallet/withdraw.vue')


//message文件夹
const SystemMessage = () => import('./views/message/systemMessage.vue')
const DealMessage = () => import('./views/message/dealMessage.vue')
const GoodActivity = () => import('./views/message/goodActivity.vue')
const InteractiveMessage = () =>import('./views/message/interactiveMessage.vue')
const OrderMessage = () => import('./views/message/orderMessage.vue')
const SysMsgDetails = () => import('./views/message/sysMsgDetails.vue')

const Goods = () => import('./views/goods.vue')
const Apply = () => import('./views/apply.vue')
const Download = () => import('./views/download.vue')

Vue.use(Router)

// 增强原方法：isBack作为标识来记录前进后退
// Router.prototype.go = function () {
//   this.isBack = true
//   window.history.go(-1)
// }

export default new Router({
  routes: [
    //首页页面组件
    {
      path: '/',
      name: 'home',
      component: Home,
      meta:{
        index: 1,
        keepAlive: true,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
    //产品详情页面组件
    {
      path: '/product',
      name: 'product',
      component: Product,
      meta:{
        index: 3,
        keepAlive: false,
        isImmersion: true,
        color: '#F6F7FB',
        style: 'dark'
      }
    },
    //支付（确认订单）页面组件
    {
      path: '/pay',
      name: 'pay',
      component: Pay,
      meta:{
        index: 4,
        keepAlive: false,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
    //登录页面组件
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta:{
        index: 4,
        keepAlive: false,
        isImmersion: true,
        color: '#FD4140',
        style: 'light'
      }
    },
    //新地址页面组件
    {
      path: '/newAddress',
      name: 'newAddress',
      component: NewAddress,
      meta:{
        index: 6,
        keepAlive: false,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
    //地址列表页面组件
    {
      path: '/addressList',
      name: 'addressList',
      component: AddressList,
      meta:{
        index: 5,
        keepAlive: false,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
    //小分类商品页面组件
    {
      path: '/goods',
      name: 'goods',
      component: Goods,
      meta:{
        index: 2,
        keepAlive: true,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      },
      beforeEnter: (to, from , next)=>{
        // console.log('beforeEnter',to,from)
        if(from.name == 'home' && to.name == 'goods'){
          localStorage.setItem('fromHomeToGoods',true)
        }else{
          localStorage.setItem('fromHomeToGoods',false)
        }
        next()
      }
    },
    //订单页面组件
    {
      path: '/orderPage',
      name: 'orderPage',
      component: OrderPage,
      meta:{
        index: 2,
        keepAlive: true,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
    //订单详情页面组件
    {
      path: '/orderDetails',
      name: 'orderDetails',
      component: OrderDetails,
      meta:{
        index: 2,
        keepAlive: false,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
    //限购页面组件
    {
      path: '/limitBuy',
      name: 'limitBuy',
      component: LimitBuy,
      meta:{
        index: 2,
        keepAlive: false,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
    //客服页面组件
    {
      path: '/service',
      name: 'service',
      component: Service,
      meta:{
        index: 3,
        keepAlive: false,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
    //申请页面组件
    {
      path: '/apply',
      name: 'apply',
      component: Apply,
      meta:{
        index: 4,
        keepAlive: false,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
    //设置主页面组件
    {
      path: '/set',
      name: 'set',
      component: Set,
      meta:{
        index: 2,
        keepAlive: false,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
    //设置详情页面组件
    {
      path: '/setPage',
      name: 'setPage',
      component: SetPage,
      meta:{
        index: 3,
        keepAlive: false,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
    //商店页面组件
    {
      path: '/shop',
      name: 'shop',
      component: Shop,
      meta:{
        index: 3,
        keepAlive: true,
        isImmersion: true,
        color: '#310E0A',
        style: 'light'
      }
    },
    //领取优惠券页面组件
    {
      path: '/getCoupon',
      name: 'getCoupon',
      component: GetCoupon,
      meta:{
        index: 3,
        keepAlive: false,
        isImmersion: true,
        color: '#fff',
        style: 'dark'
      }
    },
    //支付页面组件
    {
      path: '/payment',
      name: 'payment',
      component: Payment,
      meta:{
        index: 6,
        keepAlive: false,
        isImmersion: true,
        color: '#07C160',
        style: 'light'
      }
    },
    //可用优惠劵页面组件
    {
      path: '/accessCoupon',
      name: 'accessCoupon',
      component: AccessCoupon,
      meta:{
        index: 2,
        keepAlive: false,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
    //下载页面组件
    {
      path: '/download',
      name: 'download',
      component: Download,
      meta:{
        index: 7,
        keepAlive: false,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
    //产品页评论页面组件
    {
      path: '/comment',
      name: 'comment',
      component: Comment,
      meta:{
        index: 2,
        keepAlive: false,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
    //评价内容页面组件
    {
      path: '/commentContent',
      name: 'commentContent',
      component: CommentContent,
      meta:{
        index: 3,
        keepAlive: false,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
    //所有评价页面组件
    {
      path: '/allComment',
      name: 'allComment',
      component: AllComment,
      meta:{
        index: 2,
        keepAlive: false,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
    //退款页面组件
    {
      path: '/refund',
      name: 'refund',
      component: Refund,
      meta:{
        index: 2,
        keepAlive: false,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
    //待分享页面组件
    {
      path: '/waitShare',
      name: 'waitShare',
      component: WaitShare,
      meta:{
        index: 2,
        keepAlive: false,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
    //物流信息页面组件
    {
      path: '/logistics',
      name: 'logistics',
      component: Logistics,
      meta:{
        index: 2,
        keepAlive: false,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
    //请求退款页面组件
    {
      path: '/requestRefund',
      name: 'requestRefund',
      component: RequestRefund,
      meta:{
        index: 3,
        keepAlive: false,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
    //手机绑定页面组件
    {
      path: '/getPhone',
      name: 'getPhone',
      component: GetPhone,
      meta:{
        index: 5,
        keepAlive: false,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
    //消息tabbar中精彩活动页面组件
    {
      path: '/goodActivity',
      name: 'goodActivity',
      component: GoodActivity,
      meta:{
        index: 2,
        keepAlive: false,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
    //交易消息页面组件
    {
      path: '/dealMessage',
      name: 'dealMessage',
      component: DealMessage,
      meta:{
        index: 2,
        keepAlive: false,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
    //系统消息页面组件
    {
      path: '/systemMessage',
      name: 'systemMessage',
      component: SystemMessage,
      meta:{
        index: 2,
        keepAlive: false,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
    //系统消息页面组件
    {
      path: '/sysMsgDetails',
      name: 'sysMsgDetails',
      component: SysMsgDetails,
      meta:{
        index: 2,
        keepAlive: false,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
    //订单消息页面组件
    {
      path: '/orderMessage',
      name: 'orderMessage',
      component: OrderMessage,
      meta:{
        index: 2,
        keepAlive: false,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
    // 互动消息列表
    {
      path: '/interactiveMessage',
      name: 'interactiveMessage',
      component: InteractiveMessage,
      meta:{
        index: 2,
        keepAlive: false,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
    //拼团页面组件
    {
      path: '/groupBuy',
      name: 'groupBuy',
      component: GroupBuy,
      meta:{
        index: 2,
        keepAlive: true,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
    //拼团支付成功页面组件
    {
      path: '/groupPaySuccess',
      name: 'groupPaySuccess',
      component: GroupPaySuccess,
      meta:{
        index: 2,
        keepAlive: false,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
    //我的拼团页面组件
    {
      path: '/mineGroup',
      name: 'mineGroup',
      component: MineGroup,
      meta:{
        index: 2,
        keepAlive: false,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
    //拼团订单详情页面
    {
      path: '/groupOrderDesc',
      name: 'groupOrderDesc',
      component: GroupOrderDesc,
      meta:{
        index: 2,
        keepAlive: false,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
    //分享出去的加入拼团页面
    {
      path: '/groupOrderShare',
      name: 'groupOrderShare',
      component: GroupOrderShare,
      meta:{
        index: 2,
        keepAlive: false,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
    //精彩活动页面组件
    {
      path: '/activities',
      name: 'activities',
      component: Activities,
      meta:{
        index: 2,
        keepAlive: false,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
    //积分商城页面组件
    {
      path: '/intergralShop',
      name: 'intergralShop',
      component: IntergralShop,
      meta:{
        index: 2,
        keepAlive: false,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
    //砍价页面组件
    {
      path: '/cutPrice',
      name: 'cutPrice',
      component: CutPrice,
      meta:{
        index: 2,
        keepAlive: false,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
    // 砍价商品详情组件
    {
      path: '/bargain',
      name: 'bargain',
      component: Bargain,
      meta:{
        index: 2,
        keepAlive: false,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
    // 我的砍价商品列表组件
    {
      path: '/myBargain',
      name: 'myBargain',
      component: MyBargain,
      meta:{
        index: 2,
        keepAlive: false,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
    //投诉/举报页面组件
    {
      path: '/complaint',
      name: 'complaint',
      component: Complaint,
      meta:{
        index: 2,
        keepAlive: false,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
    //我的投诉/举报页面组件
    {
      path: '/complaintDesc',
      name: 'complaintDesc',
      component: ComplaintDesc,
      meta:{
        index: 2,
        keepAlive: false,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
    //收藏页面组件
    {
      path: '/collect',
      name: 'collect',
      component: Collect,
      meta:{
        index: 2,
        keepAlive: true,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
    //足迹页面组件
    {
      path: '/history',
      name: 'history',
      component: History,
      meta:{
        index: 2,
        keepAlive: false,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
    //优惠劵页面组件
    {
      path: '/coupon',
      name: 'coupon',
      component: Coupon,
      meta:{
        index: 2,
        keepAlive: false,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
    //优惠券搜索页面组件
    {
      path: '/couponSearch',
      name: 'couponSearch',
      component: CouponSearch,
      meta:{
        index: 2,
        keepAlive: false,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
    //我的钱包页面组件
    {
      path: '/wallet',
      name: 'wallet',
      component: Wallet,
      meta:{
        index: 2,
        keepAlive: false,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
    //银行卡页面组件
    {
      path: '/bankCard',
      name: 'bankCard',
      component: BankCard,
      meta:{
        index: 2,
        keepAlive: false,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
    //添加银行卡页面组件
    {
      path: '/addBankCard',
      name: 'addBankCard',
      component: AddBankCard,
      meta:{
        index: 2,
        keepAlive: false,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
    //提现页面组件
    {
      path: '/withdraw',
      name: 'withdraw',
      component: Withdraw,
      meta:{
        index: 2,
        keepAlive: false,
        isImmersion: true,
        color: '#ffffff',
        style: 'dark'
      }
    },
  ]
})
