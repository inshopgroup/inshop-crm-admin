<template>
  <div>
    <section class="content-header">
      <h1>{{ item && item['name'] }}</h1>
    </section>

    <section class="content">
      <item-show-errors :entity="'template'" :is-loading="isLoading"></item-show-errors>

      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs">
          <li class="active"><a href="#general" data-toggle="tab" aria-expanded="false">{{$t('template.tabs.general')}}</a></li>
          <li><a href="#files" data-toggle="tab" aria-expanded="false">{{$t('template.tabs.files')}}</a></li>
          <li><a href="#history" data-toggle="tab" aria-expanded="false">{{$t('tabs.history')}}</a></li>
        </ul>
        <div class="tab-content">
          <div class="tab-pane active" id="general">
            <template-info :item="item"></template-info>
          </div>
          <div class="tab-pane" id="files">
            <files-table :files="item.files"></files-table>
          </div>
          <div class="tab-pane" id="history">
            <history :item="item" :entity="'Template'" :path="'template'"></history>
          </div>
        </div>
      </div>

      <item-show-actions :item="item" :entity="'Template'" :path="'template'"></item-show-actions>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ItemShowActions from '../layout/ItemShowActions'
import ItemShowErrors from '../layout/errors/ItemShowErrors'
import FilesTable from './FilesTable'
import TemplateInfo from './TemplateInfo'
import History from '../History'

export default {
  components: {History, ItemShowErrors, ItemShowActions, TemplateInfo, FilesTable },

  computed: mapGetters({
    isLoading: 'template/show/isLoading',
    item: 'template/show/retrieved'
  }),

  beforeDestroy () {
    this.reset()
  },

  created () {
    this.retrieve(decodeURIComponent(this.$route.params.id))
  },

  methods: {
    ...mapActions({
      reset: 'template/show/reset',
      retrieve: 'template/show/retrieve'
    })
  }
}
</script>
