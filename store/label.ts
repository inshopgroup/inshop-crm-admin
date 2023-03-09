import { GetterTree, ActionTree, MutationTree } from 'vuex'
import * as crud from '~/utils/crud'

export interface ILabel {
  id: number
  name: string
  '@context': string
  '@id': string
  '@type': string
  createdAt: string
  createdBy: string
  isActive: boolean
  updatedAt: string
  updatedBy: string
  [x: string]: any
}

const defaultState = () => ({
  item: {
    isActive: true,
  } as ILabel,
  items: [] as ILabel[],
  error: null as null | string,
  errors: {},
})

export const state = () => defaultState()

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  LABEL_SET_ITEM(state, item: ILabel) {
    Object.assign(state, { item })
  },
  LABEL_UPDATE_ITEM(state, item: ILabel) {
    state.item = Object.assign({}, state.item, item)
  },
  LABEL_SET_ITEMS(state, items: ILabel[]) {
    Object.assign(state, { items })
  },
  LABEL_SET_ERROR(state, error) {
    Object.assign(state, { error })
  },
  LABEL_SET_ERRORS(state, errors) {
    Object.assign(state, { errors })
  },
  LABEL_RESET(state) {
    Object.assign(state, defaultState())
  },
}

export const getters: GetterTree<RootState, RootState> = {
  item: (state): ILabel => state.item,
  items: (state): ILabel[] => state.items,
  error: (state) => state.error,
  errors: (state) => state.errors,
}

export const actions: ActionTree<RootState, RootState> = {
  getItem(context, id) {
    return crud.getItem(context, this.$axios, 'LABEL', id)
  },
  getItems(context, query) {
    return crud.getItems(context, this.$axios, 'LABEL', query)
  },
  create(context) {
    return crud.create(context, this.$axios, 'LABEL')
  },
  update(context) {
    return crud.update(context, this.$axios, 'LABEL')
  },
  remove(context, item) {
    return crud.remove(context, this.$axios, 'LABEL', item)
  },
  reset(context) {
    return crud.reset(context, 'LABEL')
  },
}
