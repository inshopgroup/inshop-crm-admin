import * as types from './mutation_types'
import * as actions from './actions'

function initialState() {
  return {
    isLoading: 0,
    loadingAllow: true
  }
}

const state = initialState()

const getters = {
  isLoading: state => state.isLoading !== 0
}

export const mutations = {
  [types.LOADING_START](state) {
    if (state.loadingAllow) {
      state.isLoading += 1
    }
  },
  [types.LOADING_STOP](state) {
    state.loadingAllow = true

    if (state.isLoading > 0) {
      state.isLoading -= 1
    }
  },
  [types.LOADING_ALLOW](state, value) {
    state.loadingAllow = value
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
