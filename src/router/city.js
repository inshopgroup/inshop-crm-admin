import CityList from '../pages/city/List'
import CityCreate from '../pages/city/Create'
import CityUpdate from '../pages/city/Update'
import CityShow from '../pages/city/Show'

export default [
  {
    name: 'CityList',
    path: '/cities/',
    component: CityList,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'CityCreate',
    path: '/cities/create',
    component: CityCreate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'CityUpdate',
    path: '/cities/edit/:id',
    component: CityUpdate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'CityShow',
    path: '/cities/show/:id',
    component: CityShow,
    meta: {
      requiresAuth: true
    }
  }
]
