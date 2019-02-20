import axios from '../interceptor'
import {API_HOST} from "../config/_entrypoint";
import pluralize from "pluralize";

export const getItem = ({ dispatch, commit }, namespace, id) => {
  commit(namespace + '_SET_ERROR', null)

  return axios.get(API_HOST + '/' + pluralize(namespace.toLowerCase()) + '/' + id)
    .then(response => response.data)
    .then(data => {
      commit(namespace + '_SET_ITEM', data)
    })
    .catch(e => {
      commit(namespace + '_SET_ERROR', e.message)
    })
}

export const getItems = ({ dispatch, commit }, namespace, url) => {
  if (!url) {
    url = '/' + pluralize(namespace.toLowerCase())
  }

  commit(namespace + '_SET_ERROR', null)

  return axios.get(API_HOST + url)
    .then(response => response.data)
    .then(data => {
      commit(namespace + '_SET_ITEMS', data['hydra:member'])
    })
    .catch(e => {
      commit(namespace + '_SET_ERROR', e.message)
    })
}

export const create = ({ dispatch, commit, state }, namespace) => {
  commit(namespace + '_SET_ERROR', null)

  return axios.post(API_HOST + '/' + pluralize(namespace.toLowerCase()), state.item)
    .then(response => response.data)
    .then(data => {
      return data
    })
    .catch(e => {
      throw e.response.data
    })
    .catch(data => {
      if (data.violations) {
        let errors = {}

        data.violations.map(violation => {
          Object.assign(errors, {[violation.propertyPath]: violation.message})
        })

        commit(namespace + '_SET_ERRORS', errors)
      }

      let error = data['hydra:description'] ? data['hydra:description'] : data.message
      commit(namespace + '_SET_ERROR', error)

      throw data
    })
}

export const update = ({ dispatch, commit, state }, namespace) => {
  commit(namespace + '_SET_ERROR', null)

  return axios.put(API_HOST + '/' + pluralize(namespace.toLowerCase()) + '/' + state.item.id, state.item)
    .then(response => response.data)
    .then(data => {
      return data
    })
    .catch(e => {
      throw e.response.data
    })
    .catch(data => {
      if (data.violations) {
        let errors = {}

        data.violations.map(violation => {
          Object.assign(errors, {[violation.propertyPath]: violation.message})
        })

        commit(namespace + '_SET_ERRORS', errors)
      }

      let error = data['hydra:description'] ? data['hydra:description'] : data.message
      commit(namespace + '_SET_ERROR', error)

      throw data
    })
}

export const remove = ({ dispatch, commit }, namespace, item) => {
  return axios.delete(API_HOST + '/' + pluralize(namespace.toLowerCase()) + '/' + item.id)
    .then(() => {
    })
    .catch((e) => {
      commit(namespace + '_SET_ERROR', e.message)
    })
}

export const reset = ({ commit }, namespace) => {
  commit(namespace + '_RESET')
}
