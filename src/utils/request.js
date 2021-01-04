import axios from 'axios'
import { Loading, MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { debounce } from '@/utils'

const LoadingHandler = class {
  static loadingHandler = null
  static loadingCount = 0
  static excludeList = new Set(['/user/logout', '/user/login', '/user/info'])
  static debounceHideLoading = debounce(() => {
    if (this.loadingHandler) {
      this.loadingHandler.close()
      this.loadingHandler = null
    }
  }, 300)

  static showLoading(url) {
    const withoutLoading = this.excludeList.has(url)
    if (withoutLoading) return

    if (this.loadingCount === 0 && !this.loadingHandler) {
      this.loadingHandler = Loading.service({
        lock: true,
        text: 'Loading...',
        background: 'rgba(255, 255, 255, 0.5)'
      })
    }
    this.loadingCount++
  }

  static hideLoading() {
    this.loadingCount--
    this.loadingCount = Math.max(this.loadingCount, 0)
    if (this.loadingCount === 0) {
      this.debounceHideLoading()
    }
  }
}

const resCode = {
  'OK': 0, // 请求成功
  'ERR': -100, // 其他错误
  'ILLEGAL_TOKEN': -101, // 非法的 Token
  'OTHER_LOGGED': -102, // 在其他客户端登录
  'EXPIRED_TOKEN': -103 // Token 已过期
}

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60 * 1000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    // 在请求头设置 withoutLoading = true 时，忽略 loading 显示
    const { url } = config
    LoadingHandler.showLoading(url)

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
      config.headers['Authorization'] = 'JWT' + getToken()
    }
    return config
  },
  error => {
    // do something with request error
    LoadingHandler.hideLoading()

    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    LoadingHandler.hideLoading()

    const res = response.data

    // if the custom code is not 0, it is judged as an error.
    if (res.code !== resCode.OK) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      if (res.code === resCode.ILLEGAL_TOKEN || res.code === resCode.OTHER_LOGGED || res.code === resCode.EXPIRED_TOKEN) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    LoadingHandler.hideLoading()

    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
