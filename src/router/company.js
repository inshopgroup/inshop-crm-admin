import CompanyList from '../components/company/List'
import CompanyCreate from '../components/company/Create'
import CompanyUpdate from '../components/company/Update'
import CompanyShow from '../components/company/Show'

export default [
  {
    name: 'CompanyList', path: '/companies/', component: CompanyList, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'CompanyCreate', path: '/companies/create', component: CompanyCreate, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'CompanyUpdate', path: '/companies/edit/:id', component: CompanyUpdate, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'CompanyShow', path: '/companies/show/:id', component: CompanyShow, meta: {
      requiresAuth: true
    }
  }
]
