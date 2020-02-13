import * as types from './mutation_types'
import defaultState from './state'

export default {
  [types.SET_ITEM](state, item) {
    Object.assign(state, { item })
  },
  [types.UPDATE_ITEM](state, item) {
    state.item = Object.assign({}, state.item, item)
  },
  [types.UPDATE_ITEM_ROLES](state, params) {
    if (params.value) {
      if (!state.item.roleIRIs.includes(params.iri)) {
        state.item.roleIRIs.push(params.iri)
      }
    } else {
      const index = state.item.roleIRIs.indexOf(params.iri)

      if (index > -1) {
        state.item.roleIRIs.splice(index, 1)
      }
    }
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
  }
}
