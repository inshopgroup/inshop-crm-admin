import moment from 'moment'
import '../node_modules/daterangepicker/daterangepicker'
import '../node_modules/daterangepicker/daterangepicker.css'

import store from './store'
import router from './router'

import 'babel-polyfill'
import App from './App'
import Vue from 'vue'
import vuetify from './plugins/vuetify'
import './plugins/layout'
import './plugins/formComponents'

import { ServerTable } from 'vue-tables-2'
import Toastr from 'vue-toastr'
import 'vue-toastr/src/vue-toastr.scss'
import { messages } from './locales'
import VueSentry from 'vue2-sentry'
import dot from 'dot-object'
import vbclass from 'vue-body-class'
import Security from './mixin/Security'
import Translate from './mixin/Translate'
import DateMixin from './mixin/DateMixin'
import VueI18n from 'vue-i18n'

Vue.use(vbclass, router)
Vue.use(VueI18n)
Vue.use(Toastr)
Vue.use(ServerTable, {}, false, 'bootstrap4', 'default')

Vue.use(VueSentry, {
  enable: process.env.SENTRY_PUBLIC_KEY !== '',
  key: process.env.SENTRY_PUBLIC_KEY,
  project: process.env.SENTRY_PROJECT_ID,
  server: process.env.SENTRY_SERVER,
  protocol: process.env.SENTRY_PROTOCOL,
  config: {}
})

let i18n = new VueI18n({
  locale: store.state.auth.language,
  messages
})

Vue.mixin(Security)
Vue.mixin(Translate)
Vue.mixin(DateMixin)

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
