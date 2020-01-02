import {httpPost,httpGet,httpUpload} from './fetch'
import api from './api.js'

//login页面
//login
export const login = (param = {}) => {
  return httpPost(api.login,param);
}

//注册
export const register = (param = {}) => {
  return httpPost(api.register,param);
}

//获取验证码
export const getCode = (param = {}) => {
  return httpPost(api.getCode,param);
}

//设置默认地址
export const setAddressDefault = (param = {}) => {
  return httpPost(api.setAddressDefault,param);
}

//删除地址
export const delAddress = (param = {}) => {
  return httpPost(api.delAddress,param);
}

//获取地址
export const getAddress = (param = {}) => {
  return httpPost(api.getAddress,param);
}

//修改地址
export const updateAddress = (param = {}) => {
  return httpPost(api.updateAddress,param);
}

//添加地址
export const addAddress = (param = {}) => {
  return httpPost(api.addAddress,param);
}

//初始化地址，判断地址是修改还是添加
export const editAddress = (param = {}) => {
  return httpPost(api.editAddress,param);
}

//获取默认地址
export const getDefault = (param = {}) => {
  return httpPost(api.getDefault,param);
}

//获取分类页商品数据
export const getBrandGoods = (param = {}) => {
  return httpPost(api.getBrandGoods,param);
}

//获取分类页搜索数据
export const searchbrandGoods = (param = {}) => {
  return httpPost(api.searchbrandGoods,param);
}

//获取秒杀页面数据
export const getSeckillGoods = (param = {}) => {
  return httpPost(api.getSeckillGoods,param);
}

//商品详情页
//获取该商品所有拼团的信息
export const getAllSpellGroups = (param = {}) => {
  return httpPost(api.getAllSpellGroups,param);
}

//获取拼团商品的描述信息
export const getGroupGoodsdec = (param = {}) => {
  return httpPost(api.getGroupGoodsdec,param);
}

//获取所有该商品可用的优惠券信息
export const getAllShopsCoupons = (param = {}) => {
  return httpPost(api.getAllShopsCoupons,param);
}

//获取秒杀商品的描述
export const getSeckillGoodsDes = (param = {}) => {
  return httpPost(api.getSeckillGoodsDes,param);
}

//获取可分享的该商品拼团信息
export const getShareSpellGroup = (param = {}) => {
  return httpPost(api.getShareSpellGroup,param);
}

//获取服务弹出框信息
export const explain = (param = {}) => {
  return httpGet(api.explain,param);
}

//获取当前聊天信息
export const getcontent = (param = {}) => {
  return httpPost(api.getcontent,param);
}

//储存聊天信息
export const storagecontent = (param = {}) => {
  return httpPost(api.storagecontent,param);
}

// 获取消息红点
export const getMsgRedtotal = (param = {}) => {
  return httpPost(api.getMsgRedtotal,param);
}

// 获取消息列表
export const getMsgList = (param = {}) => {
  return httpPost(api.getMsgList,param);
}

// 用户阅读消息
export const readMsg = (param = {}) => {
  return httpPost(api.readMsg,param);
}

//获取用户的最新信息
export const get_user_id = (param = {}) => {
  return httpPost(api.get_user_id,param);
}

//修改头像
export const headimg = (param = {}) => {
  return httpPost(api.headimg,param);
}

//修改用户名
export const editnickname = (param = {}) => {
  return httpPost(api.editnickname,param);
}

//商户入驻
export const application = (param = {}) => {
  return httpPost(api.application,param);
}

//获取选择用的分类
export const getbrand = (param = {}) => {
  return httpGet(api.getbrand,param);
}

//商店页面
//获取商店商品列表
export const getshopgoods = (param = {}) => {
  return httpPost(api.getshopgoods,param);
}

//点击收藏
export const doCollect = (param = {}) => {
  return httpPost(api.doCollect,param);
}

//检查是否收藏
export const checkCollects = (param = {}) => {
  return httpPost(api.checkCollects,param);
}

