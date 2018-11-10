import CurrencyList from '../components/currency/List'
import CurrencyCreate from '../components/currency/Create'
import CurrencyUpdate from '../components/currency/Update'
import CurrencyShow from '../components/currency/Show'

export default [
  {
    name: 'CurrencyList', path: '/currencies/', component: CurrencyList, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'CurrencyCreate', path: '/currencies/create', component: CurrencyCreate, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'CurrencyUpdate', path: '/currencies/edit/:id', component: CurrencyUpdate, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'CurrencyShow', path: '/currencies/show/:id', component: CurrencyShow, meta: {
      requiresAuth: true
    }
  }
]
