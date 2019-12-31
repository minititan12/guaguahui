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
