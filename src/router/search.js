import Search from '../pages/Search'

export default [
  {
    name: 'Search',
    path: '/search',
    component: Search,
    meta: {
      requiresAuth: true
    }
  }
]
