import * as types from './mutation_types'

export default {
  [types.PROJECTTYPE_SHOW_RESET] (state) {
    Object.assign(state, {
      error: '',
      isLoading: false,
      retrieved: null
    })
  },

  [types.PROJECTTYPE_SHOW_SET_ERROR] (state, error) {
    Object.assign(state, { error })
  },

  [types.PROJECTTYPE_SHOW_SET_RETRIEVED] (state, retrieved) {
    Object.assign(state, { retrieved })
  },

  [types.PROJECTTYPE_SHOW_TOGGLE_LOADING] (state) {
    Object.assign(state, { isLoading: !state.isLoading })
  }

}
