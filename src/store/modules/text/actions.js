import * as crud from '../../../utils/crud'
import { namespace } from './mutation_types'

export const getItem = ({ dispatch, commit }, id) =>
  crud.getItem({ dispatch, commit }, namespace, id)

export const getItems = ({ dispatch, commit }, query) =>
  crud.getItems({ dispatch, commit }, namespace, query)

export const create = ({ dispatch, commit, state }) =>
  crud.create({ dispatch, commit, state }, namespace)

export const update = ({ dispatch, commit, state }) =>
  crud.update({ dispatch, commit, state }, namespace)

export const remove = ({ dispatch, commit }, item) =>
  crud.remove({ dispatch, commit }, namespace, item)

export const reset = ({ commit }) => crud.reset({ commit }, namespace)
