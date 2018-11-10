import fetch from '../../../../utils/fetch'
import * as types from './mutation_types'

export const retrieve = ({ commit }, id) => {
  commit(types.ORDERHEADER_SHOW_TOGGLE_LOADING)

  return fetch(id)
    .then(response => response.json())
    .then((data) => {
      commit(types.ORDERHEADER_SHOW_TOGGLE_LOADING)
      commit(types.ORDERHEADER_SHOW_SET_RETRIEVED, data)
    })
    .catch((e) => {
      commit(types.ORDERHEADER_SHOW_TOGGLE_LOADING)
      commit(types.ORDERHEADER_SHOW_SET_ERROR, e.message)
    })
}

export const getLines = ({ commit }, id) => {
  commit(types.ORDERHEADER_SHOW_TOGGLE_LOADING)

  return fetch(id + '/lines')
    .then(response => response.json())
    .then((data) => {
      commit(types.ORDERHEADER_SHOW_TOGGLE_LOADING)
      commit(types.ORDERHEADER_SHOW_SET_LINES, data['hydra:member'])
    })
    .catch((e) => {
      commit(types.ORDERHEADER_SHOW_TOGGLE_LOADING)
      commit(types.ORDERHEADER_SHOW_SET_ERROR, e.message)
    })
}

export const reset = ({ commit }) => {
  commit(types.ORDERHEADER_SHOW_RESET)
}
