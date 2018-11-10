import SubmissionError from '../../../../error/SubmissionError'
import fetch from '../../../../utils/fetch'
import * as types from './mutation_types'

export const create = ({ commit }, values) => {
  commit(types.COMPANY_CREATE_SET_ERROR, '')
  commit(types.COMPANY_CREATE_TOGGLE_LOADING)

  return fetch('/companies', { method: 'POST', body: JSON.stringify(values) })
    .then((response) => {
      commit(types.COMPANY_CREATE_TOGGLE_LOADING)

      return response.json()
    })
    .then((data) => {
      commit(types.COMPANY_CREATE_SET_CREATED, data)
    })
    .catch((e) => {
      commit(types.COMPANY_CREATE_TOGGLE_LOADING)

      if (e instanceof SubmissionError) {
        commit(types.COMPANY_CREATE_SET_VIOLATIONS, e.errors)
        // eslint-disable-next-line
        commit(types.COMPANY_CREATE_SET_ERROR, e.errors._error)
        return
      }

      commit(types.COMPANY_CREATE_SET_ERROR, e.message)
    })
}

export const reset = ({ commit }) => {
  commit(types.COMPANY_CREATE_RESET)
}

export const getLast = ({ commit }) => {
  commit(types.COMPANY_CREATE_TOGGLE_LOADING)

  return fetch('/companies/last', { method: 'GET' })
    .then((response) => {
      commit(types.COMPANY_CREATE_TOGGLE_LOADING)

      return response.json()
    })
    .catch((e) => {
      commit(types.COMPANY_CREATE_TOGGLE_LOADING)
      commit(types.COMPANY_CREATE_SET_ERROR, e.message)
    })
}
