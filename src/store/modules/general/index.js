import * as types from './mutation_types'

const actions = {}

function initialState () {
  return {
    isLoading: 0
  }
}

const state = initialState()

const getters = {
  isLoading: state => state.isLoading !== 0,
}

export const mutations = {
  [types.LOADING_START] (state) {
    state.isLoading += 1
  },
  [types.LOADING_STOP] (state) {
    state.isLoading -= 1
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
