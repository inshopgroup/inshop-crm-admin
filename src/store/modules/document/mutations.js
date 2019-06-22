import * as types from './mutation_types'
import defaultState from './state'

export default {
  [types.SET_ITEM](state, item) {
    Object.assign(state, { item })
  },
  [types.UPDATE_ITEM](state, item) {
    state.item = Object.assign({}, state.item, item)
  },
  [types.SET_ITEMS](state, items) {
    Object.assign(state, { items })
  },
  [types.SET_ERROR](state, error) {
    Object.assign(state, { error })
  },
  [types.SET_ERRORS](state, errors) {
    Object.assign(state, { errors })
  },
  [types.RESET](state) {
    Object.assign(state, defaultState())
  },
  [types.ADD_FILE](state, file) {
    state.item.files.push(file)
  },
  [types.DELETE_FILE](state, fileId) {
    state.item.files = state.item.files.filter(file => file.id !== fileId)
  }
}
