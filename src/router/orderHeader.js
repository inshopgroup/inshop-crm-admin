import OrderHeaderList from '../components/order_header/List'
import OrderHeaderCreate from '../components/order_header/Create'
import OrderHeaderUpdate from '../components/order_header/Update'
import OrderHeaderShow from '../components/order_header/Show'

export default [
  {
    name: 'OrderHeaderList', path: '/order_headers/', component: OrderHeaderList, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'OrderHeaderCreate', path: '/order_headers/create', component: OrderHeaderCreate, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'OrderHeaderUpdate', path: '/order_headers/edit/:id', component: OrderHeaderUpdate, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'OrderHeaderShow', path: '/order_headers/show/:id', component: OrderHeaderShow, meta: {
      requiresAuth: true
    }
  }
]
