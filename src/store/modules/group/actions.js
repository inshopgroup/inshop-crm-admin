import * as crud from '../../../utils/crud'
import {namespace} from "./mutation_types";
import axios from "../../../interceptor";
import {API_HOST} from "../../../config/_entrypoint";
import pluralize from "pluralize";

export const getItem = ({ dispatch, commit }, id) => {
  commit(namespace + '_SET_ERROR', null)

  return axios.get(API_HOST + '/' + pluralize(namespace.toLowerCase()) + '/' + id)
    .then(response => response.data)
    .then(data => {

      let roles = []
      data.roles.forEach(role => {
        roles.push(role.id)
      })
      data.roleIds = roles

      commit(namespace + '_SET_ITEM', data)
    })
    .catch(e => {
      commit(namespace + '_SET_ERROR', e.message)
    })

}

export const getItems = ({ dispatch, commit }, url) => {
  return crud.getItems({ dispatch, commit }, namespace, url)
}

// TODO
export const create = ({ dispatch, commit, state }) => {
  // item.roles = item.roleIds

  return crud.create({ dispatch, commit, state }, namespace)
}

// TODO
export const update = ({ dispatch, commit, state }) => {
  // item.roles = item.roleIds

  return crud.update({ dispatch, commit, state }, namespace,)
}

export const remove = ({ dispatch, commit }, item) => {
  return crud.remove({ dispatch, commit }, namespace, item)
}

export const reset = ({ commit }) => {
  return crud.reset({ commit }, namespace)
}
