import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    error: '',
    isLoading: false,
    retrieved: {
      contacts: [],
    },
    contacts: [],
    addresses: [],
    documents: [],
    companyProducts: [],
  },
  actions,
  getters,
  mutations
}
