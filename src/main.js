import 'font-awesome/css/font-awesome.css'
import 'bootstrap'
import 'admin-lte'
import moment from 'moment'

import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/admin-lte/dist/css/AdminLTE.css'
import '../node_modules/admin-lte/dist/css/skins/skin-blue.css'

import '../node_modules/daterangepicker/daterangepicker'
import '../node_modules/daterangepicker/daterangepicker.css'

import store from './store'
import router from './router'

import Vue from 'vue'
import App from './App'

import 'vue-event-calendar/dist/style.css'
import vueEventCalendar from 'vue-event-calendar'
import { ServerTable } from 'vue-tables-2'
import Toastr from 'vue-toastr'
import 'vue-toastr/src/vue-toastr.scss'
import { messages } from './locales'
import VueSentry from 'vue2-sentry'
import vbclass from 'vue-body-class'
import Security from './mixin/Security'
import Translate from './mixin/Translate'
import DateMixin from './mixin/DateMixin'
import VueI18n from 'vue-i18n'
import FormComponents from '@inshopgroup/vue-inshop-crm-form-components'
import '@inshopgroup/vue-inshop-crm-form-components/dist/vue-inshop-crm-form-components.css'

Object.keys(FormComponents).forEach(name => {
  Vue.component(name, FormComponents[name])
})

Vue.use(vbclass, router)
Vue.use(VueI18n)
Vue.use(Toastr)
Vue.use(ServerTable, {}, false, 'bootstrap4', 'default')
Vue.use(vueEventCalendar, { locale: 'en', weekStartOn: 1 }) //locale can be 'zh' , 'en' , 'es', 'pt-br', 'ja', 'ko', 'fr', 'it', 'ru', 'de', 'vi', 'ua'
Vue.use(VueSentry, {
  enable: process.env.NODE_ENV === 'production' && process.env.SENTRY_PUBLIC_KEY !== '',
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

Vue.config.productionTip = false

new Vue({
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
