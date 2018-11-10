import * as types from './mutation_types'

export default {
  [types.LABEL_SHOW_RESET] (state) {
    Object.assign(state, {
      error: '',
      isLoading: false,
      retrieved: null
    })
  },

  [types.LABEL_SHOW_SET_ERROR] (state, error) {
    Object.assign(state, { error })
  },

  [types.LABEL_SHOW_SET_RETRIEVED] (state, retrieved) {
    Object.assign(state, { retrieved })
  },

  [types.LABEL_SHOW_TOGGLE_LOADING] (state) {
    Object.assign(state, { isLoading: !state.isLoading })
  }

}
