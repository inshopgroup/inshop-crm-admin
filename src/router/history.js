import HistoryList from '../pages/history/List'

export default [
  {
    name: 'HistoryList',
    path: '/histories/',
    component: HistoryList,
    meta: {
      requiresAuth: true
    }
  }
]
