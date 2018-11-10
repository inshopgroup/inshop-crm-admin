import * as types from './mutation_types'
import router from '../../../router'
import axios from '../../../interceptor'
import { API_HOST, API_PATH } from '../../../config/_entrypoint'

const actions = {
  search ({ commit }, query) {
    commit(types.SEARCH_ERROR_CHANGE, null)
    commit(types.SEARCH_UPDATE_QUERY, query)

    const url = '/search?q=' + query
    const link = url.includes(API_PATH) ? API_HOST + url : API_HOST + API_PATH + url

    axios.get(link)
      .then((response) => {
        commit(types.SEARCH_UPDATE_RESULTS, response.data)
        router.push({name: 'Search'})
      })
      .catch((error) => {
        commit(types.SEARCH_ERROR_CHANGE, 'Error occurred')
      })
  }
}

function initialState () {
  return {
    error: null,
    query: null,
    results: [],
  }
}

const state = initialState()

const getters = {
  error: state => state.error,
  results: state => state.results,
  query: state => state.query,
}

const mutations = {
  [types.SEARCH_UPDATE_QUERY] (state, query) {
    state.query = query
  },
  [types.SEARCH_UPDATE_RESULTS] (state, results) {
    state.results = results
  },
  [types.SEARCH_ERROR_CHANGE] (state, error) {
    state.error = error
  },
  [types.SEARCH_RESET] (state) {
    const s = initialState()
    Object.keys(s).forEach(key => {
      state[key] = s[key]
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
