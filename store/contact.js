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
  SET_ITEM(state, item) {
    Object.assign(state, { item })
  },
  UPDATE_ITEM(state, item) {
    state.item = Object.assign({}, state.item, item)
  },
  SET_ITEMS(state, items) {
    Object.assign(state, { items })
  },
  SET_ERROR(state, error) {
    Object.assign(state, { error })
  },
  SET_ERRORS(state, errors) {
    Object.assign(state, { errors })
  },
  RESET(state) {
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
    return crud.getItem(context, this.$axios, 'contact', id)
  },
  getItems(context, query) {
    return crud.getItems(context, this.$axios, 'contact', query)
  },
  create(context) {
    return crud.create(context, this.$axios, 'contact')
  },
  update(context) {
    return crud.update(context, this.$axios, 'contact')
  },
  remove(context, item) {
    return crud.remove(context, this.$axios, 'contact', item)
  },
  reset(context) {
    return crud.reset(context, 'contact')
  },
}
