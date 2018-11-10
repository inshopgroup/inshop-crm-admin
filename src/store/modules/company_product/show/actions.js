import fetch from '../../../../utils/fetch'
import * as types from './mutation_types'

export const retrieve = ({ commit }, id) => {
  commit(types.COMPANY_PRODUCT_SHOW_TOGGLE_LOADING)

  return fetch(id)
    .then(response => response.json())
    .then((data) => {
      commit(types.COMPANY_PRODUCT_SHOW_TOGGLE_LOADING)
      commit(types.COMPANY_PRODUCT_SHOW_SET_RETRIEVED, data)
    })
    .catch((e) => {
      commit(types.COMPANY_PRODUCT_SHOW_TOGGLE_LOADING)
      commit(types.COMPANY_PRODUCT_SHOW_SET_ERROR, e.message)
    })
}

export const reset = ({ commit }) => {
  commit(types.COMPANY_PRODUCT_SHOW_RESET)
}
