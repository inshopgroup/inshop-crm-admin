import pluralize from 'pluralize'
import axios from '../plugins/axios'

export const getItem = ({ commit }, namespace, id) => {
  commit(`${namespace}_SET_ERROR`, null)

  return axios
    .get(`${process.env.VUE_APP_API_URL}/${pluralize(namespace.toLowerCase())}/${id}`)
    .then(response => response.data)
    .then(data => {
      commit(`${namespace}_SET_ITEM`, data)

      return data
    })
    .catch(e => {
      commit(`${namespace}_SET_ERROR`, e.message)
    })
}

export const getItems = ({ commit }, namespace, query) => {
  let url = `/${pluralize(namespace.toLowerCase())}`

  if (query) {
    url += `?${Object.keys(query)
      .map(key => `${key}=${query[key]}`)
      .join('&')}`
  }

  commit(`${namespace}_SET_ERROR`, null)

  return axios
    .get(process.env.VUE_APP_API_URL + url)
    .then(response => response.data)
    .then(data => {
      commit(`${namespace}_SET_ITEMS`, data['hydra:member'])

      return data['hydra:member']
    })
    .catch(e => {
      commit(`${namespace}_SET_ERROR`, e.message)
    })
}

export const create = ({ commit, state }, namespace) => {
  commit(`${namespace}_SET_ERROR`, null)

  return axios
    .post(`${process.env.VUE_APP_API_URL}/${pluralize(namespace.toLowerCase())}`, state.item)
    .then(response => response.data)
    .catch(e => {
      const { data } = e.response

      if (data.violations) {
        const errors = {}

        data.violations.map(violation => {
          Object.assign(errors, { [violation.propertyPath]: violation.message })
        })

        commit(`${namespace}_SET_ERRORS`, errors)
      }

      const error = data['hydra:description']
        ? data['hydra:description']
        : data.message
      commit(`${namespace}_SET_ERROR`, error)

      throw data
    })
}

export const update = ({ commit, state }, namespace) => {
  commit(`${namespace}_SET_ERROR`, null)

  return axios
    .put(
      `${process.env.VUE_APP_API_URL}/${pluralize(namespace.toLowerCase())}/${state.item.id}`,
      state.item
    )
    .then(response => response.data)
    .catch(e => {
      const { data } = e.response

      if (data.violations) {
        const errors = {}

        data.violations.map(violation => {
          Object.assign(errors, { [violation.propertyPath]: violation.message })
        })

        commit(`${namespace}_SET_ERRORS`, errors)
      }

      const error = data['hydra:description']
        ? data['hydra:description']
        : data.message
      commit(`${namespace}_SET_ERROR`, error)

      throw data
    })
}

export const remove = ({ commit }, namespace, item) =>
  axios
    .delete(`${process.env.VUE_APP_API_URL}/${pluralize(namespace.toLowerCase())}/${item.id}`)
    .catch(e => {
      const message =
        e.response.status === 409
          ? 'Not possible to remove. This record has relations.'
          : e.message

      commit(`${namespace}_SET_ERROR`, message)

      throw e
    })

export const reset = ({ commit }, namespace) => {
  commit(`${namespace}_RESET`)
}
