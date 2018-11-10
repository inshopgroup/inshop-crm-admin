import InvoiceTypeList from '../components/invoice_type/List'
import InvoiceTypeCreate from '../components/invoice_type/Create'
import InvoiceTypeUpdate from '../components/invoice_type/Update'
import InvoiceTypeShow from '../components/invoice_type/Show'

export default [
  {
    name: 'InvoiceTypeList', path: '/invoice_types/', component: InvoiceTypeList, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'InvoiceTypeCreate', path: '/invoice_types/create', component: InvoiceTypeCreate, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'InvoiceTypeUpdate', path: '/invoice_types/edit/:id', component: InvoiceTypeUpdate, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'InvoiceTypeShow', path: '/invoice_types/show/:id', component: InvoiceTypeShow, meta: {
      requiresAuth: true
    }
  }
]
