import fetch from '../../../../utils/fetch'
import * as types from './mutation_types'

export const retrieve = ({ commit }, id) => {
  commit(types.TEMPLATETYPE_SHOW_TOGGLE_LOADING)

  return fetch(id)
    .then(response => response.json())
    .then((data) => {
      commit(types.TEMPLATETYPE_SHOW_TOGGLE_LOADING)
      commit(types.TEMPLATETYPE_SHOW_SET_RETRIEVED, data)
    })
    .catch((e) => {
      commit(types.TEMPLATETYPE_SHOW_TOGGLE_LOADING)
      commit(types.TEMPLATETYPE_SHOW_SET_ERROR, e.message)
    })
}

export const reset = ({ commit }) => {
  commit(types.TEMPLATETYPE_SHOW_RESET)
}
