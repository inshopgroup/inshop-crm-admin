import ProjectTypeList from '../pages/project_type/List'
import ProjectTypeCreate from '../pages/project_type/Create'
import ProjectTypeUpdate from '../pages/project_type/Update'
import ProjectTypeShow from '../pages/project_type/Show'

export default [
  {
    name: 'ProjectTypeList',
    path: '/project_types/',
    component: ProjectTypeList,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'ProjectTypeCreate',
    path: '/project_types/create',
    component: ProjectTypeCreate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'ProjectTypeUpdate',
    path: '/project_types/edit/:id',
    component: ProjectTypeUpdate,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'ProjectTypeShow',
    path: '/project_types/show/:id',
    component: ProjectTypeShow,
    meta: {
      requiresAuth: true
    }
  }
]
