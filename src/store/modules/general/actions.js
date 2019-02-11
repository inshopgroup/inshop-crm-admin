import * as types from './mutation_types'

export const loadingStart = ({ commit }) => {
  commit(types.LOADING_START)
}

export const loadingStop = ({ commit }) => {
  commit(types.LOADING_STOP)
}

export const loadingAllow = ({ commit }, value) => {
  commit(types.LOADING_ALLOW, value)
}
