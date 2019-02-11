<template>
  <div>
    <section class="content-header">
      <h1>"{{ item && item['name'] }}"</h1>
    </section>

    <section class="content">
      <item-errors :entity="'document'" :is-loading="isLoading"></item-errors>


      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs">
          <li class="active"><a href="#general" data-toggle="tab" aria-expanded="false">{{$t('document.tabs.general')}}</a></li>
          <li><a href="#projects" data-toggle="tab" aria-expanded="false">{{$t('document.tabs.projects')}}</a></li>
          <li><a href="#files" data-toggle="tab" aria-expanded="false">{{$t('document.tabs.files')}}</a></li>
          <li><a href="#history" data-toggle="tab" aria-expanded="false">{{$t('tabs.history')}}</a></li>
        </ul>
        <div class="tab-content">
          <div class="tab-pane active" id="general">
            <template-info :item="item"></template-info>
          </div>
          <div class="tab-pane" id="projects">
            <client-projects :projects="item.projects"></client-projects>
          </div>
          <div class="tab-pane" id="files">
            <files-table :files="item.files"></files-table>
          </div>
          <div class="tab-pane" id="history">
            <history :item="item" :entity="'Document'" :path="'document'"></history>
          </div>
        </div>
      </div>

      <item-show-actions :item="item" :entity="'Document'" :path="'document'"></item-show-actions>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ItemShowActions from '../layout/ItemShowActions'
import ItemErrors from '../layout/errors/ItemErrors'
import ClientProjects from '../client/ClientProjects'
import TemplateInfo from '../template/TemplateInfo'
import FilesTable from '../template/FilesTable'
import History from '../History'

export default {
  components: {History, FilesTable, TemplateInfo, ClientProjects, ItemErrors, ItemShowActions},
  computed: mapGetters({
    isLoading: 'document/show/isLoading',
    item: 'document/show/retrieved'
  }),

  beforeDestroy () {
    this.reset()
  },

  created () {
    this.retrieve(decodeURIComponent(this.$route.params.id))
  },

  methods: {
    ...mapActions({
      del: 'document/del/del',
      reset: 'document/show/reset',
      retrieve: 'document/show/retrieve'
    }),

    deleteItem (item) {
      if (window.confirm(this.$t('delete_are_you_sure'))) {
        this.del(item).then(() => this.$router.push({ name: 'DocumentList' }))
      }
    }
  }
}
</script>
