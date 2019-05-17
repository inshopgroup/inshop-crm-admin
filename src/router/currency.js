import CurrencyList from '../pages/currency/List'
import CurrencyCreate from '../pages/currency/Create'
import CurrencyUpdate from '../pages/currency/Update'
import CurrencyShow from '../pages/currency/Show'

export default [
  {
    name: 'CurrencyList',
    path: '/currencies/',
    component: CurrencyList,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'CurrencyCreate',
    path: '/currencies/create',
    component: CurrencyCreate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'CurrencyUpdate',
    path: '/currencies/edit/:id',
    component: CurrencyUpdate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'CurrencyShow',
    path: '/currencies/show/:id',
    component: CurrencyShow,
    meta: {
      requiresAuth: true
    }
  }
]
