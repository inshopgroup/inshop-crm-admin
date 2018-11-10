import ContactList from '../components/contact/List'
import ContactCreate from '../components/contact/Create'
import ContactUpdate from '../components/contact/Update'
import ContactShow from '../components/contact/Show'

export default [
  {
    name: 'ContactList', path: '/contacts/', component: ContactList, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'ContactCreate', path: '/contacts/create', component: ContactCreate, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'ContactUpdate', path: '/contacts/edit/:id', component: ContactUpdate, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'ContactShow', path: '/contacts/show/:id', component: ContactShow, meta: {
      requiresAuth: true
    }
  }
]
