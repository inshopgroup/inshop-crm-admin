import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    error: '',
    isLoading: false,
    retrieved: {
      companies: [],
      clients: []
    },
    projects: [],
    documents: [],
    contacts: [],
    addresses: []
  },
  actions,
  getters,
  mutations
}
