import CountryList from '../components/country/List'
import CountryCreate from '../components/country/Create'
import CountryUpdate from '../components/country/Update'
import CountryShow from '../components/country/Show'

export default [
  {
    name: 'CountryList', path: '/countries/', component: CountryList, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'CountryCreate', path: '/countries/create', component: CountryCreate, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'CountryUpdate', path: '/countries/edit/:id', component: CountryUpdate, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'CountryShow', path: '/countries/show/:id', component: CountryShow, meta: {
      requiresAuth: true
    }
  }
]
