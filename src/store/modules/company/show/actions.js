import fetch from '../../../../utils/fetch'
import * as types from './mutation_types'

export const retrieve = ({ commit }, id) => {
  commit(types.COMPANY_SHOW_TOGGLE_LOADING)

  return fetch(id)
    .then(response => response.json())
    .then((data) => {
      commit(types.COMPANY_SHOW_TOGGLE_LOADING)
      commit(types.COMPANY_SHOW_SET_RETRIEVED, data)
    })
    .catch((e) => {
      commit(types.COMPANY_SHOW_TOGGLE_LOADING)
      commit(types.COMPANY_SHOW_SET_ERROR, e.message)
    })
}

export const getContacts = ({ commit }, id) => {
  commit(types.COMPANY_SHOW_TOGGLE_LOADING)

  return fetch(id + '/contacts')
    .then(response => response.json())
    .then((data) => {
      commit(types.COMPANY_SHOW_TOGGLE_LOADING)
      commit(types.COMPANY_SHOW_SET_CONTACTS, data['hydra:member'])
    })
    .catch((e) => {
      commit(types.COMPANY_SHOW_TOGGLE_LOADING)
      commit(types.COMPANY_SHOW_SET_ERROR, e.message)
    })
}

export const getAddresses = ({ commit }, id) => {
  commit(types.COMPANY_SHOW_TOGGLE_LOADING)

  return fetch(id + '/addresses')
    .then(response => response.json())
    .then((data) => {
      commit(types.COMPANY_SHOW_TOGGLE_LOADING)
      commit(types.COMPANY_SHOW_SET_ADDRESSES, data['hydra:member'])
    })
    .catch((e) => {
      commit(types.COMPANY_SHOW_TOGGLE_LOADING)
      commit(types.COMPANY_SHOW_SET_ERROR, e.message)
    })
}

export const getDocuments = ({ commit }, id) => {
  commit(types.COMPANY_SHOW_TOGGLE_LOADING)

  return fetch(id + '/documents')
    .then(response => response.json())
    .then((data) => {
      commit(types.COMPANY_SHOW_TOGGLE_LOADING)
      commit(types.COMPANY_SHOW_SET_DOCUMENTS, data['hydra:member'])
    })
    .catch((e) => {
      commit(types.COMPANY_SHOW_TOGGLE_LOADING)
      commit(types.COMPANY_SHOW_SET_ERROR, e.message)
    })
}

export const getCompanyProducts = ({ commit }, id) => {
  commit(types.COMPANY_SHOW_TOGGLE_LOADING)

  return fetch(id + '/company_products')
    .then(response => response.json())
    .then((data) => {
      commit(types.COMPANY_SHOW_TOGGLE_LOADING)
      commit(types.COMPANY_SHOW_SET_COMPANY_PRODUCTS, data['hydra:member'])
    })
    .catch((e) => {
      commit(types.COMPANY_SHOW_TOGGLE_LOADING)
      commit(types.COMPANY_SHOW_SET_ERROR, e.message)
    })
}

export const reset = ({ commit }) => {
  commit(types.COMPANY_SHOW_RESET)
}
