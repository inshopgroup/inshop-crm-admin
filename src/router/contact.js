import ContactList from '../pages/contact/List'
import ContactCreate from '../pages/contact/Create'
import ContactUpdate from '../pages/contact/Update'
import ContactShow from '../pages/contact/Show'

export default [
  {
    name: 'ContactList',
    path: '/contacts/',
    component: ContactList,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'ContactCreate',
    path: '/contacts/create',
    component: ContactCreate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'ContactUpdate',
    path: '/contacts/edit/:id',
    component: ContactUpdate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'ContactShow',
    path: '/contacts/show/:id',
    component: ContactShow,
    meta: {
      requiresAuth: true
    }
  }
]
