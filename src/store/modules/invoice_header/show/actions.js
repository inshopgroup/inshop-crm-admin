import fetch from '../../../../utils/fetch'
import * as types from './mutation_types'

export const retrieve = ({ commit }, id) => {
  commit(types.INVOICEHEADER_SHOW_TOGGLE_LOADING)

  return fetch(id)
    .then(response => response.json())
    .then((data) => {
      commit(types.INVOICEHEADER_SHOW_TOGGLE_LOADING)
      commit(types.INVOICEHEADER_SHOW_SET_RETRIEVED, data)
    })
    .catch((e) => {
      commit(types.INVOICEHEADER_SHOW_TOGGLE_LOADING)
      commit(types.INVOICEHEADER_SHOW_SET_ERROR, e.message)
    })
}

export const reset = ({ commit }) => {
  commit(types.INVOICEHEADER_SHOW_RESET)
}
