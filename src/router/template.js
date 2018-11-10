import TemplateList from '../components/template/List'
import TemplateCreate from '../components/template/Create'
import TemplateUpdate from '../components/template/Update'
import TemplateShow from '../components/template/Show'

export default [
  {
    name: 'TemplateList', path: '/templates/', component: TemplateList, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'TemplateCreate', path: '/templates/create', component: TemplateCreate, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'TemplateUpdate', path: '/templates/edit/:id', component: TemplateUpdate, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'TemplateShow', path: '/templates/show/:id', component: TemplateShow, meta: {
      requiresAuth: true
    }
  }
]
