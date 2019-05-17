import LanguageList from '../pages/language/List'
import LanguageCreate from '../pages/language/Create'
import LanguageUpdate from '../pages/language/Update'
import LanguageShow from '../pages/language/Show'

export default [
  {
    name: 'LanguageList',
    path: '/languages/',
    component: LanguageList,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'LanguageCreate',
    path: '/languages/create',
    component: LanguageCreate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'LanguageUpdate',
    path: '/languages/edit/:id',
    component: LanguageUpdate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'LanguageShow',
    path: '/languages/show/:id',
    component: LanguageShow,
    meta: {
      requiresAuth: true
    }
  }
]
