import * as types from './mutation_types'

export default {
  [types.TASK_SHOW_RESET] (state) {
    Object.assign(state, {
      error: '',
      isLoading: false,
      retrieved: null
    })
  },

  [types.TASK_SHOW_SET_ERROR] (state, error) {
    Object.assign(state, { error })
  },

  [types.TASK_SHOW_SET_RETRIEVED] (state, retrieved) {
    Object.assign(state, { retrieved })
  },

  [types.TASK_SHOW_TOGGLE_LOADING] (state) {
    Object.assign(state, { isLoading: !state.isLoading })
  }

}
