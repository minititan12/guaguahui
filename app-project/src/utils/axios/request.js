import {httpPost,httpGet} from './fetch'
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