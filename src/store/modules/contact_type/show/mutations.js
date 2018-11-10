import * as types from './mutation_types'

export default {
  [types.CONTACTTYPE_SHOW_RESET] (state) {
    Object.assign(state, {
      error: '',
      isLoading: false,
      retrieved: null
    })
  },

  [types.CONTACTTYPE_SHOW_SET_ERROR] (state, error) {
    Object.assign(state, { error })
  },

  [types.CONTACTTYPE_SHOW_SET_RETRIEVED] (state, retrieved) {
    Object.assign(state, { retrieved })
  },

  [types.CONTACTTYPE_SHOW_TOGGLE_LOADING] (state) {
    Object.assign(state, { isLoading: !state.isLoading })
  }

}
