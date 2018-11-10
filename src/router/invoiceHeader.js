import InvoiceHeaderList from '../components/invoice_header/List'
import InvoiceHeaderCreate from '../components/invoice_header/Create'
import InvoiceHeaderUpdate from '../components/invoice_header/Update'
import InvoiceHeaderShow from '../components/invoice_header/Show'

export default [
  {
    name: 'InvoiceHeaderList', path: '/invoice_headers/', component: InvoiceHeaderList, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'InvoiceHeaderCreate', path: '/invoice_headers/create', component: InvoiceHeaderCreate, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'InvoiceHeaderUpdate', path: '/invoice_headers/edit/:id', component: InvoiceHeaderUpdate, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'InvoiceHeaderShow', path: '/invoice_headers/show/:id', component: InvoiceHeaderShow, meta: {
      requiresAuth: true
    }
  }
]
