import axios from 'axios'
import router from '@/router'
import Vue from 'vue'
import store from '@/store'
import {
  updateToken
} from "@/api/auth";
// import sysConfig from '@/utils/sysConfig'




const service = axios.create({
  // baseURL: 'http://192.168.101.115:8089',
  // baseURL: 'http://192.168.108.125',
  timeout: 30 * 1000
})

service.interceptors.request.use(config => {
  //loadding
  if(!(config.params&&config.params.disableLoadding)){
    store.commit('SET_IS_PAGE_LOADDING', true)
  }
  let token = Vue.ls.get('Access-Token')
  if (token) {
    //重置token
    let tokenExpire = Vue.ls.get('Access-Token-Expires-Time')
    //小于5分钟内有请求
    if (tokenExpire && new Date().getTime()-tokenExpire < 5 * 60 * 1000) {
      updateToken().then(response => {
        let responseData = response.data
        let expires_in = responseData.expires_in * 1000
        this.$store.commit("SET_TOKEN", responseData.access_token);
        this.$ls.set("Access-Token-Expires", expires_in)
        this.$ls.set("Access-Token-Expires-Time", new Date().getTime() + expires_in)
        this.$ls.set(
          "Access-Token",
          responseData.access_token,
          expires_in
        );
        this.$ls.set(
          "PERMISSIONS",
          responseData.data,
          expires_in
        );
      });
    }


    const TIME_OFFSET = 0.1
    if (+new Date().getTime() - +store.getters.getLoginTime >= +store.getters.getExpiresIn * 1000) {
      store.dispatch('logout')
      // router.push('/login')
    } else {
      if (+new Date().getTime() - +store.getters.getLoginTime > +store.getters.getExpiresIn * 1000 * TIME_OFFSET) {
        // refresh token
      }
    }

    config.headers['Authorization'] = token

  } else {
    store.dispatch('logout')
    // router.push('/login')
  }

  if (!config.headers.hasOwnProperty('company')) {
    let company = Vue.ls.get('company')

    if (company) {
      config.headers['company'] = company.id
    }
    // config.headers['company'] = 1
  }

  if (!config.headers.hasOwnProperty('shop')) {
    // let shop = Vue.ls.get('shop').id
    let shop 
    if(Vue.ls.get('shop')){
      shop = Vue.ls.get('shop').id
    }
    if (shop) {
      config.headers['shop'] = shop
    }
  }

  return config
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use(
  response => {
    //loadding
    store.commit('SET_IS_PAGE_LOADDING', false)
    return response
  },
  error => {
    //loadding
    store.commit('SET_IS_PAGE_LOADDING', false)
    // let msg = ''
    try {

      // msg = error.response.data.message
      if (error.response.status === 401) {
        if (!store.getters.getIsShowPermissionDialog) {
          store.commit('SET_IS_SHOW_PERMISSION_DIALOG', true)
          Vue.prototype.$confirm({
            title: '错误信息',
            content: '您的登录凭证已失效，是否重新登录？',
            okText: '确认',
            onOk() {
              store.commit('SET_IS_SHOW_PERMISSION_DIALOG', false)
              store.dispatch('logout')
            },
          });
        }

      }
    } catch (e) {
      // msg = error.message
    }
    return Promise.reject(error)
  })

export default service
