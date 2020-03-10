import axios from 'axios'
import qs from 'qs'
import store from '@/store'
import {Toast} from 'vant'
import router from '@/router'

axios.defaults.timeout = 10000;
axios.defaults.baseURL ='';
//http request 拦截器
axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    let err = JSON.stringify(error)
    // alert(err);
    // Toast('服务器开小差')
    console.log(err)
    return Promise.reject(error);
  }
);


//http response 拦截器
axios.interceptors.response.use(
  response => {       
    return response;
  },
  error => {
    let err = JSON.stringify(error)
    // alert(err);
    // Toast('服务器开小差')
    console.log(err)
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
        token: localStorage.gghToken,
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
    // param.token = localStorage.gghToken
  }
  return new Promise((resolve,reject)=>{
    axios({
      method: 'get',
      params:param,
      url: url,
      headers:{
        token: localStorage.gghToken,
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

export const httpUpload = (url,param={},headers) => {
  return new Promise((resolve,reject)=>{
    axios({
      method: 'post',
      url,
      data:param,
      headers: {
        token: localStorage.gghToken,
        ...headers,
        'Content-Type':'multipart/form-data',
      }
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    });
  });
}