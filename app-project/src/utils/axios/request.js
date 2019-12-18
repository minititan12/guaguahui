import {httpPost,httpGet,httpUpload} from './fetch'
import api from './api.js'

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

// 退款商品信息
export const refundGoodsInfo = (param = {}) => {
  return httpGet(api.refundGoodsInfo,param);
}

// 申请退款
export const refundApply = (param = {}) => {
  return httpPost(api.refundApply,param);
}