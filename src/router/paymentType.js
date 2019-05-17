import PaymentTypeList from '../pages/payment_type/List'
import PaymentTypeCreate from '../pages/payment_type/Create'
import PaymentTypeUpdate from '../pages/payment_type/Update'
import PaymentTypeShow from '../pages/payment_type/Show'

export default [
  {
    name: 'PaymentTypeList',
    path: '/payment_types/',
    component: PaymentTypeList,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'PaymentTypeCreate',
    path: '/payment_types/create',
    component: PaymentTypeCreate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'PaymentTypeUpdate',
    path: '/payment_types/edit/:id',
    component: PaymentTypeUpdate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'PaymentTypeShow',
    path: '/payment_types/show/:id',
    component: PaymentTypeShow,
    meta: {
      requiresAuth: true
    }
  }
]
