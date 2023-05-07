import jwtDecode from 'jwt-decode'

export const state = () => ({
  token: null,
  refreshToken: null,
  type: null,
  error: null,
  roles: [],
  language: 'en',
})

export const mutations = {
  UPDATE_TOKEN(state, data) {
    this.$cookiz.set('t', data)
    state.token = data
  },
  UPDATE_REFRESH_TOKEN(state, data) {
    this.$cookiz.set('rt', data)
    state.refreshToken = data
  },
  UPDATE_ROLES(state, data) {
    this.$cookiz.set('roles', data)
    state.roles = data
  },
  ERROR_CHANGE(state, error) {
    state.error = error
  },
  UPDATE_LANGUAGE(state, language) {
    state.language = language
  },
  RESET(state) {
    this.$cookiz.remove('t')
    this.$cookiz.remove('rt')

    state.token = null
    state.refreshToken = null
    state.error = null
  },
}

export const getters = {
  jwtDecoded: (state) => {
    const token = state.token || null
    if (token !== null) {
      return jwtDecode(state.token)
    }
  },
  refreshToken: (state) => state.refreshToken,
  error: (state) => state.error,
  roles: (state) => state.roles,
  language: (state) => state.language,
  id: (state, getters) => {
    if (getters.jwtDecoded) {
      return getters.jwtDecoded.id
    }
  },
}

export const actions = {
  login({ commit }, data) {
    commit('ERROR_CHANGE', null)

    const link = process.env.NUXT_ENV_API_URL + '/login'

    return this.$axios
      .post(link, data)
      .then((response) => {
        commit('UPDATE_TOKEN', response.data.token)
        commit('UPDATE_REFRESH_TOKEN', response.data.refresh_token)
        commit('UPDATE_ROLES', response.data.roles)

        return response.data
      })
      .catch((error) => {
        commit('ERROR_CHANGE', 'Username or password is incorrect')
        throw error
      })
  },
  refreshToken({ commit, getters }) {
    const link = process.env.NUXT_ENV_API_URL + '/frontend/token/refresh'

    return this.$axios
      .post(link, { refresh_token: getters.refreshToken })
      .then((response) => {
        commit('UPDATE_TOKEN', response.data.token)
        commit('UPDATE_ROLES', response.data.roles)

        return response
      })
  },
  loginByToken({ commit, getters }, token) {
    const link = process.env.NUXT_ENV_API_URL + '/frontend/login/' + token

    return this.$axios
      .get(link)
      .then((response) => {
        commit('UPDATE_TOKEN', response.data.token)
        commit('UPDATE_REFRESH_TOKEN', response.data.refresh_token)
        commit('UPDATE_ROLES', response.data.roles)

        return response
      })
      .catch((e) => {
        throw e
      })
  },
  logout({ commit }) {
    commit('RESET')
  },
}
