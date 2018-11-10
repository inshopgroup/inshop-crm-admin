import * as types from './mutation_types'

export default {
  [types.COUNTRY_SHOW_RESET] (state) {
    Object.assign(state, {
      error: '',
      isLoading: false,
      retrieved: null
    })
  },

  [types.COUNTRY_SHOW_SET_ERROR] (state, error) {
    Object.assign(state, { error })
  },

  [types.COUNTRY_SHOW_SET_RETRIEVED] (state, retrieved) {
    Object.assign(state, { retrieved })
  },

  [types.COUNTRY_SHOW_TOGGLE_LOADING] (state) {
    Object.assign(state, { isLoading: !state.isLoading })
  }

}
