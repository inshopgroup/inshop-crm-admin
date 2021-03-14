import * as crud from '~/utils/crud'

const defaultState = () => ({
  item: {
    isActive: true,
  },
  items: [],
  error: null,
  errors: {},
})

export const state = () => defaultState()

export const mutations = {
  TASK_STATUS_SET_ITEM(state, item) {
    Object.assign(state, { item })
  },
  TASK_STATUS_UPDATE_ITEM(state, item) {
    state.item = Object.assign({}, state.item, item)
  },
  TASK_STATUS_SET_ITEMS(state, items) {
    Object.assign(state, { items })
  },
  TASK_STATUS_SET_ERROR(state, error) {
    Object.assign(state, { error })
  },
  TASK_STATUS_SET_ERRORS(state, errors) {
    Object.assign(state, { errors })
  },
  TASK_STATUS_RESET(state) {
    Object.assign(state, defaultState())
  },
}

export const getters = {
  item: (state) => state.item,
  items: (state) => state.items,
  error: (state) => state.error,
  errors: (state) => state.errors,
}

export const actions = {
  getItem(context, id) {
    return crud.getItem(context, this.$axios, 'TASK_STATUS', id)
  },
  getItems(context, query) {
    return crud.getItems(context, this.$axios, 'TASK_STATUS', query)
  },
  create(context) {
    return crud.create(context, this.$axios, 'TASK_STATUS')
  },
  update(context) {
    return crud.update(context, this.$axios, 'TASK_STATUS')
  },
  remove(context, item) {
    return crud.remove(context, this.$axios, 'TASK_STATUS', item)
  },
  reset(context) {
    return crud.reset(context, 'TASK_STATUS')
  },
}
