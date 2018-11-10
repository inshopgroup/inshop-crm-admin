import SubmissionError from '../../../../error/SubmissionError'
import fetch from '../../../../utils/fetch'
import * as types from './mutation_types'

export const create = ({ commit }, values) => {
  commit(types.TEMPLATETYPE_CREATE_SET_ERROR, '')
  commit(types.TEMPLATETYPE_CREATE_TOGGLE_LOADING)

  return fetch('/template_types', { method: 'POST', body: JSON.stringify(values) })
    .then((response) => {
      commit(types.TEMPLATETYPE_CREATE_TOGGLE_LOADING)

      return response.json()
    })
    .then((data) => {
      commit(types.TEMPLATETYPE_CREATE_SET_CREATED, data)
    })
    .catch((e) => {
      commit(types.TEMPLATETYPE_CREATE_TOGGLE_LOADING)

      if (e instanceof SubmissionError) {
        commit(types.TEMPLATETYPE_CREATE_SET_VIOLATIONS, e.errors)
        // eslint-disable-next-line
        commit(types.TEMPLATETYPE_CREATE_SET_ERROR, e.errors._error)
        return
      }

      commit(types.TEMPLATETYPE_CREATE_SET_ERROR, e.message)
    })
}

export const reset = ({ commit }) => {
  commit(types.TEMPLATETYPE_CREATE_RESET)
}
