import BackupList from '../components/backup/List'
import BackupShow from '../components/backup/Show'

export default [
  {
    name: 'BackupList', path: '/backups/', component: BackupList, meta: {
      requiresAuth: true
    }
  },
  {
    name: 'BackupShow', path: '/backups/show/:id', component: BackupShow, meta: {
      requiresAuth: true
    }
  }
]
