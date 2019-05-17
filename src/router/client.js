import ClientList from '../pages/client/List'
import ClientCreate from '../pages/client/Create'
import ClientUpdate from '../pages/client/Update'
import ClientShow from '../pages/client/Show'

export default [
  {
    name: 'ClientList',
    path: '/clients/',
    component: ClientList,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'ClientCreate',
    path: '/clients/create',
    component: ClientCreate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'ClientUpdate',
    path: '/clients/edit/:id',
    component: ClientUpdate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'ClientShow',
    path: '/clients/show/:id',
    component: ClientShow,
    meta: {
      requiresAuth: true
    }
  }
]
