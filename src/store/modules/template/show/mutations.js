import * as types from './mutation_types'

export default {
  [types.TEMPLATE_SHOW_RESET] (state) {
    Object.assign(state, {
      error: '',
      isLoading: false,
      retrieved: null
    })
  },

  [types.TEMPLATE_SHOW_SET_ERROR] (state, error) {
    Object.assign(state, { error })
  },

  [types.TEMPLATE_SHOW_SET_RETRIEVED] (state, retrieved) {
    Object.assign(state, { retrieved })
  },

  [types.TEMPLATE_SHOW_TOGGLE_LOADING] (state) {
    Object.assign(state, { isLoading: !state.isLoading })
  }

}
