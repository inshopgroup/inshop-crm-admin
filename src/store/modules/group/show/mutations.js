import * as types from './mutation_types'

export default {
  [types.GROUP_SHOW_RESET] (state) {
    Object.assign(state, {
      error: '',
      isLoading: false,
      retrieved: null
    })
  },

  [types.GROUP_SHOW_SET_ERROR] (state, error) {
    Object.assign(state, { error })
  },

  [types.GROUP_SHOW_SET_RETRIEVED] (state, retrieved) {
    Object.assign(state, { retrieved })
  },

  [types.GROUP_SHOW_TOGGLE_LOADING] (state) {
    Object.assign(state, { isLoading: !state.isLoading })
  }

}
