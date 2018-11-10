import * as types from './mutation_types'

export default {
  [types.CLIENT_SHOW_RESET] (state) {
    Object.assign(state, {
      error: '',
      isLoading: false,
      retrieved: {
        companies: [],
        clients: []
      },
      documents: [],
      projects: [],
      addresses: [],
      contacts: []
    })
  },

  [types.CLIENT_SHOW_SET_ERROR] (state, error) {
    Object.assign(state, { error })
  },

  [types.CLIENT_SHOW_SET_RETRIEVED] (state, retrieved) {
    Object.assign(state, { retrieved })
  },

  [types.CLIENT_SHOW_SET_DOCUMENTS] (state, documents) {
    state.documents = documents
  },

  [types.CLIENT_SHOW_SET_PROJECTS] (state, projects) {
    Object.assign(state, { projects })
  },

  [types.CLIENT_SHOW_SET_CONTACTS] (state, contacts) {
    Object.assign(state, { contacts })
  },

  [types.CLIENT_SHOW_SET_ADDRESSES] (state, addresses) {
    Object.assign(state, { addresses })
  },

  [types.CLIENT_SHOW_TOGGLE_LOADING] (state) {
    Object.assign(state, { isLoading: !state.isLoading })
  }
}
