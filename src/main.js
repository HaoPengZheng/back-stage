import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import Viser from 'viser-vue'
import Moment from 'moment'
import '@/styles/index.less'
import './permission'
import './mock'
import Storage from 'vue-ls';

import vcolorpicker from 'vcolorpicker'

const options = {
  namespace: 'ywq__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'local', // storage name session, local, memory
};

 import { Icon } from 'ant-design-vue';
const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1315685_hj3uqhqejsc.js" // 在 iconfont.cn 上生成
});

Vue.component('my-icon',MyIcon)
Vue.config.productionTip = false
Vue.prototype.$moment = Moment
Vue.use(vcolorpicker)
Vue.use(Antd)
Vue.use(Viser)
Vue.use(Storage,options)


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
