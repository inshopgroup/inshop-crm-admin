import * as types from './mutation_types'

export default {
  [types.PRODUCT_SHOW_RESET] (state) {
    Object.assign(state, {
      error: '',
      isLoading: false,
      retrieved: null,
      companyProducts: []
    })
  },

  [types.PRODUCT_SHOW_SET_ERROR] (state, error) {
    Object.assign(state, { error })
  },

  [types.PRODUCT_SHOW_SET_RETRIEVED] (state, retrieved) {
    Object.assign(state, { retrieved })
  },

  [types.PRODUCT_SHOW_TOGGLE_LOADING] (state) {
    Object.assign(state, { isLoading: !state.isLoading })
  },

  [types.PRODUCT_SHOW_SET_COMPANY_PRODUCTS] (state, companyProducts) {
    Object.assign(state, { companyProducts })
  },

  [types.PRODUCT_SHOW_SET_PRODUCT_SELL_PRICES] (state, productSellPrices) {
    Object.assign(state, { productSellPrices })
  },
}
