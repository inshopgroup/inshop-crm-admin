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
  LABEL_SET_ITEM(state, item) {
    Object.assign(state, { item })
  },
  LABEL_UPDATE_ITEM(state, item) {
    state.item = Object.assign({}, state.item, item)
  },
  LABEL_SET_ITEMS(state, items) {
    Object.assign(state, { items })
  },
  LABEL_SET_ERROR(state, error) {
    Object.assign(state, { error })
  },
  LABEL_SET_ERRORS(state, errors) {
    Object.assign(state, { errors })
  },
  LABEL_RESET(state) {
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
    return crud.getItem(context, this.$axios, 'LABEL', id)
  },
  getItems(context, query) {
    return crud.getItems(context, this.$axios, 'LABEL', query)
  },
  create(context) {
    return crud.create(context, this.$axios, 'LABEL')
  },
  update(context) {
    return crud.update(context, this.$axios, 'LABEL')
  },
  remove(context, item) {
    return crud.remove(context, this.$axios, 'LABEL', item)
  },
  reset(context) {
    return crud.reset(context, 'LABEL')
  },
}
