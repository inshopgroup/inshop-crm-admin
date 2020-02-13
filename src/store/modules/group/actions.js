import pluralize from 'pluralize'
import * as crud from '../../../utils/crud'
import { namespace } from './mutation_types'
import axios from '../../../interceptor'
import { API_HOST } from '../../../config/_entrypoint'

export const getItem = ({ commit }, id) => {
  commit(`${namespace}_SET_ERROR`, null)

  return axios
    .get(`${API_HOST}/${pluralize(namespace.toLowerCase())}/${id}`)
    .then(response => response.data)
    .then(data => {
      const roles = []
      data.roles.forEach(role => {
        roles.push(role['@id'])
      })
      data.roleIRIs = roles

      commit(`${namespace}_SET_ITEM`, data)
    })
    .catch(e => {
      commit(`${namespace}_SET_ERROR`, e.message)
    })
}

export const getItems = ({ dispatch, commit }, query) =>
  crud.getItems({ dispatch, commit }, namespace, query)

export const create = ({ dispatch, commit, state }) => {
  commit(`${namespace}_UPDATE_ITEM`, { roles: state.item.roleIRIs })

  return crud.create({ dispatch, commit, state }, namespace).then(data => {
    commit(`${namespace}_RESET`)

    return data
  })
}

export const update = ({ dispatch, commit, state }) => {
  commit(`${namespace}_UPDATE_ITEM`, { roles: state.item.roleIRIs })

  return crud.update({ dispatch, commit, state }, namespace).then(data => {
    commit(`${namespace}_RESET`)

    return data
  })
}

export const remove = ({ dispatch, commit }, item) =>
  crud.remove({ dispatch, commit }, namespace, item)

export const reset = ({ commit }) => crud.reset({ commit }, namespace)
