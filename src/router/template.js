import TemplateList from '../pages/template/List'
import TemplateCreate from '../pages/template/Create'
import TemplateUpdate from '../pages/template/Update'
import TemplateShow from '../pages/template/Show'

export default [
  {
    name: 'TemplateList',
    path: '/templates/',
    component: TemplateList,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'TemplateCreate',
    path: '/templates/create',
    component: TemplateCreate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'TemplateUpdate',
    path: '/templates/edit/:id',
    component: TemplateUpdate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'TemplateShow',
    path: '/templates/show/:id',
    component: TemplateShow,
    meta: {
      requiresAuth: true
    }
  }
]
