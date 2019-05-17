import VatList from '../pages/vat/List'
import VatCreate from '../pages/vat/Create'
import VatUpdate from '../pages/vat/Update'
import VatShow from '../pages/vat/Show'

export default [
  {
    name: 'VatList',
    path: '/vats/',
    component: VatList,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'VatCreate',
    path: '/vats/create',
    component: VatCreate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'VatUpdate',
    path: '/vats/edit/:id',
    component: VatUpdate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'VatShow',
    path: '/vats/show/:id',
    component: VatShow,
    meta: {
      requiresAuth: true
    }
  }
]
