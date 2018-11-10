import fetch from '../../../../utils/fetch'
import * as types from './mutation_types'

export const retrieve = ({ commit }, id) => {
  commit(types.DOCUMENT_SHOW_TOGGLE_LOADING)

  return fetch(id)
    .then(response => response.json())
    .then((data) => {
      commit(types.DOCUMENT_SHOW_TOGGLE_LOADING)
      commit(types.DOCUMENT_SHOW_SET_RETRIEVED, data)
    })
    .catch((e) => {
      commit(types.DOCUMENT_SHOW_TOGGLE_LOADING)
      commit(types.DOCUMENT_SHOW_SET_ERROR, e.message)
    })
}

export const reset = ({ commit }) => {
  commit(types.DOCUMENT_SHOW_RESET)
}
