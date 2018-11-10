import * as types from './mutation_types'

export default {
  [types.USER_DELETE_SET_DELETED] (state, deleted) {
    Object.assign(state, { deleted })
  },

  [types.USER_DELETE_SET_ERROR] (state, error) {
    Object.assign(state, { error })
  },

  [types.USER_DELETE_TOGGLE_LOADING] (state) {
    Object.assign(state, { isLoading: !state.isLoading })
  },

  [types.USER_DELETE_RESET] (state) {
    Object.assign(state, {
      deleted: null,
      error: '',
      isLoading: false
    })
  }
}
