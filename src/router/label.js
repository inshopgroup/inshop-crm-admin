import LabelList from '../components/label/List'
import LabelCreate from '../components/label/Create'
import LabelUpdate from '../components/label/Update'
import LabelShow from '../components/label/Show'

export default [
  {
    name: 'LabelList', path: '/labels/', component: LabelList, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'LabelCreate', path: '/labels/create', component: LabelCreate, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'LabelUpdate', path: '/labels/edit/:id', component: LabelUpdate, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'LabelShow', path: '/labels/show/:id', component: LabelShow, meta: {
      requiresAuth: true
    }
  }
]
