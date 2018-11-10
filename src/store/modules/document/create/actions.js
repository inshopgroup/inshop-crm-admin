import SubmissionError from '../../../../error/SubmissionError'
import fetch from '../../../../utils/fetch'
import * as types from './mutation_types'

export const create = ({ commit }, values) => {
  commit(types.DOCUMENT_CREATE_SET_ERROR, '')
  commit(types.DOCUMENT_CREATE_TOGGLE_LOADING)

  return fetch('/documents', { method: 'POST', body: JSON.stringify(values) })
    .then((response) => {
      commit(types.DOCUMENT_CREATE_TOGGLE_LOADING)

      return response.json()
    })
    .then((data) => {
      commit(types.DOCUMENT_CREATE_SET_CREATED, data)
    })
    .catch((e) => {
      commit(types.DOCUMENT_CREATE_TOGGLE_LOADING)

      if (e instanceof SubmissionError) {
        commit(types.DOCUMENT_CREATE_SET_VIOLATIONS, e.errors)
        // eslint-disable-next-line
        commit(types.DOCUMENT_CREATE_SET_ERROR, e.errors._error)
        return
      }

      commit(types.DOCUMENT_CREATE_SET_ERROR, e.message)
    })
}

export const reset = ({ commit }) => {
  commit(types.DOCUMENT_CREATE_RESET)
}
