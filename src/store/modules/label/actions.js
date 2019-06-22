import * as crud from '../../../utils/crud'
import { namespace } from './mutation_types'

export const getItem = ({ dispatch, commit }, id) => {
  return crud.getItem({ dispatch, commit }, namespace, id)
}

export const getItems = ({ dispatch, commit }, query) => {
  return crud.getItems({ dispatch, commit }, namespace, query)
}

export const create = ({ dispatch, commit, state }) => {
  return crud.create({ dispatch, commit, state }, namespace)
}

export const update = ({ dispatch, commit, state }) => {
  return crud.update({ dispatch, commit, state }, namespace)
}

export const remove = ({ dispatch, commit }, item) => {
  return crud.remove({ dispatch, commit }, namespace, item)
}

export const reset = ({ commit }) => {
  return crud.reset({ commit }, namespace)
}
