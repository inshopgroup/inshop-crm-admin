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
  HISTORY_SET_ITEM(state, item) {
    Object.assign(state, { item })
  },
  HISTORY_UPDATE_ITEM(state, item) {
    state.item = Object.assign({}, state.item, item)
  },
  HISTORY_SET_ITEMS(state, items) {
    Object.assign(state, { items })
  },
  HISTORY_SET_ERROR(state, error) {
    Object.assign(state, { error })
  },
  HISTORY_SET_ERRORS(state, errors) {
    Object.assign(state, { errors })
  },
  HISTORY_RESET(state) {
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
  getItems({ commit }, params) {
    const url = `${process.env.NUXT_ENV_API_URL}/histories/${params.entity}/${params.id}`

    return this.$axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        commit('HISTORY_SET_ITEMS', data['hydra:member'])

        return data['hydra:member']
      })
      .catch((e) => {
        commit('HISTORY_SET_ERROR', e.message)
      })
  },
}
