import InvoiceStatusList from '../pages/invoice_status/List'
import InvoiceStatusCreate from '../pages/invoice_status/Create'
import InvoiceStatusUpdate from '../pages/invoice_status/Update'
import InvoiceStatusShow from '../pages/invoice_status/Show'

export default [
  {
    name: 'InvoiceStatusList',
    path: '/invoice_status/',
    component: InvoiceStatusList,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'InvoiceStatusCreate',
    path: '/invoice_status/create',
    component: InvoiceStatusCreate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'InvoiceStatusUpdate',
    path: '/invoice_status/edit/:id',
    component: InvoiceStatusUpdate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'InvoiceStatusShow',
    path: '/invoice_status/show/:id',
    component: InvoiceStatusShow,
    meta: {
      requiresAuth: true
    }
  }
]
