import Vue from 'vue'

import { ServerTable } from 'vue-tables-2'
import DateMixin from '@/mixin/DateMixin.vue'
import Security from '@/mixin/IsSecurity.vue'
import Translate from '@/mixin/IsTranslate.vue'

Vue.use(ServerTable, {}, false, 'bootstrap4', 'default')

Vue.mixin(DateMixin)
Vue.mixin(Security)
Vue.mixin(Translate)
