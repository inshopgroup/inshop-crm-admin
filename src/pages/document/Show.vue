<template>
  <div>
    <section class="content-header">
      <h1>"{{ item && item.name }}"</h1>
    </section>
    <section class="content">
      <item-errors entity="document" />
      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs">
          <li class="active">
            <a href="#general" data-toggle="tab" aria-expanded="false">{{
              $t('tabs_general')
            }}</a>
          </li>
          <li>
            <a href="#files" data-toggle="tab" aria-expanded="false">{{
              $t('tabs_files')
            }}</a>
          </li>
          <li>
            <a href="#history" data-toggle="tab" aria-expanded="false">{{
              $t('tabs_history')
            }}</a>
          </li>
        </ul>
        <div class="tab-content">
          <div id="general" class="tab-pane active">
            <document-info :item="item" />
          </div>
          <div id="files" class="tab-pane">
            <files-table :files="item.files" />
          </div>
          <div id="history" class="tab-pane">
            <history
              :id="parseInt($route.params.id)"
              :key="historyKey"
              entity="Document"
              path="document"
            />
          </div>
        </div>
      </div>
      <item-show-actions :item="item" entity="Document" path="document" />
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ItemShowActions from '../../components/layout/ItemShowActions'
import ItemErrors from '../../components/layout/errors/ItemErrors'
import FilesTable from '../template/FilesTable'
import History from '../../components/History'
import DocumentInfo from './DocumentInfo'

export default {
  components: {
    DocumentInfo,
    History,
    FilesTable,
    ItemErrors,
    ItemShowActions
  },
  data() {
    return {
      historyKey: 1
    }
  },
  computed: mapGetters({
    item: 'document/item'
  }),
  created() {
    this.getItem(this.$route.params.id)
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      getItem: 'document/getItem',
      reset: 'document/reset'
    })
  }
}
</script>
