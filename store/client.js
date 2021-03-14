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
  CLIENT_SET_ITEM(state, item) {
    Object.assign(state, { item })
  },
  CLIENT_UPDATE_ITEM(state, item) {
    state.item = Object.assign({}, state.item, item)
  },
  CLIENT_SET_ITEMS(state, items) {
    Object.assign(state, { items })
  },
  CLIENT_SET_ERROR(state, error) {
    Object.assign(state, { error })
  },
  CLIENT_SET_ERRORS(state, errors) {
    Object.assign(state, { errors })
  },
  CLIENT_RESET(state) {
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
    return crud.getItem(context, this.$axios, 'CLIENT', id)
  },
  getItems(context, query) {
    return crud.getItems(context, this.$axios, 'CLIENT', query)
  },
  create(context) {
    return crud.create(context, this.$axios, 'CLIENT')
  },
  update(context) {
    return crud.update(context, this.$axios, 'CLIENT')
  },
  remove(context, item) {
    return crud.remove(context, this.$axios, 'CLIENT', item)
  },
  reset(context) {
    return crud.reset(context, 'CLIENT')
  },
}
