import * as types from './mutation_types'

export default {
  [types.PROJECTTYPE_DELETE_SET_DELETED] (state, deleted) {
    Object.assign(state, { deleted })
  },

  [types.PROJECTTYPE_DELETE_SET_ERROR] (state, error) {
    Object.assign(state, { error })
  },

  [types.PROJECTTYPE_DELETE_TOGGLE_LOADING] (state) {
    Object.assign(state, { isLoading: !state.isLoading })
  },

  [types.PROJECTTYPE_DELETE_RESET] (state) {
    Object.assign(state, {
      deleted: null,
      error: '',
      isLoading: false
    })
  }
}
