import * as types from './mutation_types'

export default {
  [types.BACKUP_STATUS_SHOW_RESET] (state) {
    Object.assign(state, {
      error: '',
      isLoading: false,
      retrieved: null
    })
  },

  [types.BACKUP_STATUS_SHOW_SET_ERROR] (state, error) {
    Object.assign(state, { error })
  },

  [types.BACKUP_STATUS_SHOW_SET_RETRIEVED] (state, retrieved) {
    Object.assign(state, { retrieved })
  },

  [types.BACKUP_STATUS_SHOW_TOGGLE_LOADING] (state) {
    Object.assign(state, { isLoading: !state.isLoading })
  }

}
