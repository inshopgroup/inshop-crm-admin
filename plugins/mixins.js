import Vue from 'vue'

import DateMixin from '@/mixin/DateMixin'
import Security from '@/mixin/Security'
import Translate from '@/mixin/Translate'

import { ServerTable } from 'vue-tables-2'

Vue.use(ServerTable, {}, false, 'bootstrap4', 'default')

Vue.mixin(DateMixin)
Vue.mixin(Security)
Vue.mixin(Translate)