// 绑定银行卡
export const bindBank = (param = {}) => {
  return httpPost(api.bindBank,param);
}

// 银行卡列表
export const bankList = (param = {}) => {
  return httpGet(api.bankList,param);
}

// 我绑定的银行卡
export const myBindBank = (param = {}) => {
  return httpGet(api.myBindBank,param);
}

// 提现
export const withdraw = (param = {}) => {
  return httpPost(api.withdraw,param);
}

// 佣金明细
export const commissionLog = (param = {}) => {
  return httpGet(api.commissionLog,param);
}

// 用户解绑银行卡
export const unbindBank = (param = {}) => {
  return httpPost(api.unbindBank,param);
}

//删除购物车中的对应订单
export const delCart = (param = {}) => {
  return httpPost(api.delCart,param);
}

//下订单
export const makeOrder = (param = {}) => {
  return httpPost(api.makeOrder,param);
}

//获取订单列表
export const getMyOrder = (param = {}) => {
  return httpPost(api.getMyOrder,param);
}

// 订单详情
export const orderDetail = (param = {}) => {
  return httpGet(api.orderDetail,param);
}

// 取消订单
export const cancelOrder = (param = {}) => {
  return httpPost(api.cancelOrder,param);
}

// 删除订单
export const delOrder = (param = {}) => {
  return httpPost(api.delOrder,param);
}

// 确认收货
export const receipt = (param = {}) => {
  return httpPost(api.receipt,param);
}

// 物流信息
export const logisticsDetails = (param = {}) => {
  return httpPost(api.logisticsDetails,param);
}

// 上传评价图片
export const evaImageUpload = (param = {}) => {
  return httpUpload(api.evaImageUpload,param);
}

//获取投诉大小类
export const getcategory = (param = {}) => {
  return httpGet(api.getcategory,param);
}

//获取可以投诉的订单
export const getcomplainedorders = (param = {}) => {
  return httpPost(api.getcomplainedorders,param);
}

//投诉
export const addcomplaint = (param = {}) => {
  return httpPost(api.addcomplaint,param);
}

// 退款商品信息
export const refundGoodsInfo = (param = {}) => {
  return httpGet(api.refundGoodsInfo,param);
}

// 申请退款
export const refundApply = (param = {}) => {
  return httpPost(api.refundApply,param);
}

// 退款售后列表
export const refundList = (param = {}) => {
  return httpGet(api.refundList,param);
}

// 退款详情
export const refundDetail = (param = {}) => {
  return httpGet(api.refundDetail,param);
}

// 物流公司
export const expressList = (param = {}) => {
  return httpGet(api.expressList,param);
}

// 退款发货
export const refundGoods = (param = {}) => {
  return httpPost(api.refundGoods,param);
}

//点击砍价
export const doBargin = (param = {}) => {
  return httpPost(api.doBargin,param);
}

//获取当前订单优惠券信息
export const getShopCoupons = (param = {}) => {
  return httpPost(api.getShopCoupons,param);
}

//获取积分
export const getCredit = (param = {}) => {
  return httpGet(api.getCredit,param);
}

//积分列表
export const getCreditGoods = (param = {}) => {
  return httpGet(api.getCreditGoods,param);
}

//积分商品详情
export const getCreditGoodsDetail = (param = {}) => {
  return httpGet(api.getCreditGoodsDetail,param);
}

//积分商品下订单
export const creditGoodsOrder = (param = {}) => {
  return httpPost(api.creditGoodsOrder,param);
}

//积分明细
//creditLog
export const creditLog = (param = {}) => {
  return httpGet(api.creditLog,param);
}

//积分兑换记录
export const creditOrderList = (param = {}) => {
  return httpGet(api.creditOrderList,param);
}

//记录足迹
export const history = (param = {}) => {
  return httpGet(api.history,param);
}

//我的足迹列表
export const footprint = (param = {}) => {
  return httpGet(api.footprint,param);
}

//删除我的足迹
export const deletefootprint = (param = {}) => {
  return httpGet(api.deletefootprint,param);
}
