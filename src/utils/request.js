import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'
// import { Message, MessageBox } from 'element-ui'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
})

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  if (store.getters.token) {
    config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带token
  }
  // 设置本机语言
  // if (store.getters.language) {
  //   config.headers['accept-language'] = store.getters.language
  // }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  return Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => response,
  // response => {
  // /**
  // * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
  // * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
  // */
  //   const res = response.data;
  //   if (res && res.RetCode !== 200) {
  //     // 401:无效访问; -123:其他客户端登录了; -114:访问令牌过期; -115:刷新令牌过期; -116:授权异常（无token）
  //     if (res.RetCode === -123 || res.RetCode === -114 || res.RetCode === -115 || res.RetCode === -116) {
  //       MessageBox.confirm('你已被登出，请重新登录', '确定登出', {
  //         confirmButtonText: '重新登录',
  //         closeOnClickModal: false,
  //         type: 'warning'
  //       }).then(() => {
  //         logOut()
  //       }).catch(()=>{
  //         logOut()
  //       })
  //     } else {
  //       return response
  //     }
  //   } else {
  //     return response
  //   }

  //   function logOut() {
  //     store.dispatch('FedLogOut').then(() => {
  //       location.reload() // 为了重新实例化vue-router对象 避免bug
  //     })
  //   }
  // },
  error => {
    console.log('err' + error) // for debug
    // if (error && error.response.status >= 400) {
    //   if (error.response.status === 500) {
    //     Message.error('服务器异常，请刷新后重试，或联系管理员！')
    //   } else {
    //     Message.error(error.response.data.message)
    //   }
    // }
    return Promise.reject(error)
  })

export default service
