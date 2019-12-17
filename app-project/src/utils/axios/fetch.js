import axios from 'axios'
import qs from 'qs'
import store from '@/store'
import {Toast} from 'vant'

axios.defaults.timeout = 5000;
axios.defaults.baseURL ='';
//http request 拦截器
axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    Toast("服务器开小差");
    return Promise.reject(error);
  }
);


//http response 拦截器
axios.interceptors.response.use(
  response => {       
    return response;
  },
  error => {
    Toast("服务器开小差");
    return Promise.reject(error)
  }
)

export const httpPost = (url,param={},headers) => {
  if(store.state.userData){
    param.user_id = store.state.userData.id
  }
  return new Promise((resolve,reject)=>{
    axios({
      method: 'post',
      url,
      data:qs.stringify(param),
      headers: {
        ...headers
      }
    })
    .then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    });
  });
}
export const httpGet = (url,param={},headers) => {
  if(store.state.userData){
    param.user_id = store.state.userData.id
  }
  return new Promise((resolve,reject)=>{
    axios({
      method: 'get',
      params:param,
      url: url,
      headers:{
        ...headers,
        'Content-Type':'application/x-www-form-urlencoded'
      }
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    });
  });
}

export const httpUpload = (url,param={}) => {
  return new Promise((resolve,reject)=>{
    axios({
      method: 'post',
      url,
      data:param,
      headers: {
        'Content-Type':'multipart/form-data',
      }
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    });
  });
}