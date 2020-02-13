import { namespace } from './mutation_types'
import axios from '../../../interceptor'

export const getItems = ({ commit }, params) => {
  const url = `${process.env.VUE_APP_API_URL}/histories/${params.entity}/${params.id}`

  return axios
    .get(url)
    .then(response => response.data)
    .then(data => {
      commit(`${namespace}_SET_ITEMS`, data['hydra:member'])

      return data['hydra:member']
    })
    .catch(e => {
      commit(`${namespace}_SET_ERROR`, e.message)
    })
}
