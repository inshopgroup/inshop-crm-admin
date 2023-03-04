import Vue from 'vue'

import { ServerTable } from 'vue-tables-2'
import DateMixin from '@/mixin/DateMixin'
import Security from '@/mixin/Security'
import Translate from '@/mixin/Translate'

Vue.use(ServerTable, {}, false, 'bootstrap4', 'default')

Vue.mixin(DateMixin)
Vue.mixin(Security)
Vue.mixin(Translate)
