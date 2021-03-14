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
  USER_SET_ITEM(state, item) {
    Object.assign(state, { item })
  },
  USER_UPDATE_ITEM(state, item) {
    state.item = Object.assign({}, state.item, item)
  },
  USER_SET_ITEMS(state, items) {
    Object.assign(state, { items })
  },
  USER_SET_ERROR(state, error) {
    Object.assign(state, { error })
  },
  USER_SET_ERRORS(state, errors) {
    Object.assign(state, { errors })
  },
  USER_RESET(state) {
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
    return crud.getItem(context, this.$axios, 'USER', id)
  },
  getItems(context, query) {
    return crud.getItems(context, this.$axios, 'USER', query)
  },
  create(context) {
    return crud.create(context, this.$axios, 'USER')
  },
  update(context) {
    return crud.update(context, this.$axios, 'USER')
  },
  remove(context, item) {
    return crud.remove(context, this.$axios, 'USER', item)
  },
  reset(context) {
    return crud.reset(context, 'USER')
  },
}
