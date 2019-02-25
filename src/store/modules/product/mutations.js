import * as types from './mutation_types'
import defaultState from './state'

export default {
  [types.SET_ITEM] (state, item) {
    Object.assign(state, { item })
  },
  [types.UPDATE_ITEM] (state, item) {
    state.item = Object.assign({}, state.item, item)
  },
  [types.UPDATE_ITEM_TRANSLATION] (state, params) {
    state.item.translations.some(translation => {
      if (translation.language.code === params.language.code) {
        translation[params.property] = params.value
      }
    })
  },
  [types.SET_ITEMS] (state, items) {
    Object.assign(state, { items })
  },
  [types.SET_COMPANY_PRODUCTS] (state, companyProducts) {
    Object.assign(state, { companyProducts })
  },
  [types.SET_PRODUCT_SELL_PRICES] (state, productSellPrices) {
    Object.assign(state, { productSellPrices })
  },
  [types.SET_ERROR] (state, error) {
    Object.assign(state, { error })
  },
  [types.SET_ERRORS] (state, errors) {
    Object.assign(state, { errors })
  },
  [types.RESET] (state) {
    Object.assign(state, defaultState())
  }
}
