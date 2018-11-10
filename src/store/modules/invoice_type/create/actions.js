import SubmissionError from '../../../../error/SubmissionError'
import fetch from '../../../../utils/fetch'
import * as types from './mutation_types'

export const create = ({ commit }, values) => {
  commit(types.INVOICETYPE_CREATE_SET_ERROR, '')
  commit(types.INVOICETYPE_CREATE_TOGGLE_LOADING)

  return fetch('/invoice_types', { method: 'POST', body: JSON.stringify(values) })
    .then((response) => {
      commit(types.INVOICETYPE_CREATE_TOGGLE_LOADING)

      return response.json()
    })
    .then((data) => {
      commit(types.INVOICETYPE_CREATE_SET_CREATED, data)
    })
    .catch((e) => {
      commit(types.INVOICETYPE_CREATE_TOGGLE_LOADING)

      if (e instanceof SubmissionError) {
        commit(types.INVOICETYPE_CREATE_SET_VIOLATIONS, e.errors)
        // eslint-disable-next-line
        commit(types.INVOICETYPE_CREATE_SET_ERROR, e.errors._error)
        return
      }

      commit(types.INVOICETYPE_CREATE_SET_ERROR, e.message)
    })
}

export const reset = ({ commit }) => {
  commit(types.INVOICETYPE_CREATE_RESET)
}
