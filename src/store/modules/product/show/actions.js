import fetch from '../../../../utils/fetch'
import * as types from './mutation_types'

export const retrieve = ({ commit }, id) => {
  commit(types.PRODUCT_SHOW_TOGGLE_LOADING)

  return fetch(id)
    .then(response => response.json())
    .then((data) => {
      commit(types.PRODUCT_SHOW_TOGGLE_LOADING)
      commit(types.PRODUCT_SHOW_SET_RETRIEVED, data)
    })
    .catch((e) => {
      commit(types.PRODUCT_SHOW_TOGGLE_LOADING)
      commit(types.PRODUCT_SHOW_SET_ERROR, e.message)
    })
}

export const getCompanyProducts = ({ commit }, id) => {
  commit(types.PRODUCT_SHOW_TOGGLE_LOADING)

  return fetch(id + '/company_products')
    .then(response => response.json())
    .then((data) => {
      commit(types.PRODUCT_SHOW_TOGGLE_LOADING)
      commit(types.PRODUCT_SHOW_SET_COMPANY_PRODUCTS, data['hydra:member'])
    })
    .catch((e) => {
      commit(types.PRODUCT_SHOW_TOGGLE_LOADING)
      commit(types.PRODUCT_SHOW_SET_ERROR, e.message)
    })
}

export const getProductSellPrices = ({ commit }, id) => {
  commit(types.PRODUCT_SHOW_TOGGLE_LOADING)

  return fetch(id + '/product_sell_prices')
    .then(response => response.json())
    .then((data) => {
      commit(types.PRODUCT_SHOW_TOGGLE_LOADING)
      commit(types.PRODUCT_SHOW_SET_PRODUCT_SELL_PRICES, data['hydra:member'])
    })
    .catch((e) => {
      commit(types.PRODUCT_SHOW_TOGGLE_LOADING)
      commit(types.PRODUCT_SHOW_SET_ERROR, e.message)
    })
}

export const reset = ({ commit }) => {
  commit(types.PRODUCT_SHOW_RESET)
}
