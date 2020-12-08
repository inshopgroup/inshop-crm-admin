import Vue from 'vue'

import FormComponents from '@inshopgroup/vue-inshop-crm-form-components'
import '@inshopgroup/vue-inshop-crm-form-components/dist/vue-inshop-crm-form-components.css'
import FormInput from '@/components/form/FormInput'
import FormNumber from '@/components/form/FormNumber'
import FormTextarea from '@/components/form/FormTextarea'
import FormCheckbox from '@/components/form/FormCheckbox'
import FormSelect from '@/components/form/FormSelect'

Vue.component('FormInput', FormInput)
Vue.component('FormNumber', FormNumber)
Vue.component('FormTextarea', FormTextarea)
Vue.component('FormCheckbox', FormCheckbox)
Vue.component('FormSelect', FormSelect)

Object.keys(FormComponents).forEach(name => {
  if (!['FormInput', 'FormTextarea', 'FormCheckbox', 'FormNumber', 'FormSelect'].includes(name)) {
    Vue.component(name, FormComponents[name])
  }
})
