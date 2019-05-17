import ProjectList from '../pages/project/List'
import ProjectCreate from '../pages/project/Create'
import ProjectUpdate from '../pages/project/Update'
import ProjectShow from '../pages/project/Show'

export default [
  {
    name: 'ProjectList',
    path: '/projects/',
    component: ProjectList,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'ProjectCreate',
    path: '/projects/create',
    component: ProjectCreate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'ProjectUpdate',
    path: '/projects/edit/:id',
    component: ProjectUpdate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'ProjectShow',
    path: '/projects/show/:id',
    component: ProjectShow,
    meta: {
      requiresAuth: true
    }
  }
]
