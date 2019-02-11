<template>
  <div>
    <section class="content-header">
      <h1>"{{ item && item['name'] }}"</h1>
    </section>

    <section class="content">
      <item-errors :entity="'project'" :is-loading="isLoading"></item-errors>

      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs">
          <li class="active"><a href="#general" data-toggle="tab" aria-expanded="false">{{$t('project.tabs.general')}}</a></li>
          <li><a href="#documents" data-toggle="tab" aria-expanded="false">{{$t('project.tabs.documents')}}</a></li>
          <li><a href="#tasks" data-toggle="tab" aria-expanded="false">{{$t('project.tabs.tasks')}}</a></li>
          <li><a href="#history" data-toggle="tab" aria-expanded="false">{{$t('tabs.history')}}</a></li>
        </ul>
        <div class="tab-content">
          <div class="tab-pane active" id="general">
            <project-info :item="item"></project-info>
          </div>
          <div class="tab-pane" id="documents">
            <client-documents :documents="documents" :projects="projects" :client="item.client" @reloadDocuments="reloadProject()"></client-documents>
          </div>
          <div class="tab-pane" id="tasks">
            <project-tasks-table :tasks="item.tasks" :show-project="false" :projects="projects" @reloadProject="reloadProject()"></project-tasks-table>
          </div>
          <div class="tab-pane" id="history">
            <history :item="item" :entity="'Project'" :path="'project'"></history>
          </div>
        </div>
      </div>

      <item-show-actions :item="item" :entity="'Project'" :path="'project'"></item-show-actions>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ItemShowActions from '../layout/ItemShowActions'
import ItemErrors from '../layout/errors/ItemErrors'
import ProjectInfo from './ProjectInfo'
import ClientDocuments from '../client/ClientDocuments'
import ProjectTasksTable from '../user/TasksTable'
import History from '../History'

export default {
  components: {History, ProjectTasksTable, ClientDocuments, ProjectInfo, ItemErrors, ItemShowActions},
  computed: {
    ...mapGetters({
      isLoading: 'project/show/isLoading',
      item: 'project/show/retrieved'
    }),
    projects () {
      return [this.item]
    },
    documents () {
      let documents = []

      this.item.documents.forEach((document) => {
        document.projects = [{
          id: this.item.id,
          name: this.item.name
        }]
        documents.push(document)
      })

      return documents
    }
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
    this.loadProject()
  },

  methods: {
    ...mapActions({
      del: 'project/del/del',
      reset: 'project/show/reset',
      retrieve: 'project/show/retrieve'
    }),

    loadProject () {
      this.retrieve(decodeURIComponent(this.$route.params.id))
    },

    deleteItem (item) {
      if (window.confirm(this.$t('delete_are_you_sure'))) {
        this.del(item).then(() => this.$router.push({ name: 'ProjectList' }))
      }
    },

    reloadProject () {
      this.loadProject()
    },

    setActiveTab (active) {
      this.active = active
    }
  }
}
</script>
