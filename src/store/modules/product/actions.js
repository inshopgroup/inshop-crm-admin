import * as crud from '../../../utils/crud'
import {namespace} from "./mutation_types"
import axios from "../../../interceptor"
import {API_HOST} from "../../../config/_entrypoint"

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

export const getCompanyProducts = ({ commit }, id) => {
  return axios.get(API_HOST + '/products/' + id + '/company_products')
    .then(response => response.data)
    .then(data => {
      commit('PRODUCT_SET_COMPANY_PRODUCTS', data['hydra:member'])
    })
    .catch(e => {
      commit('PRODUCT_SET_ERROR', e.message)
    })
}

export const getProductSellPrices = ({ commit }, id) => {
  return axios.get(API_HOST + '/products/' + id + '/product_sell_prices')
    .then(response => response.data)
    .then(data => {
      commit('PRODUCT_SET_PRODUCT_SELL_PRICES', data['hydra:member'])
    })
    .catch(e => {
      commit('PRODUCT_SET_ERROR', e.message)
    })
}
