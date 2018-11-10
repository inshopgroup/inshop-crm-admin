import ProjectTypeList from '../components/project_type/List'
import ProjectTypeCreate from '../components/project_type/Create'
import ProjectTypeUpdate from '../components/project_type/Update'
import ProjectTypeShow from '../components/project_type/Show'

export default [
  {
    name: 'ProjectTypeList', path: '/project_types/', component: ProjectTypeList, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'ProjectTypeCreate', path: '/project_types/create', component: ProjectTypeCreate, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'ProjectTypeUpdate', path: '/project_types/edit/:id', component: ProjectTypeUpdate, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'ProjectTypeShow', path: '/project_types/show/:id', component: ProjectTypeShow, meta: {
      requiresAuth: true
    }
  }
]
