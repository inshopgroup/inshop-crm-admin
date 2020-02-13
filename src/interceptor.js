import axios from 'axios'
import store from './store'
import * as types from './store/modules/general/mutation_types'

axios.defaults.timeout = 30000

axios.interceptors.request.use(
  config => {
    store.commit(`general/${types.LOADING_START}`)

    const token = store.getters['auth/jwtDecoded'] || null
    const authorized = token && token.exp > Date.now() / 1000

    if (authorized) {
      config.headers.common.Authorization = `Bearer ${store.state.auth.token}`
    }

    if (process.env.NODE_ENV !== 'production') {
      if (config.url.indexOf('?') > -1) {
        config.url += '&XDEBUG_SESSION_START=PHPSTORM'
      } else {
        config.url += '?XDEBUG_SESSION_START=PHPSTORM'
      }
    }

    return config
  },
  error => {
    store.commit(`general/${types.LOADING_STOP}`)

    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  data => {
    store.commit(`general/${types.LOADING_STOP}`)

    return data
  },
  error => {
    store.commit(`general/${types.LOADING_STOP}`)

    if (
      error.response &&
      error.response.status &&
      error.response.status === 401 &&
      error.response.data.message !== 'Bad credentials'
    ) {
      window.location.href = '/signin'
    }

    return Promise.reject(error)
  }
)

export default axios
