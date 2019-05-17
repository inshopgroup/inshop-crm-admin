import InvoiceHeaderList from '../pages/invoice_header/List'
import InvoiceHeaderCreate from '../pages/invoice_header/Create'
import InvoiceHeaderUpdate from '../pages/invoice_header/Update'
import InvoiceHeaderShow from '../pages/invoice_header/Show'

export default [
  {
    name: 'InvoiceHeaderList',
    path: '/invoice_headers/',
    component: InvoiceHeaderList,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'InvoiceHeaderCreate',
    path: '/invoice_headers/create',
    component: InvoiceHeaderCreate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'InvoiceHeaderUpdate',
    path: '/invoice_headers/edit/:id',
    component: InvoiceHeaderUpdate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'InvoiceHeaderShow',
    path: '/invoice_headers/show/:id',
    component: InvoiceHeaderShow,
    meta: {
      requiresAuth: true
    }
  }
]
