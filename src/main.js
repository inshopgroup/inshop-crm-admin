// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'font-awesome/css/font-awesome.css'

// import jQuery from 'jquery'

// import 'bootstrap/dist/js/bootstrap.js'

import 'bootstrap'
import 'admin-lte'
import 'jquery'
import 'icheck'
import moment from 'moment'

import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/admin-lte/dist/css/AdminLTE.css'
import '../node_modules/admin-lte/dist/css/skins/skin-blue.css'
import '../node_modules/icheck/skins/square/blue.css'

import '../node_modules/daterangepicker/daterangepicker'
import '../node_modules/daterangepicker/daterangepicker.css'

import store from './store'
import router from './router'

import Vue from 'vue'
import App from './App';
// import BootstrapVue from 'bootstrap-vue'
import vSelect from 'vue-select/dist/vue-select'

import 'vue-event-calendar/dist/style.css' //^1.1.10, CSS has been extracted as one file, so you can easily update it.
import vueEventCalendar from 'vue-event-calendar'
import 'vue2-dropzone/dist/vue2Dropzone.css'
import {ServerTable} from 'vue-tables-2';
import Toastr from 'vue-toastr';
import 'vue-toastr/src/vue-toastr.scss'
import VuePassword from 'vue-password'
import {messages} from './locales'
import VueSentry from 'vue2-sentry'
import vbclass from 'vue-body-class'
import Security from './mixin/Security'
import Translate from './mixin/Translate'
import VueI18n from 'vue-i18n'

Vue.use( vbclass, router )

// window.jQuery = jQuery
window.$ = jQuery
window.moment = moment

Vue.use(VueI18n)
Vue.use(Toastr)
Vue.use(ServerTable, {}, false, 'bootstrap4', 'default');
Vue.use(vueEventCalendar, {locale: 'en', weekStartOn: 1}) //locale can be 'zh' , 'en' , 'es', 'pt-br', 'ja', 'ko', 'fr', 'it', 'ru', 'de', 'vi', 'ua'
// Vue.use(BootstrapVue);

Vue.component('v-select', vSelect)
Vue.component(VuePassword)

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

$(function () {
  $('input').iCheck({
    checkboxClass: 'icheckbox_square-blue',
    radioClass: 'iradio_square-blue',
    increaseArea: '20%' /* optional */
  });
});

Vue.mixin(Security)
Vue.mixin(Translate)

new Vue({
  el: '#app',
  store,
  router,
  i18n,
  render: h => h(App)
})
