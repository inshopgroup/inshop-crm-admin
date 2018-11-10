import ClientList from '../components/client/List'
import ClientCreate from '../components/client/Create'
import ClientUpdate from '../components/client/Update'
import ClientShow from '../components/client/Show'

export default [
  {
    name: 'ClientList', path: '/clients/', component: ClientList, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'ClientCreate', path: '/clients/create', component: ClientCreate, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'ClientUpdate', path: '/clients/edit/:id', component: ClientUpdate, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'ClientShow', path: '/clients/show/:id', component: ClientShow, meta: {
      requiresAuth: true
    }
  }
]
