import Vue from 'vue'

import FormComponents from '@inshopgroup/vue-inshop-crm-form-components'
import '@inshopgroup/vue-inshop-crm-form-components/dist/vue-inshop-crm-form-components.css'
import FormInput from '@/components/form/FormInput'

Vue.component('FormInput', FormInput)


Object.keys(FormComponents).forEach(name => {
  if (!['FormInput'].includes(name)) {
    Vue.component(name, FormComponents[name])
  }
})
