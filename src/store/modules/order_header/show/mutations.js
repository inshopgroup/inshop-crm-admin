import * as types from './mutation_types'

export default {
  [types.ORDERHEADER_SHOW_RESET] (state) {
    Object.assign(state, {
      error: '',
      isLoading: false,
      retrieved: null
    })
  },

  [types.ORDERHEADER_SHOW_SET_ERROR] (state, error) {
    Object.assign(state, { error })
  },

  [types.ORDERHEADER_SHOW_SET_RETRIEVED] (state, retrieved) {
    Object.assign(state, { retrieved })
  },

  [types.ORDERHEADER_SHOW_TOGGLE_LOADING] (state) {
    Object.assign(state, { isLoading: !state.isLoading })
  },

  [types.ORDERHEADER_SHOW_SET_LINES] (state, lines) {
    Object.assign(state, { lines })
  }
}
