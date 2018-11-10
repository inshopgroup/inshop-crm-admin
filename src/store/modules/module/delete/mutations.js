import * as types from './mutation_types'

export default {
  [types.MODULE_DELETE_SET_DELETED] (state, deleted) {
    Object.assign(state, { deleted })
  },

  [types.MODULE_DELETE_SET_ERROR] (state, error) {
    Object.assign(state, { error })
  },

  [types.MODULE_DELETE_TOGGLE_LOADING] (state) {
    Object.assign(state, { isLoading: !state.isLoading })
  },

  [types.MODULE_DELETE_RESET] (state) {
    Object.assign(state, {
      deleted: null,
      error: '',
      isLoading: false
    })
  }
}
