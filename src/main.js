import moment from 'moment'
import '../node_modules/daterangepicker/daterangepicker'
import '../node_modules/daterangepicker/daterangepicker.css'

import { ServerTable } from 'vue-tables-2'
import Toastr from 'vue-toastr'
import VueSentry from 'vue2-sentry'
import Vue from 'vue'
import dot from 'dot-object'
import VueI18n from 'vue-i18n'
import store from './store'
import router from './router'

import 'babel-polyfill'
import App from './App'
import vuetify from './plugins/vuetify'
import './plugins/ga'
import './plugins/layout'
import './plugins/formComponents'

import 'vue-toastr/src/vue-toastr.scss'
import { messages } from './locales'
import Security from './mixin/Security'
import Translate from './mixin/Translate'
import DateMixin from './mixin/DateMixin'
import StoreModule from './mixin/StoreModule'

Vue.use(VueI18n)
Vue.use(Toastr)
Vue.use(ServerTable, {}, false, 'bootstrap4', 'default')

Vue.use(VueSentry, {
  enable: process.env.VUE_APP_SENTRY_PUBLIC_KEY !== '',
  key: process.env.VUE_APP_SENTRY_PUBLIC_KEY,
  project: process.env.VUE_APP_SENTRY_PROJECT_ID,
  server: process.env.VUE_APP_SENTRY_SERVER,
  protocol: process.env.VUE_APP_SENTRY_PROTOCOL,
  config: {}
})

const i18n = new VueI18n({
  locale: store.state.auth.language,
  messages
})

Vue.mixin(Security)
Vue.mixin(Translate)
Vue.mixin(DateMixin)
Vue.mixin(StoreModule)

window.moment = moment

Vue.prototype.$dot = dot

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
