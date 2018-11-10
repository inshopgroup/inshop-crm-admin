import VatList from '../components/vat/List'
import VatCreate from '../components/vat/Create'
import VatUpdate from '../components/vat/Update'
import VatShow from '../components/vat/Show'

export default [
  {
    name: 'VatList', path: '/vats/', component: VatList, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'VatCreate', path: '/vats/create', component: VatCreate, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'VatUpdate', path: '/vats/edit/:id', component: VatUpdate, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'VatShow', path: '/vats/show/:id', component: VatShow, meta: {
      requiresAuth: true
    }
  }
]
