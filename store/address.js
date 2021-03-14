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
  ADDRESS_SET_ITEM(state, item) {
    Object.assign(state, { item })
  },
  ADDRESS_UPDATE_ITEM(state, item) {
    state.item = Object.assign({}, state.item, item)
  },
  ADDRESS_SET_ITEMS(state, items) {
    Object.assign(state, { items })
  },
  ADDRESS_SET_ERROR(state, error) {
    Object.assign(state, { error })
  },
  ADDRESS_SET_ERRORS(state, errors) {
    Object.assign(state, { errors })
  },
  ADDRESS_RESET(state) {
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
    return crud.getItem(context, this.$axios, 'ADDRESS', id)
  },
  getItems(context, query) {
    return crud.getItems(context, this.$axios, 'ADDRESS', query)
  },
  create(context) {
    return crud.create(context, this.$axios, 'ADDRESS')
  },
  update(context) {
    return crud.update(context, this.$axios, 'ADDRESS')
  },
  remove(context, item) {
    return crud.remove(context, this.$axios, 'ADDRESS', item)
  },
  reset(context) {
    return crud.reset(context, 'ADDRESS')
  },
}
