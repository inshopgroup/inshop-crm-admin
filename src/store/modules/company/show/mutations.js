import * as types from './mutation_types'

export default {
  [types.COMPANY_SHOW_RESET] (state) {
    Object.assign(state, {
      error: '',
      isLoading: false,
      retrieved: null,
      addresses: [],
      contacts: [],
      companyProducts: [],
      documents: []
    })
  },

  [types.COMPANY_SHOW_SET_ERROR] (state, error) {
    Object.assign(state, { error })
  },

  [types.COMPANY_SHOW_SET_RETRIEVED] (state, retrieved) {
    Object.assign(state, { retrieved })
  },

  [types.COMPANY_SHOW_TOGGLE_LOADING] (state) {
    Object.assign(state, { isLoading: !state.isLoading })
  },

  [types.COMPANY_SHOW_SET_CONTACTS] (state, contacts) {
    Object.assign(state, { contacts })
  },

  [types.COMPANY_SHOW_SET_DOCUMENTS] (state, documents) {
    Object.assign(state, { documents })
  },

  [types.COMPANY_SHOW_SET_COMPANY_PRODUCTS] (state, companyProducts) {
    Object.assign(state, { companyProducts })
  },

  [types.COMPANY_SHOW_SET_ADDRESSES] (state, addresses) {
    Object.assign(state, { addresses })
  },
}
