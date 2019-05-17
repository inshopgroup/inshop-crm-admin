import TemplateTypeList from '../pages/template_type/List'
import TemplateTypeCreate from '../pages/template_type/Create'
import TemplateTypeUpdate from '../pages/template_type/Update'
import TemplateTypeShow from '../pages/template_type/Show'

export default [
  {
    name: 'TemplateTypeList',
    path: '/template_types/',
    component: TemplateTypeList,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'TemplateTypeCreate',
    path: '/template_types/create',
    component: TemplateTypeCreate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'TemplateTypeUpdate',
    path: '/template_types/edit/:id',
    component: TemplateTypeUpdate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'TemplateTypeShow',
    path: '/template_types/show/:id',
    component: TemplateTypeShow,
    meta: {
      requiresAuth: true
    }
  }
]
