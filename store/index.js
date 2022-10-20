export const strict = true

export const state = () => ({
  isLoading: 0,
  loadingAllow: true,
  locales: ['en', 'de', 'pl', 'es', 'fr', 'it'],
  locale: 'en',
})

export const mutations = {
  LOADING_START(state) {
    if (state.loadingAllow) {
      state.isLoading += 1
    }
  },
  LOADING_STOP(state) {
    state.loadingAllow = true

    if (state.isLoading > 0) {
      state.isLoading -= 1
    }
  },
  LOADING_ALLOW(state, value) {
    state.loadingAllow = value
  },
  SET_LOCALE(state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  },
}

export const getters = {
  isLoading: (state) => state.isLoading !== 0,
}

export const actions = {
  loadingStart({ commit }) {
    commit('LOADING_START')
  },
  loadingStop({ commit }) {
    commit('LOADING_STOP')
  },
  loadingAllow({ commit }, value) {
    commit('LOADING_ALLOW', value)
  },
  async nuxtServerInit({ commit, dispatch }, context) {
    const t = context.app.$cookiz.get('t')
    const rt = context.app.$cookiz.get('rt')
    const roles = context.app.$cookiz.get('roles')
    const locale = context.app.$cookiz.get('locale')

    if (t) {
      await commit('auth/AUTH_UPDATE_TOKEN', t)
    }

    if (rt) {
      await commit('auth/AUTH_UPDATE_REFRESH_TOKEN', rt)
    }

    if (roles) {
      await commit('auth/AUTH_UPDATE_ROLES', roles)
    }

    if (locale) {
      await commit('SET_LOCALE', locale)
    }
  },
}
