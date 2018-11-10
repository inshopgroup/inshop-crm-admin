import * as types from './mutation_types'

export default {
  [types.USER_CREATE_SET_ERROR] (state, error) {
    Object.assign(state, { error })
  },

  [types.USER_CREATE_TOGGLE_LOADING] (state) {
    Object.assign(state, { isLoading: !state.isLoading })
  },

  [types.USER_CREATE_SET_CREATED] (state, created) {
    Object.assign(state, { created })
  },

  [types.USER_CREATE_SET_VIOLATIONS] (state, violations) {
    Object.assign(state, { violations })
  },

  [types.USER_CREATE_RESET] (state) {
    Object.assign(state, {
      created: null,
      error: '',
      isLoading: false,
      violations: null
    })
  }
}
