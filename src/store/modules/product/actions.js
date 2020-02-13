import * as crud from '../../../utils/crud'
import { namespace } from './mutation_types'
import axios from '../../../interceptor'
import { API_HOST } from '../../../config/_entrypoint'

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

export const getCompanyProducts = ({ commit }, id) =>
  axios
    .get(`${API_HOST}/products/${id}/company_products`)
    .then(response => response.data)
    .then(data => {
      commit('PRODUCT_SET_COMPANY_PRODUCTS', data['hydra:member'])
    })
    .catch(e => {
      commit('PRODUCT_SET_ERROR', e.message)
    })

export const getProductSellPrices = ({ commit }, id) =>
  axios
    .get(`${API_HOST}/products/${id}/product_sell_prices`)
    .then(response => response.data)
    .then(data => {
      commit('PRODUCT_SET_PRODUCT_SELL_PRICES', data['hydra:member'])
    })
    .catch(e => {
      commit('PRODUCT_SET_ERROR', e.message)
    })
