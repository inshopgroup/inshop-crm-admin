import SubmissionError from '../error/SubmissionError'
import { API_HOST, API_PATH } from '../config/_entrypoint'
import store from '../store'
import * as types from '../store/modules/general/mutation_types'

const jsonLdMimeType = 'application/ld+json'

export default function (url, options = {}) {
  store.commit('general/' + types.LOADING_START)
  if (typeof options.headers === 'undefined') Object.assign(options, { headers: new Headers() })

  if (options.headers.get('Accept') === null) options.headers.set('Accept', jsonLdMimeType)

  if (options.body !== undefined && !(options.body instanceof FormData) && options.headers.get('Content-Type') === null) {
    options.headers.set('Content-Type', jsonLdMimeType)
  }

  options.headers.set('Authorization', 'Bearer ' + store.state.auth.token)

  let link = url.includes(API_PATH) ? API_HOST + url : API_HOST + API_PATH + url

  if (process.env.NODE_ENV !== 'production') {
    if (link.indexOf('?') > -1) {
      link += '&XDEBUG_SESSION_START=PHPSTORM'
    } else {
      link += '?XDEBUG_SESSION_START=PHPSTORM'
    }
  }

  return fetch(link, options).then((response) => {
    store.commit('general/' + types.LOADING_STOP)
    if (response.ok) return response

    return response
      .json()
      .then((json) => {
        const error = json['hydra:description'] ? json['hydra:description'] : response.statusText
        if (!json.violations) throw Error(error)

        const errors = { _error: error }
        json.violations.map(violation =>
          Object.assign(errors, { [violation.propertyPath]: violation.message }))

        throw new SubmissionError(errors)
      })
  })
}
