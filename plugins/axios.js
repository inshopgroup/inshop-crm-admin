export default function ({ $axios, store, redirect, error }) {
  $axios.onRequest((config) => {
    store.dispatch('loadingStart')

    const token = store.getters['auth/jwtDecoded'] || null
    const authorized = token && token.exp > Date.now() / 1000

    if (authorized) {
      config.headers.common.Authorization = 'Bearer ' + store.state.auth.token
    }

    return config
  })

  $axios.onResponse((data) => {
    store.dispatch('loadingStop')
  })

  $axios.onError((e) => {
    store.dispatch('loadingStop')

    const code = parseInt(e.response && e.response.status)
    if (code === 401) {
      store.dispatch('auth/logout').then(() => {
        redirect('/')
      })
    }

    if (code === 404) {
      return error({ statusCode: 404, message: e.message })
    }
  })
}
