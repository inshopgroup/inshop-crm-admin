import * as types from './mutation_types'
import defaultState from './state'

export default {
  [types.SET_ITEM](state, item) {
    Object.assign(state, { item })
  },
  [types.UPDATE_ITEM](state, item) {
    state.item = Object.assign({}, state.item, item)
  },
  [types.UPDATE_ITEM_TRANSLATION](state, params) {
    let isNew = true

    state.item.translations.some(translation => {
      if (translation.language.code === params.language.code) {
        translation[params.property] = params.value
        isNew = false
      }
    })

    if (isNew) {
      state.item.translations.push({
        language: params.language,
        [params.property]: params.value
      })
    }
  },
  [types.SET_ITEMS](state, items) {
    Object.assign(state, { items })
  },
  [types.SET_COMPANY_PRODUCTS](state, companyProducts) {
    Object.assign(state, { companyProducts })
  },
  [types.SET_PRODUCT_SELL_PRICES](state, productSellPrices) {
    Object.assign(state, { productSellPrices })
  },
  [types.SET_ERROR](state, error) {
    Object.assign(state, { error })
  },
  [types.SET_ERRORS](state, errors) {
    Object.assign(state, { errors })
  },
  [types.RESET](state) {
    Object.assign(state, defaultState())
  },
  [types.ADD_FILE](state, file) {
    state.item.images.push(file)
  },
  [types.DELETE_FILE](state, fileId) {
    state.item.images = state.item.images.filter(file => file.id !== fileId)
  }
}
