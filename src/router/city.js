import CityList from '../components/city/List'
import CityCreate from '../components/city/Create'
import CityUpdate from '../components/city/Update'
import CityShow from '../components/city/Show'

export default [
  {
    name: 'CityList', path: '/cities/', component: CityList, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'CityCreate', path: '/cities/create', component: CityCreate, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'CityUpdate', path: '/cities/edit/:id', component: CityUpdate, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'CityShow', path: '/cities/show/:id', component: CityShow, meta: {
      requiresAuth: true
    }
  }
]
