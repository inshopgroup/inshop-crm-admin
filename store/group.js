import * as crud from '~/utils/crud'

const defaultState = () => ({
  item: {
    roles: [],
    roleIRIs: [],
    isActive: true,
  },
  items: [],
  error: null,
  errors: {},
})

export const state = () => defaultState()

export const mutations = {
  GROUP_SET_ITEM(state, item) {
    Object.assign(state, { item })
  },
  GROUP_UPDATE_ITEM(state, item) {
    state.item = Object.assign({}, state.item, item)
  },
  GROUP_UPDATE_ITEM_ROLES(state, params) {
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
  GROUP_SET_ITEMS(state, items) {
    Object.assign(state, { items })
  },
  GROUP_SET_ERROR(state, error) {
    Object.assign(state, { error })
  },
  GROUP_SET_ERRORS(state, errors) {
    Object.assign(state, { errors })
  },
  GROUP_RESET(state) {
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
    context.commit('GROUP_SET_ERROR', null)

    return this.$axios
      .get(`${process.env.NUXT_ENV_API_URL}/groups/${id}`)
      .then((response) => response.data)
      .then((data) => {
        const roles = []
        data.roles.forEach((role) => {
          roles.push(role['@id'])
        })
        data.roleIRIs = roles

        context.commit(`GROUP_SET_ITEM`, data)
      })
      .catch((e) => {
        context.commit(`GROUP_SET_ERROR`, e.message)
      })
  },
  getItems(context, query) {
    return crud.getItems(context, this.$axios, 'GROUP', query)
  },
  create(context) {
    context.commit('GROUP_UPDATE_ITEM', { roles: state.item.roleIRIs })

    return crud.create(context, this.$axios, 'GROUP').then((data) => {
      context.commit('GROUP_RESET')

      return data
    })
  },
  update(context) {
    context.commit('GROUP_UPDATE_ITEM', { roles: state.item.roleIRIs })

    return crud.update(context, this.$axios, 'GROUP').then((data) => {
      context.commit('GROUP_RESET')

      return data
    })
  },
  remove(context, item) {
    return crud.remove(context, this.$axios, 'GROUP', item)
  },
  reset(context) {
    return crud.reset(context, 'GROUP')
  },
}
