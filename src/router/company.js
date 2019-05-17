import CompanyList from '../pages/company/List'
import CompanyCreate from '../pages/company/Create'
import CompanyUpdate from '../pages/company/Update'
import CompanyShow from '../pages/company/Show'

export default [
  {
    name: 'CompanyList',
    path: '/companies/',
    component: CompanyList,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'CompanyCreate',
    path: '/companies/create',
    component: CompanyCreate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'CompanyUpdate',
    path: '/companies/edit/:id',
    component: CompanyUpdate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'CompanyShow',
    path: '/companies/show/:id',
    component: CompanyShow,
    meta: {
      requiresAuth: true
    }
  }
]
