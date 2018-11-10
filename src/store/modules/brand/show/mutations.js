import * as types from './mutation_types'

export default {
  [types.BRAND_SHOW_RESET] (state) {
    Object.assign(state, {
      error: '',
      isLoading: false,
      retrieved: null
    })
  },

  [types.BRAND_SHOW_SET_ERROR] (state, error) {
    Object.assign(state, { error })
  },

  [types.BRAND_SHOW_SET_RETRIEVED] (state, retrieved) {
    Object.assign(state, { retrieved })
  },

  [types.BRAND_SHOW_TOGGLE_LOADING] (state) {
    Object.assign(state, { isLoading: !state.isLoading })
  }

}
