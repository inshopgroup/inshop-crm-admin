import * as types from './mutation_types'

export default {
  [types.PROJECTSTATUS_SHOW_RESET] (state) {
    Object.assign(state, {
      error: '',
      isLoading: false,
      retrieved: null
    })
  },

  [types.PROJECTSTATUS_SHOW_SET_ERROR] (state, error) {
    Object.assign(state, { error })
  },

  [types.PROJECTSTATUS_SHOW_SET_RETRIEVED] (state, retrieved) {
    Object.assign(state, { retrieved })
  },

  [types.PROJECTSTATUS_SHOW_TOGGLE_LOADING] (state) {
    Object.assign(state, { isLoading: !state.isLoading })
  }

}
