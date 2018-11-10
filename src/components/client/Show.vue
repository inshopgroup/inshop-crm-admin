<template>
  <div>
    <section class="content-header">
      <h1>{{ item && item['name'] }}</h1>
    </section>

    <section class="content">
      <item-show-errors :entity="'client'" :is-loading="isLoading"></item-show-errors>

      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs">
          <li class="active"><a href="#general" data-toggle="tab" aria-expanded="false">{{$t('client.tabs.general')}}</a></li>
          <li><a href="#contacts" data-toggle="tab" aria-expanded="false">{{$t('client.tabs.contacts')}}</a></li>
          <li><a href="#addresses" data-toggle="tab" aria-expanded="false">{{$t('client.tabs.addresses')}}</a></li>
          <li><a href="#companies" data-toggle="tab" aria-expanded="false">{{$t('client.tabs.companies')}}</a></li>
          <li><a href="#clients" data-toggle="tab" aria-expanded="false">{{$t('client.tabs.clients')}}</a></li>
          <li><a href="#projects" data-toggle="tab" aria-expanded="false">{{$t('client.tabs.projects')}}</a></li>
          <li><a href="#tasks" data-toggle="tab" aria-expanded="false">{{$t('client.tabs.tasks')}}</a></li>
          <li><a href="#documents" data-toggle="tab" aria-expanded="false">{{$t('client.tabs.documents')}}</a></li>
          <li><a href="#history" data-toggle="tab" aria-expanded="false">{{$t('tabs.history')}}</a></li>
        </ul>
        <div class="tab-content">
          <div class="tab-pane active" id="general">
            <client-info :item="item"></client-info>
          </div>
          <div class="tab-pane" id="contacts">
            <client-contacts :contacts="contacts" :client="item['@id']" @reloadContacts="loadContacts"></client-contacts>
          </div>
          <div class="tab-pane" id="addresses">
            <client-addresses :addresses="addresses" :client="item['@id']" @reloadAddresses="loadAddresses"></client-addresses>
          </div>
          <div class="tab-pane" id="companies">
            <client-companies :companies="item.companies"></client-companies>
          </div>
          <div class="tab-pane" id="clients">
            <client-relations :clients="item.clients"></client-relations>
          </div>
          <div class="tab-pane" id="projects">
            <client-projects :projects="projects" :client="item" @reloadProjects="loadProjects"></client-projects>
          </div>
          <div class="tab-pane" id="tasks">
            <project-tasks-table :tasks="tasks" @reloadTasks="loadProjects" :show-project="true" :projects="projectsCleared" @reloadProject="loadProjects"></project-tasks-table>
          </div>
          <div class="tab-pane" id="documents">
            <client-documents :documents="documents" :client="item" :projects="projectsCleared" @reloadDocuments="loadDocuments" :show-projects="true"></client-documents>
          </div>
          <div class="tab-pane" id="history">
            <history :item="item" :entity="'Client'" :path="'client'"></history>
          </div>
        </div>
      </div>

      <item-show-actions :item="item" :entity="'Client'" :path="'client'"></item-show-actions>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ClientCompanies from './ClientCompanies'
import ClientContacts from './ClientContacts'
import ClientAddresses from './ClientAddresses'
import ClientDocuments from './ClientDocuments'
import ClientInfo from './ClientInfo'
import ClientProjects from './ClientProjects'
import ItemShowActions from '../layout/ItemShowActions'
import ItemShowErrors from '../layout/errors/ItemShowErrors'
import ProjectTasksTable from '../user/TasksTable'
import ClientRelations from './ClientRelations'
import History from '../History'

export default {
  components: {
    History,
    ClientRelations,
    ProjectTasksTable,
    ItemShowErrors,
    ClientCompanies,
    ClientContacts,
    ClientAddresses,
    ClientDocuments,
    ClientInfo,
    ClientProjects,
    ItemShowActions
  },
  computed: {
    projectsCleared () {
      let projects = []

      // remove nested data
      this.projects.map(project => {
        projects.push({
          id: project.id,
          name: project.name,
        })
      })

      return projects
    },
    tasks () {
      let tasks = []

      this.projects.forEach((project) => {
        project.tasks.forEach((task) => {
          task.project = project
          tasks.push(task)
        })
      })

      return tasks
    },
    ... mapGetters({
      isLoading: 'client/show/isLoading',
      item: 'client/show/retrieved',
      documents: 'client/show/documents',
      projects: 'client/show/projects',
      contacts: 'client/show/contacts',
      addresses: 'client/show/addresses',
    })
  },

  data () {
    return {
      active: 0
    }
  },

  beforeDestroy () {
    this.reset()
  },

  created () {
    this.loadUser()
    this.loadDocuments()
    this.loadProjects()
    this.loadContacts()
    this.loadAddresses()
  },

  methods: {
    ...mapActions({
      del: 'client/del/del',
      reset: 'client/show/reset',
      retrieve: 'client/show/retrieve',
      getDocuments: 'client/show/getDocuments',
      getProjects: 'client/show/getProjects',
      getContacts: 'client/show/getContacts',
      getAddresses: 'client/show/getAddresses',
    }),

    deleteItem (item) {
      if (window.confirm(this.$t('delete_are_you_sure'))) {
        this.del(item).then(() => this.$router.push({ name: 'ClientList' }))
      }
    },
    loadUser () {
      this.retrieve(decodeURIComponent(this.$route.params.id))
    },
    loadDocuments () {
      this.getDocuments(decodeURIComponent(this.$route.params.id))
    },
    loadProjects () {
      this.getProjects(decodeURIComponent(this.$route.params.id))
    },
    loadContacts () {
      this.getContacts(decodeURIComponent(this.$route.params.id))
    },
    loadAddresses () {
      this.getAddresses(decodeURIComponent(this.$route.params.id))
    },
    setActiveTab (active) {
      this.active = active
    }
  }
}
</script>
